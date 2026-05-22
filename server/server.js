require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const { initDb } = require("./db");
const {
  createUpdateUserActivity,
  setActivityMap
} = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const assetRoutes = require("./routes/assets");
const createForumRouter = require("./routes/forum");

let forumMessages = [
  {
    id: 1,
    userId: 0,
    username: "System",
    content: "Welcome to the GameLab forum!",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isDeleted: false
  },
  {
    id: 2,
    userId: 0,
    username: "System",
    content: "Be respectful. Use @username to mention someone.",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    isDeleted: false
  }
];
let nextMessageId = 3;
let pinnedMessageId = null;
let userLastSeen = new Map();

const forumState = {
  get forumMessages() {
    return forumMessages;
  },
  get nextMessageId() {
    return nextMessageId;
  },
  set nextMessageId(value) {
    nextMessageId = value;
  },
  get pinnedMessageId() {
    return pinnedMessageId;
  },
  set pinnedMessageId(value) {
    pinnedMessageId = value;
  },
  userLastSeen
};

const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5500";

const updateUserActivity = createUpdateUserActivity(userLastSeen);
setActivityMap(userLastSeen);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.use(express.json());
app.use(updateUserActivity);

setInterval(() => {
  const cutoff = Date.now() - 2 * 60 * 1000;
  for (const [userId, entry] of userLastSeen) {
    if (!entry?.lastSeen || entry.lastSeen < cutoff) {
      userLastSeen.delete(userId);
    }
  }
}, 60 * 1000);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "gamelab-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/forum", createForumRouter(forumState));

app.use(express.static(path.join(__dirname, "..")));

app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`GameLab backend started on port ${PORT}`);
      console.log(
        "Forum moderator test: UPDATE users SET role = 'moderator' WHERE id = 1;"
      );
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database", error);
    process.exit(1);
  });
