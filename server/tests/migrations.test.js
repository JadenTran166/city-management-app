const mongoose = require("mongoose");
const initializeMockData = require("../migrations");
const { Water, Electricity, Waste } = require("../models");

describe("Migration Script", () => {
  beforeAll(async () => {
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://localhost:27017/city_management_test";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it("should initialize mock data only if the collection is empty", async () => {
    await initializeMockData();

    const waterCount = await Water.countDocuments();
    const electricityCount = await Electricity.countDocuments();
    const wasteCount = await Waste.countDocuments();

    expect(waterCount).toBeGreaterThan(0);
    expect(electricityCount).toBeGreaterThan(0);
    expect(wasteCount).toBeGreaterThan(0);

    // Running again should not duplicate data
    await initializeMockData();
    expect(await Water.countDocuments()).toEqual(waterCount);
    expect(await Electricity.countDocuments()).toEqual(electricityCount);
    expect(await Waste.countDocuments()).toEqual(wasteCount);
  });

  it("should not initialize data if models already have entries", async () => {
    await Waste.create({
      collectionFrequency: "Daily",
      recyclingRate: 50,
      wasteType: "Organic",
    });

    const initialCount = await Waste.countDocuments();
    await initializeMockData();
    expect(await Waste.countDocuments()).toEqual(initialCount); // No new mock data added
  });
});
