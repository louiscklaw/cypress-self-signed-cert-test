/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import webdriver from "selenium-webdriver";
export class Page {
  constructor(private _driver: webdriver.WebDriver) {}

  async loadUrl(url: string) {
    await this._driver.get(url);
  }

  async getText(selector: string) {
    await this.sleep(250);
    const elem = this._driver.findElement(webdriver.By.css(selector));
    return await elem.getText();
  }

  async title() {
    return this._driver.getTitle();
  }

  async close() {
    return this._driver.quit();
  }

  // Sleep 5min as default
  async sleep(time = 3e5) {
    return this._driver.sleep(time);
  }
}
