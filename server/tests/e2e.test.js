// server/tests/e2e.test.js
const { remote } = require("webdriverio");
const assert = require("assert");

let browser;

describe("E2E Tests for City Management App", () => {
  before(async () => {
    browser = await remote({
      logLevel: "error",
      capabilities: {
        browserName: "chrome",
      },
    });
  });

  after(async () => {
    await browser.deleteSession();
  });

  it("should load the application and display the header", async () => {
    await browser.url("http://localhost:3000");
    const header = await browser.$("header");
    assert.ok(await header.isDisplayed(), "Header is not displayed");
  });

  it("should allow manager login and create water data", async () => {
    await browser.url("http://localhost:3000/login");
    const usernameInput = await browser.$("#username");
    const passwordInput = await browser.$("#password");
    const loginButton = await browser.$("#login-btn");

    await usernameInput.setValue("manager");
    await passwordInput.setValue("manager123");
    await loginButton.click();

    const createWaterButton = await browser.$("#create-water-btn");
    await createWaterButton.click();

    const dailyConsumptionInput = await browser.$("#daily-consumption");
    const availabilityCheckbox = await browser.$("#availability");
    const sourceTypeInput = await browser.$("#source-type");
    const submitButton = await browser.$("#submit-btn");

    await dailyConsumptionInput.setValue(150);
    await availabilityCheckbox.click();
    await sourceTypeInput.setValue("Reservoir");
    await submitButton.click();

    const successMessage = await browser.$(".success-message");
    assert.ok(
      await successMessage.isDisplayed(),
      "Success message not displayed"
    );
  });

  it("should restrict viewer role from creating data", async () => {
    await browser.url("http://localhost:3000/login");
    const usernameInput = await browser.$("#username");
    const passwordInput = await browser.$("#password");
    const loginButton = await browser.$("#login-btn");

    await usernameInput.setValue("viewer");
    await passwordInput.setValue("viewer123");
    await loginButton.click();

    const createWaterButton = await browser.$("#create-water-btn");
    const isDisplayed = await createWaterButton.isDisplayed();
    assert.strictEqual(
      isDisplayed,
      false,
      "Viewer role should not see create button"
    );
  });

  it("should display water data in analytics view", async () => {
    await browser.url("http://localhost:3000/analytics");
    const waterTable = await browser.$("#water-table");
    assert.ok(await waterTable.isDisplayed(), "Water data table not displayed");
  });

  it("should allow manager to upload and parse electricity data", async () => {
    await browser.url("http://localhost:3000/login");
    const usernameInput = await browser.$("#username");
    const passwordInput = await browser.$("#password");
    const loginButton = await browser.$("#login-btn");

    await usernameInput.setValue("manager");
    await passwordInput.setValue("manager123");
    await loginButton.click();

    const uploadElectricityButton = await browser.$("#upload-electricity-btn");
    await uploadElectricityButton.click();

    const fileInput = await browser.$("#file-input");
    const submitFileButton = await browser.$("#submit-file-btn");

    await fileInput.setValue("/path/to/test-file.csv");
    await submitFileButton.click();

    const successMessage = await browser.$(".success-message");
    assert.ok(
      await successMessage.isDisplayed(),
      "Electricity data upload success message not displayed"
    );
  });

  it("should restrict viewer role from uploading electricity data", async () => {
    await browser.url("http://localhost:3000/login");
    const usernameInput = await browser.$("#username");
    const passwordInput = await browser.$("#password");
    const loginButton = await browser.$("#login-btn");

    await usernameInput.setValue("viewer");
    await passwordInput.setValue("viewer123");
    await loginButton.click();

    const uploadElectricityButton = await browser.$("#upload-electricity-btn");
    const isDisplayed = await uploadElectricityButton.isDisplayed();
    assert.strictEqual(
      isDisplayed,
      false,
      "Viewer role should not see upload button"
    );
  });

  it("should allow manager to add waste data manually", async () => {
    await browser.url("http://localhost:3000/login");
    const usernameInput = await browser.$("#username");
    const passwordInput = await browser.$("#password");
    const loginButton = await browser.$("#login-btn");

    await usernameInput.setValue("manager");
    await passwordInput.setValue("manager123");
    await loginButton.click();

    const createWasteButton = await browser.$("#create-waste-btn");
    await createWasteButton.click();

    const collectionFrequencyInput = await browser.$("#collection-frequency");
    const recyclingRateInput = await browser.$("#recycling-rate");
    const wasteTypeInput = await browser.$("#waste-type");
    const submitButton = await browser.$("#submit-btn");

    await collectionFrequencyInput.setValue(3);
    await recyclingRateInput.setValue(75);
    await wasteTypeInput.setValue("Organic");
    await submitButton.click();

    const successMessage = await browser.$(".success-message");
    assert.ok(
      await successMessage.isDisplayed(),
      "Success message for waste data not displayed"
    );
  });

  it("should restrict viewer role from adding waste data", async () => {
    await browser.url("http://localhost:3000/login");
    const usernameInput = await browser.$("#username");
    const passwordInput = await browser.$("#password");
    const loginButton = await browser.$("#login-btn");

    await usernameInput.setValue("viewer");
    await passwordInput.setValue("viewer123");
    await loginButton.click();

    const createWasteButton = await browser.$("#create-waste-btn");
    const isDisplayed = await createWasteButton.isDisplayed();
    assert.strictEqual(
      isDisplayed,
      false,
      "Viewer role should not see create waste button"
    );
  });

  it("should display electricity and waste data in analytics view", async () => {
    await browser.url("http://localhost:3000/analytics");
    const electricityTable = await browser.$("#electricity-table");
    const wasteTable = await browser.$("#waste-table");

    assert.ok(
      await electricityTable.isDisplayed(),
      "Electricity data table not displayed"
    );
    assert.ok(await wasteTable.isDisplayed(), "Waste data table not displayed");
  });
});
