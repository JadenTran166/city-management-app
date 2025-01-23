const Electricity = require("../../models/Electricity");

describe("Electricity Model", () => {
  it("should validate a proper electricity schema", async () => {
    const validElectricity = new Electricity({
      dailyUsage: 100,
      peakHours: "18:00-20:00",
      outageLogs: ["2025-01-22 13:00", "2025-01-23 18:00"],
    });

    const validationError = validElectricity.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("should throw validation error for missing required fields", async () => {
    const invalidElectricity = new Electricity({
      peakHours: "18:00-20:00",
    });

    const validationError = invalidElectricity.validateSync();
    expect(validationError.errors.dailyUsage).toBeDefined();
  });
});
