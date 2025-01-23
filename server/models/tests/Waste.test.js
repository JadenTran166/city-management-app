const Waste = require("../../models/Waste");

describe("Waste Model", () => {
  it("should validate a proper waste schema", async () => {
    const validWaste = new Waste({
      collectionFrequency: "Weekly",
      recyclingRate: 50,
    });

    const validationError = validWaste.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("should throw validation error for missing fields", async () => {
    const invalidWaste = new Waste({
      recyclingRate: 60,
    });

    const validationError = invalidWaste.validateSync();
    expect(validationError.errors.collectionFrequency).toBeDefined();
  });
});
