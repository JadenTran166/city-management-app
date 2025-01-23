const {
  createWasteData,
  getWasteData,
} = require("../../controllers/wasteController");
const Waste = require("../../models/Waste");

jest.mock("../../models/Waste");

describe("Waste Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createWasteData", () => {
    it("should create waste data successfully", async () => {
      const mockRequest = {
        body: { collectionFrequency: "Weekly", recyclingRate: 65 },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Waste.create.mockResolvedValue(mockRequest.body);

      await createWasteData(mockRequest, mockResponse);

      expect(Waste.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Waste data created",
        data: mockRequest.body,
      });
    });

    it("should handle validation errors", async () => {
      const mockRequest = { body: {} };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Waste.create.mockRejectedValue(new Error("Validation failed"));

      await createWasteData(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Validation failed",
      });
    });
  });

  describe("getWasteData", () => {
    it("should fetch waste data", async () => {
      const mockData = [{ collectionFrequency: "Daily", recyclingRate: 80 }];
      Waste.find.mockResolvedValue(mockData);

      const mockRequest = {};
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getWasteData(mockRequest, mockResponse);

      expect(Waste.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockData });
    });
  });
});
