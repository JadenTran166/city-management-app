const express = require("express");
const wasteController = require("../controllers/wasteController");

const router = express.Router();

// Create a new waste record
router.post("/", wasteController.createWasteData);

// Fetch all waste records
router.get("/", wasteController.getWasteData);

// Update a specific waste record by ID
router.put("/:id", wasteController.updateWasteData);

// Delete a specific waste record by ID
router.delete("/:id", wasteController.deleteWasteData);

module.exports = router;
