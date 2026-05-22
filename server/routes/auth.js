const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { run, get } = require("../db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

function createToken(user) {
  return jwt.sign(
    { email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { subject: String(user.id), expiresIn: "7d" }
  );
}

function userResponse(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    created_at: user.created_at,
    role: user.role || "user"
  };
}

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body || {};

  if (!email || !password || !username) {
    return res.status(400).json({ error: "email, password and username are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password should be at least 6 characters long" });
  }
  if (username.length < 2 || username.length > 40) {
    return res.status(400).json({ error: "Username should be from 2 to 40 characters" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = await get("SELECT id FROM users WHERE email = ?", [normalizedEmail]);
  if (existing) {
    return res.status(409).json({ error: "Email is already registered" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const inserted = await run(
    "INSERT INTO users (email, username, password_hash, role) VALUES (?, ?, ?, 'user')",
    [normalizedEmail, username.trim(), passwordHash]
  );

  await run("INSERT INTO profiles (user_id) VALUES (?)", [inserted.id]);

  const user = await get(
    "SELECT id, email, username, role, created_at FROM users WHERE id = ?",
    [inserted.id]
  );
  const token = createToken(user);

  return res.status(201).json({ token, user: userResponse(user) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await get(
    "SELECT id, email, username, password_hash, role, created_at FROM users WHERE email = ?",
    [normalizedEmail]
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = createToken(user);
  return res.json({
    token,
    user: userResponse(user)
  });
});

router.get("/me", authRequired, async (req, res) => {
  const user = await get(
    "SELECT id, email, username, role, created_at FROM users WHERE id = ?",
    [req.user.id]
  );
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ user: userResponse(user) });
});

module.exports = router;
