const { Water, Electricity, Waste } = require("../models");

const initializeMockData = async () => {
  const waterCount = await Water.countDocuments();
  const electricityCount = await Electricity.countDocuments();
  const wasteCount = await Waste.countDocuments();

  if (waterCount === 0) {
    await Water.create([
      { dailyConsumption: 120, availability: true, sourceType: "River" },
      { dailyConsumption: 150, availability: false, sourceType: "Reservoir" },
    ]);
    console.log("Water mock data initialized");
  }

  if (electricityCount === 0) {
    await Electricity.create([
      { dailyUsage: 500, peakHours: "18:00-22:00", outageLogs: [] },
      { dailyUsage: 750, peakHours: "19:00-23:00", outageLogs: [] },
    ]);
    console.log("Electricity mock data initialized");
  }

  if (wasteCount === 0) {
    await Waste.create([
      { collectionFrequency: "Daily", recyclingRate: 70, wasteType: "Organic" },
      {
        collectionFrequency: "Weekly",
        recyclingRate: 30,
        wasteType: "Plastic",
      },
    ]);
    console.log("Waste mock data initialized");
  }
};

module.exports = initializeMockData;
