import { Page, expect } from "@playwright/test";
import { BrowserUtils } from "../utils/BrowserUtils";
import { Logger, LogLevel } from "../utils/Logger";
import { RentalCoverLandingPage } from "../pages/rentalCoverLandingPage";
import { assert } from "console";
import { promises } from "dns";

export class RentalCoverActions {
  private readonly browserUtils: BrowserUtils;
  private readonly logger: Logger;
  private readonly pageObject: RentalCoverLandingPage;

  constructor(page: Page) {
    this.browserUtils = new BrowserUtils(page);
    this.logger = Logger.getInstance();
    this.pageObject = new RentalCoverLandingPage(page);
  }

  // Step 1: Select travel country
  async selectCountry(): Promise<void> {
    const countryDropdown = this.pageObject.getLocator("country_dropdown");
    const travelCountry = this.pageObject.getLocator("selectTravelCountry");
    //Asserting selected travel country is US
    expect(this.pageObject.getLocator("country_dropdown")).toContainText(
      "United States"
    );
    await this.browserUtils.safeClick(countryDropdown);
    await this.browserUtils.waitForElement(countryDropdown, 2000);
    await this.browserUtils.safeClick(travelCountry);
    await this.browserUtils.waitForDefaultDelay();
    await this.logger.log(LogLevel.INFO, "Selected travel country");
  }
  //Step 2 CLick on the date picker
  async clickDatePicker(): Promise<void> {
    await this.browserUtils.waitForDefaultDelay();
    const startDateInput = this.pageObject.getLocator("startDate_selector");
    await this.browserUtils.waitForElement(startDateInput, 2000);
    await startDateInput.scrollIntoViewIfNeeded();
    await startDateInput.dblclick();
    await this.logger.log(LogLevel.INFO, "Clicked on date picker");
  }

  // Step 3: Select travel start date
  async selectTravelStartDate(): Promise<void> {
    const startDate = this.pageObject.getLocator("startDate");
    await this.browserUtils.waitForElement(startDate);
    expect(this.pageObject.getLocator("startDate")).toContainText("25");
    await this.browserUtils.clickElement(startDate);
    await this.browserUtils.waitForDefaultDelay();
    await this.logger.log(LogLevel.INFO, "Selected travel start date");
    await this.browserUtils.waitForDefaultDelay();
  }

  //Step 5 Click on the end date picker
  async clickEndDatePicker(): Promise<void> {
    const endDateInput = this.pageObject.getLocator("endDate_selector");
    await this.browserUtils.waitForElement(endDateInput);
    await endDateInput.scrollIntoViewIfNeeded();
    await endDateInput.dblclick();
    await this.browserUtils.waitForDefaultDelay();
    await this.logger.log(LogLevel.INFO, "Clicked on end date picker");
  }

  // Step 5: Select travel end date
  async selectTravelEndDate(): Promise<void> {
    const endDate = this.pageObject.getLocator("endDate");
    await this.browserUtils.waitForElement(endDate);
    expect(this.pageObject.getLocator("endDate")).toContainText("28");
    await this.browserUtils.clickElement(endDate);
    await this.browserUtils.waitForDefaultDelay();
    await this.logger.log(LogLevel.INFO, "Selected travel end date");
  }

  // step 7 Click to change the country I live in
  async changeCountryILiveIn(): Promise<void> {
    const homeCountryChange = this.pageObject.getLocator("homeCountryChange");
    const homeCountryDropdown = this.pageObject.getLocator(
      "homeCountryDropdown"
    );
    const selectHomeCountry = this.pageObject.getLocator("selectHomeCountry");
    await this.browserUtils.safeClick(homeCountryChange);
    await this.browserUtils.waitForElement(homeCountryDropdown, 2000);
    await this.browserUtils.safeClick(homeCountryDropdown);
    await this.browserUtils.waitForElement(selectHomeCountry, 2000);
    await this.browserUtils.clickElement(selectHomeCountry);
    await this.logger.log(LogLevel.INFO, "Changed country I live in");
    await this.browserUtils.waitForDefaultDelay();
  }
  //Step 8 Asserting selected home country is US
  async assertHomeCountry(): Promise<void> {
    expect(this.pageObject.getLocator("selectHomeCountry")).toContainText(
      "United States"
    );
  }

  // Step 9 Click to change the vehicle I want to rent
  async changeVehicleIWantToRent(): Promise<void> {
    const vehicleChange = this.pageObject.getLocator("vehicleChange");
    const vehicleDropdown = this.pageObject.getLocator("vehicleDropdown");
    const selectVehicle = this.pageObject.getLocator("selectVehicle");
    await this.browserUtils.safeClick(vehicleChange);
    await this.browserUtils.waitForElement(vehicleDropdown, 2000);
    await this.browserUtils.clickElement(vehicleDropdown);
    await this.browserUtils.waitForElement(selectVehicle, 2000);
    await this.browserUtils.clickElement(selectVehicle);
    expect(this.pageObject.getLocator("vehicleDropdown")).toContainText("Car");
    await this.logger.log(LogLevel.INFO, "Changed vehicle I want to rent");
    await this.browserUtils.waitForDefaultDelay();
  }
  // Step 10: Click Get Quote button
  async clickGetYourQuoteButton(): Promise<void> {
    const quoteButton = this.pageObject.getLocator("getQuoteButton");
    await this.browserUtils.safeClick(quoteButton);
    await this.logger.log(LogLevel.INFO, "Clicked Get Quote button");
  }

  // Step 11: Wait for state selection modal
  async statePopup(): Promise<void> {
    const stateHeader = this.pageObject.getLocator("selectState");
    await this.browserUtils.waitForElement(stateHeader);
    await this.logger.log(LogLevel.INFO, "State selection modal appeared");
  }

  // Step 12: Select state
  async selectState(): Promise<void> {
    const stateSearchInput = this.pageObject.getLocator("stateSearchInput");
    const stateSelection = this.pageObject.getLocator("stateSelection");
    await this.browserUtils.clickElement(stateSearchInput);
    await this.browserUtils.waitForElement(stateSearchInput);
    await this.browserUtils.clickElement(stateSelection);

    await this.logger.log(LogLevel.INFO, "State selected");
  }
  // Step 13 Asserting selected state is California
  async assertState(): Promise<void> {
    expect(this.pageObject.getLocator("stateSearchInput")).toContainText(
      "California"
    );
  }

  // Step 14: Submit quote
  async clickFinalQuoteButton(): Promise<void> {
    const finalQuoteButton = this.pageObject.getLocator("finalQuoteButton");
    await this.browserUtils.safeClick(finalQuoteButton);
    this.logger.log(LogLevel.INFO, "Clicked Final Quote button");
  }

  // Step 15: Assert final confirmation page
  async finalPageAssertion(): Promise<void> {
    const finalPage = this.pageObject.getLocator("finalPage");
    await this.browserUtils.waitForElement(finalPage, 30000);
    const confirmationVisible = await this.browserUtils.elementExists(
      finalPage
    );
    expect(confirmationVisible).toBeTruthy();

    const confirmationText = await this.browserUtils.getText(finalPage);
    await this.logger.log(
      LogLevel.INFO,
      `Confirmation text: ${confirmationText}`
    );
    expect(confirmationText).toContain("Your protection");
    this.logger.log(
      LogLevel.INFO,
      "RentalCover quote flow test completed successfully"
    );
  }
}
