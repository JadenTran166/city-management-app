const request = require("supertest");
const app = require("../../index"); // Entry point of the server
const Water = require("../../models/Water");

jest.mock("../../models/Water");

describe("Water Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/water", () => {
    it("should return all water data", async () => {
      const mockData = [
        { dailyConsumption: 100, availability: true, sourceType: "River" },
      ];
      Water.find.mockResolvedValue(mockData);

      const response = await request(app).get("/api/water");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockData);
    });

    it("should handle errors", async () => {
      Water.find.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/api/water");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Database error");
    });
  });

  describe("POST /api/water", () => {
    it("should create water data", async () => {
      const mockData = {
        dailyConsumption: 100,
        availability: true,
        sourceType: "River",
      };
      Water.create.mockResolvedValue(mockData);

      const response = await request(app).post("/api/water").send(mockData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Water data created");
      expect(response.body.data).toEqual(mockData);
    });

    it("should handle validation errors", async () => {
      const response = await request(app).post("/api/water").send({});

      expect(response.status).toBe(500); // Assuming server sends a 500 error
    });
  });
});
