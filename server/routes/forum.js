const express = require("express");
const { get } = require("../db");
const { authRequired, requireModerator } = require("../middleware/auth");
const { filterProfanity } = require("../utils/profanityFilter");
// const BAD_WORDS = [
//   "хуй",
//   "хуя",
//   "хуе",
//   "пизда",
//   "пиздец",
//   "пидорасить",
//   "пидор",
//   "бля",
//   "блять",
//   "ебать",
//   "ебать",
//   "еблан",
//   "сука",
//   "fuck",
//   "shit",
//   "bitch",
//   "asshole"
// ];

// function filterProfanity(text) {
//   let result = text;
//   for (const word of BAD_WORDS) {
//     const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const re = new RegExp(escaped, "gi");
//     result = result.replace(re, "***");
//   }
//   return result;
// }

function toPublicMessage(msg) {
  return {
    id: msg.id,
    userId: msg.userId,
    username: msg.username,
    content: msg.content,
    createdAt: msg.createdAt,
    isDeleted: msg.isDeleted
  };
}

module.exports = function createForumRouter(state) {
  const router = express.Router();
  const { forumMessages, userLastSeen } = state;

  router.get("/messages", (_req, res) => {
    const active = forumMessages.filter((m) => !m.isDeleted);
    const sorted = [...active].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const messages = sorted.slice(-50).map(toPublicMessage);

    let pinned = null;
    if (state.pinnedMessageId != null) {
      const pinMsg = forumMessages.find((m) => m.id === state.pinnedMessageId);
      if (pinMsg && !pinMsg.isDeleted) {
        pinned = toPublicMessage(pinMsg);
      }
    }

    return res.json({ messages, pinned });
  });

  router.post("/messages", authRequired, (req, res) => {
    const raw = typeof req.body?.content === "string" ? req.body.content.trim() : "";
    if (!raw) {
      return res.status(400).json({ error: "Message content is required" });
    }
    if (raw.length > 500) {
      return res.status(400).json({ error: "Message should be up to 500 characters" });
    }

    const message = {
      id: state.nextMessageId++,
      userId: req.user.id,
      username: req.user.username,
      content: filterProfanity(raw),
      createdAt: new Date().toISOString(),
      isDeleted: false
    };

    forumMessages.push(message);
    return res.status(201).json(toPublicMessage(message));
  });

  router.delete("/messages/:id", authRequired, requireModerator, (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    const message = forumMessages.find((m) => m.id === id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    message.isDeleted = true;
    return res.sendStatus(200);
  });

  router.post("/pin", authRequired, requireModerator, (req, res) => {
    const { messageId } = req.body || {};

    if (messageId == null) {
      state.pinnedMessageId = null;
      return res.json({ pinned: null });
    }

    const id = Number.parseInt(messageId, 10);
    const message = forumMessages.find((m) => m.id === id && !m.isDeleted);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    state.pinnedMessageId = id;
    return res.json({ pinned: toPublicMessage(message) });
  });

  router.get("/online", async (_req, res) => {
    const cutoff = Date.now() - 2 * 60 * 1000;
    const activeIds = [];

    for (const [userId, entry] of userLastSeen) {
      if (entry.lastSeen >= cutoff) {
        activeIds.push(userId);
      }
    }

    const usernames = [];
    for (const userId of activeIds) {
      const entry = userLastSeen.get(userId);
      if (entry?.username) {
        usernames.push(entry.username);
        continue;
      }
      const user = await get("SELECT username FROM users WHERE id = ?", [userId]);
      if (user?.username) {
        usernames.push(user.username);
        if (entry) {
          entry.username = user.username;
        }
      }
    }

    const unique = [...new Set(usernames)].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    return res.json({ users: unique });
  });

  return router;
};
