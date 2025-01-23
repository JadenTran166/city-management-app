const mongoose = require('mongoose');

const WasteSchema = new mongoose.Schema({
  collectionFrequency: { type: String, required: true },
  recyclingRate: { type: Number, required: true },
  wasteType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Waste', WasteSchema);