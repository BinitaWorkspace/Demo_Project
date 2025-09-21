import fs from "fs";
import path from "path";
import { Locator, Page, expect } from "@playwright/test";
import { Logger, LogLevel } from "./Logger";

export class BrowserUtils {
  private readonly logger: Logger;

  constructor(protected readonly page: Page) {
    this.logger = Logger.getInstance();
  }

  private resolveLocator(selector: string | Locator): Locator {
    if (typeof selector === "string") {
      return this.page.locator(selector); // Playwright will auto-detect 'xpath=' or CSS
    }
    return selector;
  }

  async waitForElement(
    selector: string | Locator,
    timeout = 60000
  ): Promise<void> {
    const locator = this.resolveLocator(selector);
    const selectorText = typeof selector === "string" ? selector : "<Locator>";
    this.logger.log(LogLevel.INFO, `Waiting for element: ${selectorText}`);
    await locator.waitFor({ state: "visible", timeout });
    this.logger.log(LogLevel.DEBUG, `Element visible: ${selectorText}`);
  }

  async clickElement(selector: string | Locator): Promise<void> {
    const locator = this.resolveLocator(selector);
    this.logger.log(LogLevel.INFO, `Clicking element: ${locator}`);
    await this.waitForElement(locator);
    await locator.click();
    await this.takeScreenshot(`click-${Date.now()}`);
    this.logger.log(LogLevel.DEBUG, `Clicked element: ${locator}`);
  }

  async safeClick(selector: string | Locator): Promise<void> {
    const locator = this.resolveLocator(selector);
    try {
      await this.clickElement(locator);
    } catch (error) {
      this.logger.log(LogLevel.ERROR, `Error clicking ${locator}: ${error}`);
      await this.takeScreenshot(`error-${Date.now()}`);
      throw error;
    }
  }

  async typeText(selector: string | Locator, text: string): Promise<void> {
    const locator = this.resolveLocator(selector);
    this.logger.log(LogLevel.INFO, `Typing into ${locator}: "${text}"`);
    await this.waitForElement(locator);
    await locator.fill(text);
    await this.takeScreenshot(`type-${text}-${Date.now()}`);
    this.logger.log(LogLevel.DEBUG, `Typed text into ${locator}`);
  }

  async selectDropdownOption(
    dropdownSelector: string | Locator,
    optionText: string
  ): Promise<void> {
    const dropdown = this.resolveLocator(dropdownSelector);
    this.logger.log(
      LogLevel.INFO,
      `Selecting "${optionText}" from dropdown: ${dropdown}`
    );
    await this.clickElement(dropdown);
    const option = this.page.locator(`div[role='option']`, {
      hasText: optionText,
    });
    await option.waitFor({ state: "visible" });
    await option.click();
    await this.takeScreenshot(`select-${optionText}-${Date.now()}`);
    this.logger.log(LogLevel.DEBUG, `Selected option "${optionText}"`);
  }

  async takeScreenshot(label: string): Promise<void> {
    const dir = path.join("test-results", "screenshots");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${label}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    this.logger.log(LogLevel.INFO, `Screenshot saved: ${filePath}`);
  }
  /**
   * Get text content of an element
   */
  async getText(selector: string | Locator): Promise<string> {
    const locator = this.resolveLocator(selector);
    this.logger.log(LogLevel.INFO, `Getting text from: ${locator}`);
    await this.waitForElement(locator);
    const text = await locator.textContent();
    this.logger.log(LogLevel.DEBUG, `Text from ${locator}: "${text}"`);
    return text?.trim() || "";
  }
  /**
   * Check if an element exists in the DOM
   */
  async elementExists(selector: string | Locator): Promise<boolean> {
    const locator = this.resolveLocator(selector);
    this.logger.log(LogLevel.INFO, `Checking existence of: ${locator}`);
    const count = await locator.count();
    const exists = count > 0;
    this.logger.log(LogLevel.DEBUG, `Element exists: ${exists}`);
    return exists;
  }
  // Default delay
  async waitForDefaultDelay(): Promise<void> {
    await this.page.waitForTimeout(2000); 
  }
  // Inside the BrowserUtils class
async expectElementText(
  selector: string | Locator,
  expectedText: string,
  contains: boolean = true
): Promise<void> {
  const locator = this.resolveLocator(selector);
  await this.waitForElement(locator);

  const actualText = await locator.textContent();
  const trimmedText = actualText?.trim() || "";

  if (contains) {
    expect(trimmedText).toContain(expectedText);
    this.logger.log(LogLevel.INFO, `Assertion passed: "${trimmedText}" contains "${expectedText}"`);
  } else {
    expect(trimmedText).toBe(expectedText);
    this.logger.log(LogLevel.INFO, `Assertion passed: "${trimmedText}" equals "${expectedText}"`);
  }
}
}
