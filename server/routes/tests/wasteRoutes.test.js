const request = require("supertest");
const app = require("../../index");
const Waste = require("../../models/Waste");

jest.mock("../../models/Waste");

describe("Waste Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/waste", () => {
    it("should return waste data", async () => {
      const mockData = [{ collectionFrequency: "Daily", recyclingRate: 80 }];
      Waste.find.mockResolvedValue(mockData);

      const response = await request(app).get("/api/waste");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockData);
    });

    it("should handle errors", async () => {
      Waste.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/waste");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });
});
