import { Page } from 'playwright';
import { DataTable } from '@cucumber/cucumber';

/**
 * Extract table data from DrawerContent and convert to Cucumber DataTable hashes format
 * @param page - Playwright Page object
 * @param rowsCount - Number of rows to extract, provided by you
 * @returns Promise<object[]> - Returns the data in DataTable .hashes() format
 */
async function extractTableDataToHashes(page: Page, rowsCount: number): Promise<object[]> {
  const tableData: object[] = []; // Array to store extracted data

  // Loop through each row based on the provided row count
  for (let i = 0; i < rowsCount; i++) {
    // Extract values from each column
    const name = await page
      .getByTestId('DrawerContent')
      .getByTestId(`row_${i}`)
      .getByRole('cell')
      .nth(0)
      .textContent();
    const type = await page
      .getByTestId('DrawerContent')
      .getByTestId(`row_${i}`)
      .getByRole('cell')
      .nth(1)
      .textContent();
    const validationType = await page
      .getByTestId('DrawerContent')
      .getByTestId(`row_${i}`)
      .getByRole('cell')
      .nth(2)
      .textContent();
    const validationValue = await page
      .getByTestId('DrawerContent')
      .getByTestId(`row_${i}`)
      .getByRole('cell')
      .nth(3)
      .textContent();

    // Build an object for each row and push it to the tableData array
    tableData.push({
      name: name?.trim() || '', // Trim whitespace and handle empty values
      type: type?.trim() || '',
      validationType: validationType?.trim() || '',
      validationValue: validationValue?.trim() || '',
    });
  }

  return import { Given } from '@cucumber/cucumber';
import { Page } from 'playwright'; // Ensure you import Page from Playwright
import { extractTableDataToHashes } from './your-extraction-file'; // Import the extraction function

// Assume the Page object is initialized correctly and rowsCount is the number of rows
let page: Page;
const rowsCount = 5; // Example: the number of rows you'll provide

Given('I extract table data from DrawerContent and convert to DataTable', async function () {
  try {
    // Extract table data and convert to hashes format
    const tableHashes = await extractTableDataToHashes(page, rowsCount);

    // Use or log the extracted data
    console.log(tableHashes);

    // If needed, convert to DataTable object for further use
    const dataTable = new DataTable({
      rows: tableHashes.map(row => Object.values(row)), // Convert object array to 2D array
    });

    console.log(dataTable.hashes());
  } catch (error) {
    console.error('Error extracting table data:', error);
  }
});




