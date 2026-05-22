const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "database.sqlite");
const MODERATOR_EMAILS = ["moderator@example.com", "moderator1@example.com"];

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function closeDb(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function ensureRoleColumn(db) {
  const columns = await all(db, "PRAGMA table_info(users)");
  const hasRole = columns.some((col) => col.name === "role");
  if (!hasRole) {
    console.log("Поле role отсутствует — добавляем...");
    await run(
      db,
      "ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'"
    );
    console.log("Поле role добавлено.");
  } else {
    console.log("Поле role уже существует.");
  }
}

async function setModerators(db) {
  for (const email of MODERATOR_EMAILS) {
    const user = await get(db, "SELECT id, email, role FROM users WHERE email = ?", [
      email
    ]);
    if (!user) {
      console.warn(`Предупреждение: пользователь с email ${email} не найден.`);
      continue;
    }
    await run(db, "UPDATE users SET role = 'moderator' WHERE email = ?", [email]);
    console.log(`Роль moderator установлена для ${email}.`);
  }

  const placeholders = MODERATOR_EMAILS.map(() => "?").join(", ");
  const updated = await all(
    db,
    `SELECT email, role FROM users WHERE email IN (${placeholders})`,
    MODERATOR_EMAILS
  );

  console.log("\nПользователи после обновления:");
  if (updated.length === 0) {
    console.log("  (ни один из указанных email не найден в БД)");
  } else {
    for (const row of updated) {
      console.log(`  ${row.email} — role: ${row.role}`);
    }
  }
}

async function main() {
  const db = new sqlite3.Database(dbPath);
  try {
    await ensureRoleColumn(db);
    await setModerators(db);
  } catch (err) {
    console.error("Ошибка:", err.message);
    process.exitCode = 1;
  } finally {
    await closeDb(db);
  }
}

main();
