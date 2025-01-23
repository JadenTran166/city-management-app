const request = require("supertest");
const app = require("../../index");
const Electricity = require("../../models/Electricity");

jest.mock("../../models/Electricity");

describe("Electricity Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/electricity", () => {
    it("should return electricity data", async () => {
      const mockData = [{ dailyUsage: 200, peakHours: "10:00-14:00" }];
      Electricity.find.mockResolvedValue(mockData);

      const response = await request(app).get("/api/electricity");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockData);
    });

    it("should handle database errors", async () => {
      Electricity.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/electricity");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });
});
