// eslint-disable-next-line import/order
import webdriver from "selenium-webdriver";
import assert from "assert";
import path from "path";
import { Server } from "http";
import { Page } from "./_helpers";
import { startServer } from "./_server";

jest.retryTimes(3);
jest.setTimeout(30 * 1000);

const PORT = 3000;
let server: Server;
let page: Page;

// @ts-ignore
beforeAll(async () => {
  server = await startServer(PORT);
  let capabilities: webdriver.Capabilities = null as any;
  switch (process.env.BROWSER || "firefox") {
    case "ie": {
      console.log("Setting up for IE");
      // HACK: include IEDriver path by nuget
      const driverPath = path.join(
        __dirname,
        "../Selenium.WebDriver.IEDriver.3.150.0/driver/"
      );
      process.env.PATH = `${process.env.PATH};${driverPath};`;
      capabilities = webdriver.Capabilities.ie();
      capabilities.set("ignoreProtectedModeSettings", true);
      capabilities.set("ignoreZoomSetting", true);
      break;
    }
    case "safari": {
      console.log("Setting up for Safari");
      capabilities = webdriver.Capabilities.safari();
      break;
    }
    case "firefox": {
      console.log("Setting up for Firefox");
      require("geckodriver");
      capabilities = webdriver.Capabilities.firefox();
      break;
    }
  }
  const driver = await new webdriver.Builder()
    .withCapabilities(capabilities)
    .build();
  page = new Page(driver);
});

// @ts-ignore
afterAll(async () => {
  if (page) {
    await page.close();
  }
  if (server) {
    server.close();
  }
});

// @ts-ignore
it("IE should handle this", async () => {
  await page.loadUrl(`http://127.0.0.1:${PORT}/old.html`);
  assert.strictEqual(await page.title(), "IE11-success");
  assert.strictEqual(await page.getText("h1"), "OLD");
  assert.strictEqual(await page.getText("h1"), "OLD");
  assert.strictEqual(await page.getText("[id='mySpan']"), "Appended text");
});
it("IE should fail this", async () => {
  await page.loadUrl(`http://127.0.0.1:${PORT}/modern.html`);
  assert.strictEqual(await page.title(), "IE11-fail");
  assert.strictEqual(await page.getText("h1"), "MODERN");
  assert.strictEqual(await page.getText("[id='mySpan']"), "Appended text");
});
