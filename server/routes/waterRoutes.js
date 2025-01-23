const express = require("express");
const router = express.Router();
const waterController = require("../controllers/waterController");

router.post("/", waterController.createWaterData);
router.get("/", waterController.getWaterData);
router.get("/:id", waterController.getWaterById);
router.put("/:id", waterController.updateWaterData);
router.delete("/:id", waterController.deleteWaterData);

module.exports = router;
