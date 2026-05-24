const express = require("express");
const fs = require("fs");
const { run, get, all } = require("../db");
const { authRequired, requireModerator } = require("../middleware/auth");
const { uploadGameFiles } = require("../middleware/upload");

const router = express.Router();

const SUBDIR_BY_FIELD = {
  archive: "archives",
  thumbnail: "covers",
  screenshots: "screenshots"
};

function uploadMiddleware(req, res, next) {
  uploadGameFiles(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File too large" });
      }
      if (err.code === "LIMIT_FILE_COUNT" || err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: err.message || "Invalid upload" });
      }
      return res.status(400).json({ error: err.message || "Upload failed" });
    }
    return next();
  });
}

function filePublicUrl(fieldname, filename) {
  const subdir = SUBDIR_BY_FIELD[fieldname];
  return `/uploads/games/${subdir}/${filename}`;
}

function removeUploadedFiles(files) {
  if (!files) {
    return;
  }
  for (const list of Object.values(files)) {
    if (!Array.isArray(list)) {
      continue;
    }
    for (const file of list) {
      if (file?.path) {
        fs.unlink(file.path, () => {});
      }
    }
  }
}

function trimField(value) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalField(value) {
  const trimmed = trimField(value);
  return trimmed || null;
}

function formatArchiveSize(bytes) {
  const size = Number(bytes);
  if (!Number.isFinite(size) || size < 0) {
    return null;
  }
  const gb = 1024 * 1024 * 1024;
  const mb = 1024 * 1024;
  if (size > gb) {
    return `${(size / gb).toFixed(1)} GB`;
  }
  if (size > mb) {
    return `${(size / mb).toFixed(1)} MB`;
  }
  return `${Math.round(size / 1024)} KB`;
}

function buildRequirements(prefix, body) {
  const keys = ["os", "cpu", "ram", "gpu", "storage", "additional"];
  const requirements = {};
  let hasAny = false;

  for (const key of keys) {
    const value = trimField(body[`${prefix}_${key}`]);
    requirements[key] = value;
    if (value) {
      hasAny = true;
    }
  }

  return hasAny ? JSON.stringify(requirements) : null;
}

const CYRILLIC_TO_LATIN = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya"
};

function slugify(title) {
  const normalized = String(title || "")
    .trim()
    .toLowerCase()
    .split("")
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("");

  const slug = normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || "game";
}

async function uniqueSlug(baseSlug) {
  let slug = baseSlug;
  let suffix = 1;

  while (await get("SELECT id FROM games WHERE slug = ?", [slug])) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function parseJsonField(value, fallback = null) {
  if (value == null || value === "") {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function shortDescription(text, maxLen = 200) {
  const value = typeof text === "string" ? text.trim() : "";
  if (value.length <= maxLen) {
    return value;
  }
  return `${value.slice(0, maxLen).trimEnd()}…`;
}

function mapGameRow(row) {
  if (!row) {
    return null;
  }
  return {
    ...row,
    features: parseJsonField(row.features, []),
    screenshots: parseJsonField(row.screenshots, []),
    min_requirements: parseJsonField(row.min_requirements, {}),
    rec_requirements: parseJsonField(row.rec_requirements, {})
  };
}

function parseRatingValue(value) {
  const rating = Number.parseInt(value, 10);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return null;
  }
  return rating;
}

async function recalculateGameRating(gameId) {
  const stats = await get(
    "SELECT AVG(rating) as avg, COUNT(*) as count FROM game_ratings WHERE game_id = ?",
    [gameId]
  );
  const newAvg = stats?.avg ? parseFloat(stats.avg).toFixed(2) : "0.00";
  const newCount = stats?.count || 0;

  await run("UPDATE games SET rating_avg = ?, rating_count = ? WHERE id = ?", [
    newAvg,
    newCount,
    gameId
  ]);

  const rows = await all(
    "SELECT rating, COUNT(*) as count FROM game_ratings WHERE game_id = ? GROUP BY rating",
    [gameId]
  );
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const row of rows) {
    if (row.rating >= 1 && row.rating <= 5) {
      distribution[row.rating] = row.count;
    }
  }

  return { rating_avg: newAvg, rating_count: newCount, distribution };
}

async function getPublishedGameBySlug(slug) {
  return get("SELECT id FROM games WHERE slug = ? AND status = 'published'", [slug]);
}

function mapSubmissionRow(row) {
  if (!row) {
    return null;
  }
  return {
    ...row,
    screenshots: parseJsonField(row.screenshots, []),
    min_requirements: parseJsonField(row.min_requirements, {}),
    rec_requirements: parseJsonField(row.rec_requirements, {})
  };
}

router.get("/user/submissions", authRequired, async (req, res) => {
  try {
    const rows = await all(
      `
        SELECT id, title, status, created_at, rejection_reason
        FROM game_submissions
        WHERE user_id = ?
        ORDER BY created_at DESC
      `,
      [req.user.id]
    );
    return res.json(rows);
  } catch (error) {
    console.error("Failed to load user submissions:", error);
    return res.status(500).json({ error: "Failed to load submissions" });
  }
});

router.get(
  "/moderator/submissions",
  authRequired,
  requireModerator,
  async (req, res) => {
    try {
      const rows = await all(
        `
          SELECT
            s.id,
            s.title,
            s.description,
            s.genre,
            s.cover_url,
            s.status,
            s.created_at,
            u.id AS author_id,
            u.username AS author_username,
            u.email AS author_email
          FROM game_submissions s
          JOIN users u ON u.id = s.user_id
          WHERE s.status = 'pending'
          ORDER BY s.created_at ASC
        `
      );
      return res.json(rows);
    } catch (error) {
      console.error("Failed to load moderator submissions:", error);
      return res.status(500).json({ error: "Failed to load submissions" });
    }
  }
);

router.get(
  "/moderator/submissions/:id",
  authRequired,
  requireModerator,
  async (req, res) => {
    const submissionId = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(submissionId) || submissionId <= 0) {
      return res.status(400).json({ error: "Invalid submission id" });
    }

    try {
      const row = await get(
        `
          SELECT
            s.*,
            u.id AS author_id,
            u.username AS author_username,
            u.email AS author_email
          FROM game_submissions s
          JOIN users u ON u.id = s.user_id
          WHERE s.id = ?
        `,
        [submissionId]
      );

      if (!row) {
        return res.status(404).json({ error: "Submission not found" });
      }

      return res.json(mapSubmissionRow(row));
    } catch (error) {
      console.error("Failed to load submission details:", error);
      return res.status(500).json({ error: "Failed to load submission" });
    }
  }
);

router.post(
  "/moderator/submissions/:id/approve",
  authRequired,
  requireModerator,
  async (req, res) => {
    const submissionId = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(submissionId) || submissionId <= 0) {
      return res.status(400).json({ error: "Invalid submission id" });
    }

    try {
      const submission = await get(
        `
          SELECT s.*, u.username AS author_username
          FROM game_submissions s
          JOIN users u ON u.id = s.user_id
          WHERE s.id = ?
        `,
        [submissionId]
      );

      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      if (submission.status !== "pending") {
        return res.status(400).json({ error: "Only pending submissions can be approved" });
      }

      const existingGame = await get(
        "SELECT id FROM games WHERE submission_id = ?",
        [submissionId]
      );
      if (existingGame) {
        return res.status(400).json({ error: "Game already exists for this submission" });
      }

      const baseSlug = slugify(submission.title);
      const slug = await uniqueSlug(baseSlug);

      const inserted = await run(
        `
          INSERT INTO games (
            submission_id,
            slug,
            title,
            description,
            genre,
            cover_url,
            download_url,
            archive_size,
            installed_size,
            platform,
            multiplayer,
            release_date,
            publisher,
            screenshots,
            min_requirements,
            rec_requirements,
            created_by,
            status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')
        `,
        [
          submissionId,
          slug,
          submission.title,
          submission.description,
          submission.genre,
          submission.cover_url,
          submission.archive_url,
          submission.archive_size,
          submission.installed_size,
          submission.platform,
          submission.multiplayer,
          submission.release_date,
          submission.author_username,
          submission.screenshots,
          submission.min_requirements,
          submission.rec_requirements,
          submission.user_id
        ]
      );

      await run(
        `
          UPDATE game_submissions
          SET status = 'approved',
              reviewer_id = ?,
              reviewed_at = datetime('now'),
              rejection_reason = NULL
          WHERE id = ?
        `,
        [req.user.id, submissionId]
      );

      return res.json({
        game_id: inserted.id,
        slug,
        submission_id: submissionId,
        status: "approved"
      });
    } catch (error) {
      console.error("Failed to approve submission:", error);
      return res.status(500).json({ error: "Failed to approve submission" });
    }
  }
);

router.post(
  "/moderator/submissions/:id/reject",
  authRequired,
  requireModerator,
  async (req, res) => {
    const submissionId = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(submissionId) || submissionId <= 0) {
      return res.status(400).json({ error: "Invalid submission id" });
    }

    const reason = trimField(req.body?.reason);
    if (!reason) {
      return res.status(400).json({ error: "reason is required" });
    }

    try {
      const submission = await get(
        "SELECT id, status FROM game_submissions WHERE id = ?",
        [submissionId]
      );

      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }
      if (submission.status !== "pending") {
        return res.status(400).json({ error: "Only pending submissions can be rejected" });
      }

      await run(
        `
          UPDATE game_submissions
          SET status = 'rejected',
              rejection_reason = ?,
              reviewer_id = ?,
              reviewed_at = datetime('now')
          WHERE id = ?
        `,
        [reason, req.user.id, submissionId]
      );

      return res.json({
        id: submissionId,
        status: "rejected",
        rejection_reason: reason
      });
    } catch (error) {
      console.error("Failed to reject submission:", error);
      return res.status(500).json({ error: "Failed to reject submission" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const rows = await all(
      `
        SELECT id, title, slug, cover_url, genre, rating_avg, rating_count, description, archive_size
        FROM games
        WHERE status = 'published'
        ORDER BY created_at DESC
      `
    );

    const games = rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      cover_url: row.cover_url,
      genre: row.genre,
      rating_avg: row.rating_avg,
      rating_count: row.rating_count,
      short_description: shortDescription(row.description),
      archive_size: row.archive_size
    }));

    return res.json(games);
  } catch (error) {
    console.error("Failed to load games:", error);
    return res.status(500).json({ error: "Failed to load games" });
  }
});

router.get("/:slug/comments", async (req, res) => {
  const { slug } = req.params;
  try {
    const game = await getPublishedGameBySlug(slug);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    console.log(`[COMMENTS] Game ${slug} id=${game.id}`);

    const comments = await all(
      `SELECT id, user_id, username, content, rating, created_at
       FROM game_comments
       WHERE game_id = ? AND is_deleted = 0
       ORDER BY created_at DESC
       LIMIT 50`,
      [game.id]
    );

    console.log(`[COMMENTS] Found ${comments.length} comments for game_id=${game.id}`);
    return res.json(comments);
  } catch (error) {
    console.error("Comments fetch error:", error);
    return res.status(500).json({ error: "Failed to load comments" });
  }
});

router.get("/:slug/debug", async (req, res) => {
  const { slug } = req.params;
  try {
    const game = await getPublishedGameBySlug(slug);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const comments = await all(
      `SELECT id, game_id, user_id, username, content, rating, is_deleted, created_at
       FROM game_comments
       WHERE game_id = ?
       ORDER BY created_at DESC`,
      [game.id]
    );

    return res.json({ game_id: game.id, slug, comments });
  } catch (error) {
    console.error("Debug fetch error:", error);
    return res.status(500).json({ error: "Failed to load debug info" });
  }
});

router.get("/:slug/my-rating", authRequired, async (req, res) => {
  const { slug } = req.params;
  try {
    const game = await getPublishedGameBySlug(slug);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const row = await get(
      "SELECT rating FROM game_ratings WHERE game_id = ? AND user_id = ?",
      [game.id, req.user.id]
    );
    return res.json({ rating: row?.rating ?? null });
  } catch (error) {
    console.error("My rating fetch error:", error);
    return res.status(500).json({ error: "Failed to load rating" });
  }
});

router.post("/:slug/rate", authRequired, async (req, res) => {
  const { slug } = req.params;
  const rating = parseRatingValue(req.body?.rating);
  const userId = req.user.id;

  if (rating === null) {
    return res.status(400).json({ error: "Rating must be an integer between 1 and 5" });
  }

  try {
    const game = await getPublishedGameBySlug(slug);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    await run(
      `INSERT INTO game_ratings (game_id, user_id, rating) VALUES (?, ?, ?)
       ON CONFLICT(game_id, user_id) DO UPDATE SET rating = excluded.rating, created_at = CURRENT_TIMESTAMP`,
      [game.id, userId, rating]
    );

    const stats = await recalculateGameRating(game.id);
    return res.json(stats);
  } catch (error) {
    console.error("Rate error:", error);
    return res.status(500).json({ error: "Failed to submit rating" });
  }
});

router.post("/:slug/comments", authRequired, async (req, res) => {
  const { slug } = req.params;
  const content = trimField(req.body?.content);
  const userId = req.user.id;
  let username = req.user.username;
  const rating =
    req.body?.rating === undefined || req.body?.rating === null || req.body?.rating === ""
      ? null
      : parseRatingValue(req.body.rating);

  if (!content) {
    return res.status(400).json({ error: "Comment content is required" });
  }
  if (content.length > 1000) {
    return res.status(400).json({ error: "Comment too long (max 1000 chars)" });
  }
  if (req.body?.rating !== undefined && req.body?.rating !== null && req.body?.rating !== "" && rating === null) {
    return res.status(400).json({ error: "Rating must be 1-5" });
  }

  try {
    const game = await getPublishedGameBySlug(slug);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    if (!username) {
      const userRow = await get("SELECT username FROM users WHERE id = ?", [userId]);
      username = userRow?.username || "User";
    }
    username = String(username).trim() || "User";

    const result = await run(
      `INSERT INTO game_comments (game_id, user_id, username, content, rating, created_at)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [game.id, userId, username, content, rating]
    );

    console.log(`[COMMENT SAVED] id=${result.id}, game_id=${game.id}, user_id=${userId}`);

    if (rating !== null) {
      await run(
        `INSERT INTO game_ratings (game_id, user_id, rating) VALUES (?, ?, ?)
         ON CONFLICT(game_id, user_id) DO UPDATE SET rating = excluded.rating, created_at = CURRENT_TIMESTAMP`,
        [game.id, userId, rating]
      );
      await recalculateGameRating(game.id);
    }

    const newComment = await get(
      "SELECT id, user_id, username, content, rating, created_at FROM game_comments WHERE id = ?",
      [result.id]
    );
    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Comment post error:", error);
    return res.status(500).json({ error: "Failed to post comment" });
  }
});

router.delete("/comments/:commentId", authRequired, async (req, res) => {
  const commentId = Number.parseInt(req.params.commentId, 10);
  const userId = req.user.id;
  const userRole = req.user.role;

  if (!Number.isInteger(commentId) || commentId <= 0) {
    return res.status(400).json({ error: "Invalid comment id" });
  }

  try {
    const comment = await get(
      "SELECT user_id, game_id FROM game_comments WHERE id = ? AND is_deleted = 0",
      [commentId]
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const isModerator = userRole === "moderator" || userRole === "admin";
    if (!isModerator && comment.user_id !== userId) {
      return res.status(403).json({ error: "You can only delete your own comments" });
    }

    await run(
      "UPDATE game_comments SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [commentId]
    );
    return res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Delete comment error:", error);
    return res.status(500).json({ error: "Failed to delete comment" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const row = await get(
      `
        SELECT *
        FROM games
        WHERE slug = ? AND status = 'published'
      `,
      [req.params.slug]
    );

    if (!row) {
      return res.status(404).json({ error: "Game not found" });
    }

    const game = mapGameRow(row);
    const ratingRows = await all(
      "SELECT rating, COUNT(*) as count FROM game_ratings WHERE game_id = ? GROUP BY rating",
      [row.id]
    );
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const ratingRow of ratingRows) {
      if (ratingRow.rating >= 1 && ratingRow.rating <= 5) {
        distribution[ratingRow.rating] = ratingRow.count;
      }
    }
    game.rating_distribution = distribution;

    return res.json(game);
  } catch (error) {
    console.error("Failed to load game:", error);
    return res.status(500).json({ error: "Failed to load game" });
  }
});

router.post("/submit", authRequired, uploadMiddleware, async (req, res) => {
  const files = req.files || {};
  const body = req.body || {};

  const title = trimField(body.title);
  const description = trimField(body.description);
  const genre = trimField(body.genre);
  const archiveFile = files.archive?.[0];
  const thumbnailFile = files.thumbnail?.[0];
  const screenshotFiles = files.screenshots || [];

  const errors = [];
  if (!title) {
    errors.push("title is required");
  }
  if (!description) {
    errors.push("description is required");
  }
  if (!genre) {
    errors.push("genre is required");
  }
  if (!archiveFile) {
    errors.push("archive is required");
  }
  if (!thumbnailFile) {
    errors.push("thumbnail is required");
  }
  if (screenshotFiles.length === 0) {
    errors.push("at least one screenshot is required");
  }

  if (errors.length > 0) {
    removeUploadedFiles(files);
    return res.status(400).json({ error: errors.join("; ") });
  }

  try {
    const archiveUrl = filePublicUrl("archive", archiveFile.filename);
    const coverUrl = filePublicUrl("thumbnail", thumbnailFile.filename);
    const screenshots = JSON.stringify(
      screenshotFiles.map((file) => filePublicUrl("screenshots", file.filename))
    );
    const minRequirements = buildRequirements("min", body);
    const recRequirements = buildRequirements("rec", body);
    const engine = trimField(body.engine) || null;
    const projectLink = trimField(body.link) || null;
    const trailerLink = trimField(body.video) || null;
    const installedSize = optionalField(body.installed_size);
    const platform = optionalField(body.platform);
    const multiplayer = optionalField(body.multiplayer);
    const releaseDate = optionalField(body.release_date);

    let archiveSize = null;
    if (archiveFile.path) {
      const { size } = fs.statSync(archiveFile.path);
      archiveSize = formatArchiveSize(size);
    }

    const inserted = await run(
      `
        INSERT INTO game_submissions (
          user_id,
          title,
          description,
          genre,
          cover_url,
          archive_url,
          archive_size,
          installed_size,
          platform,
          multiplayer,
          release_date,
          screenshots,
          min_requirements,
          rec_requirements,
          engine,
          project_link,
          trailer_link,
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `,
      [
        req.user.id,
        title,
        description,
        genre,
        coverUrl,
        archiveUrl,
        archiveSize,
        installedSize,
        platform,
        multiplayer,
        releaseDate,
        screenshots,
        minRequirements,
        recRequirements,
        engine,
        projectLink,
        trailerLink
      ]
    );

    return res.status(201).json({
      id: inserted.id,
      status: "pending",
      message: "Game submission received"
    });
  } catch (error) {
    console.error("Game submission failed:", error);
    removeUploadedFiles(files);
    return res.status(500).json({ error: "Failed to submit game" });
  }
});

// DELETE /api/games/:gameId – удаление игры (только модератор)
router.delete("/:gameId", authRequired, requireModerator, async (req, res) => {
  const gameId = Number.parseInt(req.params.gameId, 10);
  if (!Number.isInteger(gameId) || gameId <= 0) {
    return res.status(400).json({ error: "Invalid game id" });
  }
  try {
    const game = await get(
      "SELECT id, title, created_by, download_url, cover_url FROM games WHERE id = ? AND status = 'published'",
      [gameId]
    );
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    await run("DELETE FROM games WHERE id = ?", [gameId]);

    console.log(
      `[EMAIL STUB] Game "${game.title}" (id ${game.id}) deleted by moderator ${req.user.id}. Author id: ${game.created_by}. To implement real email later.`
    );

    return res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error("Failed to delete game:", error);
    return res.status(500).json({ error: "Failed to delete game" });
  }
});

module.exports = router;
