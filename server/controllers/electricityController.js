const Electricity = require("../models/Electricity");
const csvParser = require("csv-parser");
const fs = require("fs");

module.exports = {
  // Upload Electricity Data (via CSV file)
  async uploadElectricityData(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const electricityData = [];
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on("data", (row) => {
          electricityData.push({
            dailyUsage: row.dailyUsage,
            peakHours: row.peakHours,
            outageLogs: row.outageLogs ? row.outageLogs.split(";") : [],
          });
        })
        .on("end", async () => {
          try {
            await Electricity.insertMany(electricityData);
            res
              .status(201)
              .json({ message: "Electricity data uploaded successfully" });
          } catch (err) {
            res.status(500).json({ error: "Error saving electricity data" });
          }
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Fetch all Electricity Data
  async getElectricityData(req, res) {
    try {
      const data = await Electricity.find();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create Single Electricity Record
  async createElectricityData(req, res) {
    try {
      const { dailyUsage, peakHours, outageLogs } = req.body;
      const newRecord = await Electricity.create({
        dailyUsage,
        peakHours,
        outageLogs,
      });
      res
        .status(201)
        .json({ message: "Electricity data created", data: newRecord });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete Electricity Data
  async deleteElectricityData(req, res) {
    try {
      const { id } = req.params;
      await Electricity.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: "Electricity data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
