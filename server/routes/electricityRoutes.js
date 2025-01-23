const express = require("express");
const electricityController = require("../controllers/electricityController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  electricityController.uploadElectricityData
);

router.get("/", electricityController.getElectricityData);

router.post("/", electricityController.createElectricityData);

router.delete("/:id", electricityController.deleteElectricityData);

module.exports = router;
