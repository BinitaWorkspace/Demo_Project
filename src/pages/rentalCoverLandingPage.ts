import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RentalCoverLandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Locator definitions with explicit strategy
   */
  private readonly locatorMap: Record<string, string> = {
    // Travel Selection
    country_dropdown: "#destinationCountry",
    selectTravelCountry: 'div[id^="react-select"][id*="option-0-0"]',
    //Country I live in
    homeCountryChange: '[data-test-id="cor-change-button"]',
    homeCountryDropdown: "(//div[contains(text(),'Australia')])[1]",
    selectHomeCountry: "(//div[contains(text(),'United States')])[2]",

    //Vehile I want to rent
    vehicleChange: "//button[normalize-space()='change']",
    vehicleDropdown: "(//div[contains(text(),'Car')])[1]",
    selectVehicle: "(//div[contains(text(),'Car')])[2]",
    
    // Date Selection
    startDate_selector: '#coverageDates-startDate',
    endDate_selector: '#coverageDates-endDate',
    startDate: 'xpath=//td[contains(@aria-label, "September 25, 2025")]',
    endDate: 'xpath=//td[contains(@aria-label, "September 28, 2025")]',

    // QuoteButtons
    getQuoteButton:
      'xpath=//button[@class="sc-313542f3-1 ilhlud form-submit-button btn btn-secondary btn-md"]',

    // State Selection
    selectState: 'xpath=//h1[normalize-space()="We need one more detail..."]',
    stateSearchInput:
      'xpath=//div[@data-test-id="state-selection-modal"]/div/div/div[1]/div[1]',
    stateSelection:
      'xpath=//div[@data-test-id="state-selection-modal"]/div/div/div[2]/div[1]/div[5]',
    finalQuoteButton: 'button[data-test-id="state-selection-modal-cta-button-quote"]',

    // Final Page
    finalPage: '[data-test-id="Heading-title"]:has-text("Your protection")',
  };

  /**
   * Get Playwright Locator from key
   * @param key - Locator key
   * @returns Locator
   */
  getLocator(key: keyof typeof this.locatorMap): Locator {
    const selector = this.locatorMap[key];
    return this.page.locator(selector);
  }

  getPage(): Page {
    return this.page;
  }
}
