import { DataTable } from '@cucumber/cucumber';

/**
 * Converts a single-row DataTable to an object.
 * @param dataTable - The Cucumber DataTable object
 * @returns An object with key-value pairs
 */
function dataTableToObject(dataTable: DataTable): Record<string, string> {
  return dataTable.rowsHash();
}

// Example usage
const sampleDataTable = new DataTable([
  ['Name', 'Alice'],
  ['Age', '30'],
]);

const obj = dataTableToObject(sampleDataTable);
console.log(obj); // Output: { Name: 'Alice', Age: '30' }