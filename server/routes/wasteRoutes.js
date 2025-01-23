const express = require("express");
const wasteController = require("../controllers/wasteController");

const router = express.Router();

router.post("/", wasteController.createWasteData);

router.get("/", wasteController.getWasteData);

router.put("/:id", wasteController.updateWasteData);

router.delete("/:id", wasteController.deleteWasteData);

module.exports = router;
