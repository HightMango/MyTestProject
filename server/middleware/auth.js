const jwt = require("jsonwebtoken");
const { get } = require("../db");

let activityMap = null;

function setActivityMap(map) {
  activityMap = map;
}

async function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await get(
      "SELECT id, email, username, role FROM users WHERE id = ?",
      [decoded.sub]
    );
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role || "user"
    };
    if (activityMap) {
      activityMap.set(String(user.id), {
        lastSeen: Date.now(),
        username: user.username
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requireModerator(req, res, next) {
  const role = req.user?.role;
  if (role !== "moderator" && role !== "admin") {
    return res.status(403).json({ error: "Moderator access required" });
  }
  return next();
}

function createUpdateUserActivity(userLastSeen) {
  return function updateUserActivity(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = String(decoded.sub);
        const existing = userLastSeen.get(userId);
        userLastSeen.set(userId, {
          lastSeen: Date.now(),
          username: existing?.username || decoded.username || null
        });
      } catch {
        /* ignore invalid token */
      }
    }
    return next();
  };
}

module.exports = {
  authRequired,
  requireModerator,
  createUpdateUserActivity,
  setActivityMap
};
