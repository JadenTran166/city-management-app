const {
  uploadElectricityData,
  getElectricityData,
} = require("../../controllers/electricityController");
const Electricity = require("../../models/Electricity");

jest.mock("../../models/Electricity");

describe("Electricity Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("uploadElectricityData", () => {
    it("should upload electricity data successfully", async () => {
      const mockRequest = {
        file: { path: "mockFile.csv" },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Electricity.insertMany.mockResolvedValue([
        { dailyUsage: 120, peakHours: "18:00-22:00" },
      ]);

      await uploadElectricityData(mockRequest, mockResponse);

      expect(Electricity.insertMany).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Electricity data uploaded successfully",
      });
    });

    it("should handle file parsing errors", async () => {
      const mockRequest = { file: null };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await uploadElectricityData(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "No file uploaded",
      });
    });
  });

  describe("getElectricityData", () => {
    it("should fetch electricity data", async () => {
      const mockData = [{ dailyUsage: 150, peakHours: "08:00-10:00" }];
      Electricity.find.mockResolvedValue(mockData);

      const mockRequest = {};
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getElectricityData(mockRequest, mockResponse);

      expect(Electricity.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });
  });
});
