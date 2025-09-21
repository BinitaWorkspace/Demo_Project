import { Page } from "@playwright/test";
import { BrowserUtils } from "../utils/BrowserUtils";

export class BasePage {
  protected utils: BrowserUtils;

  constructor(protected page: Page) {
    this.utils = new BrowserUtils(page);
  }

  /**
   * Navigate to a specific URL
   * @param url - URL to navigate to
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get the current page URL
   * @returns Current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get the page title
   * @returns Page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Refresh the current page
   */
  async refresh(): Promise<void> {
    await this.page.reload();
  }
}
