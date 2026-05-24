const fs = require("fs");
const path = require("path");
const multer = require("multer");

const UPLOAD_ROOT = path.join(__dirname, "..", "uploads", "games");
const ARCHIVES_DIR = path.join(UPLOAD_ROOT, "archives");
const COVERS_DIR = path.join(UPLOAD_ROOT, "covers");
const SCREENSHOTS_DIR = path.join(UPLOAD_ROOT, "screenshots");

const ARCHIVE_EXTENSIONS = [".zip", ".rar", ".7z"];
const MAX_ARCHIVE_SIZE = 10 * 1024 * 1024 * 1024;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function uniqueFilename(originalname) {
  const ext = path.extname(originalname).toLowerCase();
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
}

function createStorage(destDir) {
  return multer.diskStorage({
    destination(_req, _file, cb) {
      ensureDir(destDir);
      cb(null, destDir);
    },
    filename(_req, file, cb) {
      cb(null, uniqueFilename(file.originalname));
    }
  });
}

const archiveStorage = createStorage(ARCHIVES_DIR);
const thumbnailStorage = createStorage(COVERS_DIR);
const screenshotsStorage = createStorage(SCREENSHOTS_DIR);

const gameFilesStorage = multer.diskStorage({
  destination(_req, file, cb) {
    const dirs = {
      archive: ARCHIVES_DIR,
      thumbnail: COVERS_DIR,
      screenshots: SCREENSHOTS_DIR
    };
    const dir = dirs[file.fieldname];
    if (!dir) {
      cb(new Error(`Unexpected upload field: ${file.fieldname}`));
      return;
    }
    ensureDir(dir);
    cb(null, dir);
  },
  filename(_req, file, cb) {
    cb(null, uniqueFilename(file.originalname));
  }
});

function fileFilter(_req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "archive") {
    if (ARCHIVE_EXTENSIONS.includes(ext)) {
      cb(null, true);
      return;
    }
    cb(new Error("Invalid archive format. Allowed: ZIP, RAR, 7Z"));
    return;
  }

  if (file.fieldname === "thumbnail" || file.fieldname === "screenshots") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }
    cb(new Error("Only image files are allowed for cover and screenshots"));
    return;
  }

  cb(new Error(`Unexpected upload field: ${file.fieldname}`));
}

const uploadGameFiles = multer({
  storage: gameFilesStorage,
  fileFilter,
  limits: {
    fileSize: MAX_ARCHIVE_SIZE,
    files: 7
  }
}).fields([
  { name: "archive", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
  { name: "screenshots", maxCount: 5 }
]);

[ARCHIVES_DIR, COVERS_DIR, SCREENSHOTS_DIR].forEach(ensureDir);

module.exports = {
  ensureDir,
  ARCHIVES_DIR,
  COVERS_DIR,
  SCREENSHOTS_DIR,
  archiveStorage,
  thumbnailStorage,
  screenshotsStorage,
  fileFilter,
  uploadGameFiles,
  MAX_ARCHIVE_SIZE,
  MAX_IMAGE_SIZE
};
