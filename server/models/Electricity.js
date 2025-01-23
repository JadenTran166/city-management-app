const mongoose = require('mongoose');

const ElectricitySchema = new mongoose.Schema({
  dailyUsage: { type: Number, required: true },
  peakHours: { type: String, required: true },
  outageLogs: [{ timestamp: Date, duration: Number }],
}, { timestamps: true });

module.exports = mongoose.model('Electricity', ElectricitySchema);