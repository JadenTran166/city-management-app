const Waste = require("../models/Waste");

module.exports = {
  // Create Waste Data
  async createWasteData(req, res) {
    try {
      const { collectionFrequency, recyclingRate, wasteType } = req.body;

      const newWaste = await Waste.create({
        collectionFrequency,
        recyclingRate,
        wasteType,
      });

      res.status(201).json({ message: "Waste data created", data: newWaste });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Fetch all Waste Data
  async getWasteData(req, res) {
    try {
      const data = await Waste.find();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update Waste Data
  async updateWasteData(req, res) {
    try {
      const { id } = req.params;
      const { collectionFrequency, recyclingRate, wasteType } = req.body;

      const updatedWaste = await Waste.findByIdAndUpdate(
        id,
        { collectionFrequency, recyclingRate, wasteType },
        { new: true }
      );

      if (!updatedWaste) {
        return res.status(404).json({ error: "Waste data not found" });
      }

      res
        .status(200)
        .json({ message: "Waste data updated", data: updatedWaste });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete Waste Data
  async deleteWasteData(req, res) {
    try {
      const { id } = req.params;
      await Waste.findByIdAndDelete(id);
      res.status(200).json({ message: "Waste data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
