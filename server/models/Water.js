const mongoose = require('mongoose');

const WaterSchema = new mongoose.Schema({
  dailyConsumption: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  sourceType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Water', WaterSchema);