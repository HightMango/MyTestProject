require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const { initDb } = require("./db");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const assetRoutes = require("./routes/assets");

const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5500";

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "gamelab-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/assets", assetRoutes);

app.use(express.static(path.join(__dirname, "..")));

app.use((error, _req, res, _next) => {
  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`GameLab backend started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database", error);
    process.exit(1);
  });
