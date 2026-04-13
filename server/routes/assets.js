const express = require("express");
const { run } = require("../db");
const { authRequired } = require("../middleware/auth");

const router = express.Router();

router.post("/:assetId/view", authRequired, async (req, res) => {
  const assetId = (req.params.assetId || "").trim();
  if (!assetId || assetId.length > 120) {
    return res.status(400).json({ error: "Invalid asset id" });
  }

  await run(
    "INSERT INTO asset_views (user_id, asset_id) VALUES (?, ?)",
    [req.user.id, assetId]
  );

  return res.status(201).json({ ok: true });
});

module.exports = router;
