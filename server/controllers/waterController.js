const Water = require("../models/Water");

module.exports = {
  async createWaterData(req, res) {
    try {
      const { dailyConsumption, availability, sourceType } = req.body;

      const newWater = await Water.create({
        dailyConsumption,
        availability,
        sourceType,
      });

      res.status(201).json({ message: "Water data created", data: newWater });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getWaterData(req, res) {
    try {
      const data = await Water.find();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getWaterById(req, res) {
    try {
      const { id } = req.params;
      const waterData = await Water.findById(id);

      if (!waterData) {
        return res.status(404).json({ error: "Water data not found" });
      }

      res.status(200).json({ data: waterData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateWaterData(req, res) {
    try {
      const { id } = req.params;
      const { dailyConsumption, availability, sourceType } = req.body;

      const updatedWater = await Water.findByIdAndUpdate(
        id,
        { dailyConsumption, availability, sourceType },
        { new: true }
      );

      if (!updatedWater) {
        return res.status(404).json({ error: "Water data not found" });
      }

      res
        .status(200)
        .json({ message: "Water data updated", data: updatedWater });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteWaterData(req, res) {
    try {
      const { id } = req.params;
      const deletedWater = await Water.findByIdAndDelete(id);

      if (!deletedWater) {
        return res.status(404).json({ error: "Water data not found" });
      }

      res.status(200).json({ message: "Water data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
