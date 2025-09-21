export const RentalCoverLocators = {
  startDate: {
    type: 'xpath',
    value: '//td[@role="button" and contains(@aria-label, "September 25, 2025")]',
  },
  endDate: {
    type: 'xpath',
    value: '//td[@role="button" and contains(@aria-label, "September 28, 2025")]',
  },
  startDateInput: {
    type: 'css',
    value: 'input[id="coverageDates-startDate"]',
  },
  endDateInput: {
    type: 'css',
    value: 'input[id="coverageDates-endDate"]',
  },
};
