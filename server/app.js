const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes");
const authMiddleware = require("./middleware/authMiddleware");
const initializeMockData = require("./migrations");
const cors = require("cors");

const waterRoutes = require("./routes/waterRoutes");
const electricityRoutes = require("./routes/electricityRoutes");
const wasteRoutes = require("./routes/wasteRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.use("/api/water", waterRoutes);
app.use("/api/electricity", electricityRoutes);
app.use("/api/waste", wasteRoutes);

app.get("/", (req, res) => {
  res.send("City Management App Backend is Running");
});

module.exports = app;
