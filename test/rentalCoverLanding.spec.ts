import { test, expect } from "@playwright/test";
import { BrowserUtils } from "../src/utils/BrowserUtils";
import { Logger, LogLevel } from "../src/utils/Logger";
import { RentalCoverActions } from "../src/actions/RentalCoverActions";
import { RentalCoverLandingPage } from "../src/pages/rentalCoverLandingPage";
import { url } from "../constants/constant";
import { assert } from "console";

test.describe("RentalCover Quote Flow", () => {
  let browserUtils: BrowserUtils;
  let logger: Logger;
  let actions: RentalCoverActions;
  let landingPage: RentalCoverLandingPage;

  test.beforeEach(async ({ page }) => {
    logger = Logger.getInstance();
    browserUtils = new BrowserUtils(page);
    actions = new RentalCoverActions(page);
    landingPage = new RentalCoverLandingPage(page);

    logger.log(LogLevel.INFO, `Navigating to: ${url}`);
    await page.goto(url);
  });

  test("should complete quote flow and verify confirmation @JIRA_ticket", async () => {
    logger.log(LogLevel.INFO, "Starting RentalCover quote flow test");

    try {
      // Step 1: Select travel country
      await actions.selectCountry();
      
      // Step 2: Select travel dates
      await actions.clickDatePicker();
      await actions.selectTravelStartDate();
      await actions.clickEndDatePicker();
      await actions.selectTravelEndDate();

      // Step 3: Select home country
      await actions.changeCountryILiveIn();
      await actions.assertHomeCountry();

      // Step 4: Select vehicle type
      await actions.changeVehicleIWantToRent();
      // Step 5: Click Get Quote button
      await actions.clickGetYourQuoteButton();

      // Step 6: Wait for state selection modal
      await actions.statePopup();

      // Step 7: Select state
      await actions.selectState();
      await actions.assertState;
      // Step 8: Submit quote
      await actions.clickFinalQuoteButton();

      // Step 9: Verify confirmation page
      await actions.finalPageAssertion();

      logger.log(
        LogLevel.INFO,
        "RentalCover quote flow test completed successfully"
      );
    } catch (error) {
      logger.log(LogLevel.ERROR, `Test failed: ${error}`);
      throw error;
    }
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
