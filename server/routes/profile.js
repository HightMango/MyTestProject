const express = require("express");
const { get, run, all } = require("../db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authRequired, async (req, res) => {
  const user = await get(
    `
      SELECT
        u.id,
        u.email,
        u.username,
        u.created_at,
        p.bio,
        p.avatar_url,
        p.updated_at
      FROM users u
      LEFT JOIN profiles p ON p.user_id = u.id
      WHERE u.id = ?
    `,
    [req.user.id]
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ profile: user });
});

router.patch("/me", authRequired, async (req, res) => {
  const { bio, avatar_url: avatarUrl } = req.body || {};

  const safeBio = typeof bio === "string" ? bio.trim() : "";
  const safeAvatarUrl = typeof avatarUrl === "string" ? avatarUrl.trim() : "";

  if (safeBio.length > 300) {
    return res.status(400).json({ error: "Bio should be up to 300 characters" });
  }
  if (safeAvatarUrl.length > 500) {
    return res.status(400).json({ error: "Avatar URL is too long" });
  }

  await run(
    `
      UPDATE profiles
      SET bio = ?, avatar_url = ?, updated_at = datetime('now')
      WHERE user_id = ?
    `,
    [safeBio, safeAvatarUrl, req.user.id]
  );

  const updated = await get(
    `
      SELECT
        u.id,
        u.email,
        u.username,
        u.created_at,
        p.bio,
        p.avatar_url,
        p.updated_at
      FROM users u
      LEFT JOIN profiles p ON p.user_id = u.id
      WHERE u.id = ?
    `,
    [req.user.id]
  );

  return res.json({ profile: updated });
});

router.get("/me/recent-views", authRequired, async (req, res) => {
  const rawLimit = Number.parseInt(req.query.limit, 10);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 50)
    : 20;

  const items = await all(
    `
      SELECT id, asset_id, viewed_at
      FROM asset_views
      WHERE user_id = ?
      ORDER BY viewed_at DESC
      LIMIT ?
    `,
    [req.user.id, limit]
  );

  return res.json({ items });
});

module.exports = router;
