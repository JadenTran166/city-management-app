const express = require("express");
const electricityController = require("../controllers/electricityController");
const multer = require("multer");

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// Upload electricity data via CSV
router.post(
  "/upload",
  upload.single("file"),
  electricityController.uploadElectricityData
);

// Fetch all electricity data
router.get("/", electricityController.getElectricityData);

// Create a single electricity record
router.post("/", electricityController.createElectricityData);

// Delete a specific electricity record by ID
router.delete("/:id", electricityController.deleteElectricityData);

module.exports = router;
