const express = require("express");
const router = express.Router();

const waterRoutes = require("./waterRoutes");
const electricityRoutes = require("./electricityRoutes");
const wasteRoutes = require("./wasteRoutes");

router.use("/water", waterRoutes);
router.use("/electricity", electricityRoutes);
router.use("/waste", wasteRoutes);

module.exports = router;
