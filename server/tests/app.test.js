const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { Water, Electricity, Waste } = require("../models");

describe("API Endpoints", () => {
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

  describe("GET /api/water", () => {
    it("should return a list of water data", async () => {
      await Water.create({
        dailyConsumption: 120,
        availability: true,
        sourceType: "River",
      });
      const res = await request(app).get("/api/water");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty("dailyConsumption", 120);
    });

    it("should return an empty array if no water data exists", async () => {
      await Water.deleteMany();
      const res = await request(app).get("/api/water");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("POST /api/electricity", () => {
    it("should create a new electricity entry", async () => {
      const data = {
        dailyUsage: 500,
        peakHours: "18:00-22:00",
        outageLogs: [],
      };
      const res = await request(app).post("/api/electricity").send(data);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("dailyUsage", 500);
    });

    it("should return 400 if required fields are missing", async () => {
      const data = { peakHours: "18:00-22:00" };
      const res = await request(app).post("/api/electricity").send(data);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("POST /api/waste", () => {
    it("should create a new waste entry", async () => {
      const data = {
        collectionFrequency: "Weekly",
        recyclingRate: 30,
        wasteType: "Plastic",
      };
      const res = await request(app).post("/api/waste").send(data);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("wasteType", "Plastic");
    });

    it("should return 400 for invalid recycling rate", async () => {
      const data = {
        collectionFrequency: "Weekly",
        recyclingRate: -5,
        wasteType: "Plastic",
      };
      const res = await request(app).post("/api/waste").send(data);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});
