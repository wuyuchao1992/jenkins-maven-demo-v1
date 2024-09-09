import { DataTable } from '@cucumber/cucumber';

/**
 * Converts a multi-row DataTable to a list of key-value objects.
 * @param dataTable - The Cucumber DataTable object
 * @returns A list of objects representing each row of key-value pairs
 */
function dataTableToKeyValueList(dataTable: DataTable): Record<string, string>[] {
  // Converts the DataTable to an array of objects
  return dataTable.hashes();
}

// Example usage with a sample DataTable
const sampleDataTable = new DataTable([
  ['Key', 'Value'],
  ['Name', 'Alice'],
  ['Age', '30'],
  ['Name', 'Bob'],
  ['Age', '25'],
]);

const list = dataTableToKeyValueList(sampleDataTable);

// Iterating over the list using a for loop
for (const item of list) {
  console.log(`Key: ${item.Key}, Value: ${item.Value}`);
  // Perform actions based on each key-value pair
}

// Alternative iteration using a traditional for loop with index
for (let i = 0; i < list.length; i++) {
  const item = list[i];
  console.log(`Key: ${item.Key}, Value: ${item.Value}`);
}