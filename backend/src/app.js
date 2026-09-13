const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const questRoutes = require("./routes/questRoutes");
const characterRoutes = require("./routes/characterRoutes");
const shopRoutes = require("./routes/shopRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim());

  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json());
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/quests", questRoutes);
  app.use("/api/character", characterRoutes);
  app.use("/api/shop", shopRoutes);
  app.use("/api/inventory", inventoryRoutes);
  app.use("/api/achievements", achievementRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
