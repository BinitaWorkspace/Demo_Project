# Playwright Test Automation Framework

This is a TypeScript-based test automation framework using Playwright. The framework follows a layered architecture pattern with separation between page objects (locators) and actions (interactions/assertions).

## Project Structure

```
DEMO_PROJECT/
├── constants/              # Static values and configuration
├── locators/               # Centralized locator definitions
│   └── locators.ts
├── src/
│   ├── actions/            # Action Layer (interactions & assertions)
│   │   └── RentalCoverActions.ts
│   ├── pages/              # Page Objects (locator access)
│   │   └── rentalCoverLandingPage.ts
│   └── utils/              # Utility Classes
│       ├── BrowserUtils.ts
│       └── Logger.ts
├── tests/                  # Test Specs
│   └── rentalCoverLanding.spec.ts 
├── test-results/       #Please create this folder and sub folders before execution 
│      └──screenshot    # Screenshots, traces
│      └──rentalCoverLanding-RentalC-bf0dc-fy-confirmation-JIRA-ticket-Chrome 
├── .env
├── index.html
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── tsconfig.ts
├── setup.sh / setup.ps1
```

## Quick Start

### For Unix-based systems (Linux/MacOS):

```bash
# Clone the repository
git clone <repository-url>
cd Demo_Project
# Make the setup script executable and run it
chmod +x setup.sh
./setup.sh
```

### For Windows:

```powershell
# Clone the repository
git clone <repository-url>
cd Demo_Project

# Run the setup script
.\setup.ps1
```

## Architecture

### 1. Page Objects (`src/pages/`)
- Contains only element locators
- No action/interaction logic
- Provides methods to access locators
- Example:
```typescript
export class RentalCoverLandingPage extends BasePage {
    private readonly locators = {
        searchInput: '[data-test-id="search-input"]',
        searchButton: '[data-test-id="search-button"]'
    };

    getLocator(key: keyof typeof this.locators): string {
        return this.locators[key];
    }
}
```

### 2. Actions (`src/actions/`)
- Contains all page interactions
- Handles assertions and validations
- Manages complex workflows
- Includes logging
- Example:
```typescript
export class RentalCoverActions {
    async searchForRental(searchTerm: string): Promise<void> {
        await this.browserUtils.typeText(
            this.page.getLocator('searchInput'),
            searchTerm
        );
    }
}
```

### 3. Utilities (`src/utils/`)
- BrowserUtils: Common browser interactions
- TestDataManager: Test data handling
- Logger: Logging functionality

## Running Tests

```bash
# Run all tests
npm test

# Run tests in specific browsers
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run debug

# View test report
npm run report
```

## Framework Features

### Page Object Model
- Base page class with common functionality
- Page-specific classes inheriting from base page
- Organized selectors and actions

### Utilities
- Browser actions wrapper (BrowserUtils)
- Test data management (TestDataManager)
- Logging system (Logger)
- Screenshot capture

### Configuration
- Multi-browser support
- Configurable timeouts
- Screenshot and video capture on failure
- HTML reporting

## Writing Tests

Example test structure:

```typescript
import { test, expect } from '@playwright/test';
import { RentalCoverLandingPage } from '../src/pages/rentalCoverLandingPage';

test.describe('Feature Test Suite', () => {
    let page: RentalCoverLandingPage;

    test.beforeEach(async ({ page: pageFixture }) => {
        page = new RentalCoverLandingPage(pageFixture);
    });

    test('Sample test case', async () => {
        // Your test code here
    });
});
```

## Adding New Features

### 1. Adding New Page Objects
1. Create a new file in `src/pages/`
2. Extend the `BasePage` class
3. Define locators
4. Add getter methods

Example:
```typescript
export class NewPage extends BasePage {
    private readonly locators = {
        // Add locators
    };

    getLocator(key: keyof typeof this.locators): string {
        return this.locators[key];
    }
}
```

### 2. Adding New Actions
1. Create a new file in `src/actions/`
2. Create action methods for page interactions
3. Include assertions and validations
4. Add logging

Example:
```typescript
export class NewActions {
    constructor(page: Page) {
        this.page = new NewPage(page);
        this.browserUtils = new BrowserUtils(page);
    }

    async performAction(): Promise<void> {
        // Implement action
    }
}
```

## Best Practices

1. Keep Page Objects focused on locators only
2. Implement all interactions in Action classes
3. Use meaningful names for locators and methods
4. Include proper logging in actions
5. Add appropriate assertions in action methods
6. Follow TypeScript best practices
7. Maintain separation of concerns

## Contributing

1. Create a feature branch
2. Make your changes following the architecture pattern
   - Page Objects for locators
   - Actions for interactions
   - Utils for common functionality
3. Write/update tests
4. Submit a pull request

## Troubleshooting

1. **Tests fail to run:**
   - Check Node.js version
   - Verify all dependencies are installed
   - Run `npx playwright install` to ensure browsers are installed

2. **Type errors:**
   - Run `npm install` to ensure all TypeScript dependencies are installed
   - Check `tsconfig.json` configuration

3. **Element not found errors:**
   - Verify locators in page objects
   - Check if elements are in viewport
   - Ensure proper waiting mechanisms are used

# **Run tests**

**Prerequisites**
When Running the test through the playwright UI
please check the Chrome checkbox in the side panel within testing/playwright to avoid confusion.
in Settings under the playwright select the show browser for headed execution.
1. **To Run all test in Bash**
   run the command
   npx playwright test
2. **To Run specific test**
   npx playwright test tests/rentalCoverLanding.spec.ts
3. **To run in headed mode**
   npx playwright test --headed
4. **To Debug**
   npx playwright test --debug
5. **To show reports**
   npx playwright show-report

# Tests Fail to Run
- Ensure Node.js is installed

- Run npm install

- Run npx playwright install

# Bugs Found

1. Most Important thing is I have noticed a HYDRATION ERROR where the server rendered html does not match the client side react tree. Its seen in console as Uncaught Minified React error #423 or #418
what is the result of this error: 1. content flickers Happening
                                  2. Layout shifts
                                  3. COnsole Error
                                  4. Broken Interactivity

2. I have observed is sometime when the automation scripts run the country of residence changes to United States though it should be Australia. May be its a glitch because I tried to replicate it manually but could not replicate the bug. Now the cause may be the Hydration error.

