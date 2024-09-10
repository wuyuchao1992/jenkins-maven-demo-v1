import { Given } from '@cucumber/cucumber';
import { Page } from 'playwright'; // Ensure Page is imported from Playwright

// Assume the Page object is initialized correctly and rowsCount is the number of rows
let page: Page;
const rowsCount = 5; // Example: the number of rows you'll provide

/**
 * Extract table data from DrawerContent and return it in a hashes format
 * @param page - Playwright Page object
 * @param rowsCount - Number of rows to extract
 * @returns Promise<object[]> - Returns the data in an array of objects
 */
async function extractTableData(page: Page, rowsCount: number): Promise<object[]> {
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

  return tableData; // Return the extracted table data
}

Given('I extract table data from DrawerContent and convert to DataTable', async function () {
  try {
    // Call the extractTableData function and retrieve the data
    const tableData = await extractTableData(page, rowsCount);

    // Use or log the extracted data
    console.log('Extracted Table Data:', tableData);

    // If needed, further process or use the extracted data
    // Example of using the data directly
    tableData.forEach((row) => {
      console.log(`Row: ${JSON.stringify(row)}`);
    });

    // Optionally, return tableData if further use is required
    return tableData;
  } catch (error) {
    console.error('Error extracting table data:', error);
  }
});