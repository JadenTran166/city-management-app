const { createWaterData, getWaterData } = require("../waterController");
const Water = require("../../models/Water");

jest.mock("../../models/Water");

describe("Water Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createWaterData", () => {
    it("should create water data successfully", async () => {
      const mockRequest = {
        body: {
          dailyConsumption: 100,
          availability: true,
          sourceType: "River",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Water.create.mockResolvedValue(mockRequest.body);

      await createWaterData(mockRequest, mockResponse);

      expect(Water.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Water data created",
        data: mockRequest.body,
      });
    });

    it("should handle errors gracefully", async () => {
      const mockRequest = { body: {} };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Water.create.mockRejectedValue(new Error("Validation failed"));

      await createWaterData(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Validation failed",
      });
    });
  });

  describe("getWaterData", () => {
    it("should return all water data", async () => {
      const mockData = [
        { dailyConsumption: 100, availability: true, sourceType: "River" },
      ];
      const mockRequest = {};
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Water.find.mockResolvedValue(mockData);

      await getWaterData(mockRequest, mockResponse);

      expect(Water.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });
  });
});
