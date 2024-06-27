### Collecting Steps in a Common Utility File and Calling Them in Step Definitions

To organize your step definitions better, you can collect common functionalities in a separate utility file and then call these functions from your step definition files. This approach promotes reusability and clean code structure.

#### Step-by-Step Implementation

1. **Create a Utility File**
   - Create a `src/utils/playwrightUtils.ts` file where you define all common functions.

     ```typescript
     import { chromium, Browser, Page } from 'playwright';

     let browser: Browser;
     let page: Page;

     export const launchBrowser = async () => {
       browser = await chromium.launch();
       page = await browser.newPage();
       return page;
     };

     export const closeBrowser = async () => {
       await browser.close();
     };

     export const goToPage = async (url: string) => {
       await page.goto(url);
     };

     export const checkTitle = async (expectedTitle: string) => {
       const title = await page.title();
       if (title !== expectedTitle) {
         throw new Error(`Expected title to be ${expectedTitle} but got ${title}`);
       }
     };

     // Add more common functions as needed
     ```

2. **Import and Use Utility Functions in Step Definitions**
   - In your step definition file (`src/steps/sample.steps.ts`), import and use the utility functions.

     ```typescript
     import { Given, Then } from '@cucumber/cucumber';
     import { launchBrowser, closeBrowser, goToPage, checkTitle } from '../utils/playwrightUtils';

     Given('I open the Playwright website', async () => {
       await launchBrowser();
       await goToPage('https://playwright.dev/');
     });

     Then('the title should be {string}', async (expectedTitle: string) => {
       await checkTitle(expectedTitle);
       await closeBrowser();
     });
     ```

3. **Utility Functions Usage Example**

   If you have more common steps, you can keep adding them to the `playwrightUtils.ts` file and use them across different step definition files as needed. For instance:

   ```typescript
   // In playwrightUtils.ts
   export const clickElement = async (selector: string) => {
     await page.click(selector);
   };

   export const fillInput = async (selector: string, text: string) => {
     await page.fill(selector, text);
   };

   // In another step definition file
   import { Given, Then, When } from '@cucumber/cucumber';
   import { launchBrowser, closeBrowser, goToPage, clickElement, fillInput } from '../utils/playwrightUtils';

   Given('I open the Playwright website', async () => {
     await launchBrowser();
     await goToPage('https://playwright.dev/');
   });

   When('I click on the {string} button', async (buttonText: string) => {
     await clickElement(`text=${buttonText}`);
   });

   When('I fill the {string} input with {string}', async (inputName: string, text: string) => {
     await fillInput(`input[name="${inputName}"]`, text);
   });

   Then('the title should be {string}', async (expectedTitle: string) => {
     await checkTitle(expectedTitle);
     await closeBrowser();
   });
   ```

#### Benefits of This Approach

1. **Code Reusability**: Common functions are defined once and reused across multiple step definition files.
2. **Clean Structure**: Separation of concerns makes the codebase more maintainable.
3. **Readability**: Step definition files remain concise and focused on the test logic rather than the implementation details.

By following this pattern, you can keep your codebase organized and scalable as your test suite grows.
