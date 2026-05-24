const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

async function ensureUsersRoleColumn() {
  const columns = await all("PRAGMA table_info(users)");
  const hasRole = columns.some((col) => col.name === "role");
  if (!hasRole) {
    await run("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user'");
  }
}

async function ensureColumns(table, columnDefs) {
  const columns = await all(`PRAGMA table_info(${table})`);
  const names = new Set(columns.map((col) => col.name));
  for (const { name, type } of columnDefs) {
    if (!names.has(name)) {
      await run(`ALTER TABLE ${table} ADD COLUMN ${name} ${type}`);
    }
  }
}

async function initDb() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  await ensureUsersRoleColumn();

  await run(`
    CREATE TABLE IF NOT EXISTS profiles (
      user_id INTEGER PRIMARY KEY,
      bio TEXT NOT NULL DEFAULT '',
      avatar_url TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS asset_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      asset_id TEXT NOT NULL,
      viewed_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE INDEX IF NOT EXISTS idx_asset_views_user_time
    ON asset_views (user_id, viewed_at DESC)
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS game_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      genre TEXT NOT NULL,
      cover_url TEXT,
      archive_url TEXT NOT NULL,
      screenshots TEXT,
      min_requirements TEXT,
      rec_requirements TEXT,
      engine TEXT,
      project_link TEXT,
      trailer_link TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      reviewed_at DATETIME,
      reviewer_id INTEGER,
      rejection_reason TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (reviewer_id) REFERENCES users(id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submission_id INTEGER UNIQUE,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      genre TEXT NOT NULL,
      cover_url TEXT,
      download_url TEXT NOT NULL,
      archive_size TEXT,
      installed_size TEXT,
      platform TEXT,
      multiplayer TEXT,
      publisher TEXT,
      release_date TEXT,
      features TEXT,
      screenshots TEXT,
      min_requirements TEXT,
      rec_requirements TEXT,
      rating_avg REAL DEFAULT 0,
      rating_count INTEGER DEFAULT 0,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'published',
      FOREIGN KEY (submission_id) REFERENCES game_submissions(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  await ensureColumns("game_submissions", [
    { name: "archive_size", type: "TEXT" },
    { name: "installed_size", type: "TEXT" },
    { name: "platform", type: "TEXT" },
    { name: "multiplayer", type: "TEXT" },
    { name: "release_date", type: "TEXT" }
  ]);

  await ensureColumns("games", [
    { name: "archive_size", type: "TEXT" },
    { name: "installed_size", type: "TEXT" },
    { name: "platform", type: "TEXT" },
    { name: "multiplayer", type: "TEXT" },
    { name: "release_date", type: "TEXT" },
    { name: "publisher", type: "TEXT" }
  ]);

  await run(`
    CREATE TABLE IF NOT EXISTS game_ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      rating INTEGER CHECK(rating BETWEEN 1 AND 5),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(game_id, user_id),
      FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS game_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      username TEXT NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER CHECK(rating BETWEEN 1 AND 5),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME,
      is_deleted BOOLEAN DEFAULT 0,
      FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

module.exports = {
  db,
  run,
  get,
  all,
  initDb
};
