const mongoose = require("mongoose");
const Water = require("../../models/Water");

describe("Water Model", () => {
  it("should validate a proper water schema", async () => {
    const validWater = new Water({
      dailyConsumption: 100,
      availability: true,
      sourceType: "River",
    });

    const validationError = validWater.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("should throw validation error for missing fields", async () => {
    const invalidWater = new Water({
      availability: true,
    });

    const validationError = invalidWater.validateSync();
    expect(validationError.errors.dailyConsumption).toBeDefined();
    expect(validationError.errors.sourceType).toBeDefined();
  });
});
