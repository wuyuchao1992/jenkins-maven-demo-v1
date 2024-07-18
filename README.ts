import { Given } from '@cucumber/cucumber';
import { DataTable } from '@cucumber/cucumber';

Given('I have the following key-value pairs:', function (this: any, dataTable: DataTable) {
  const fieldsToUpdate: Record<string, any> = {};

  // Ensure TypeScript knows the structure of rawTable
  const rawTable = dataTable.raw().slice(1);

  rawTable.forEach(([key, value]) => {
    // Parse the value as JSON
    fieldsToUpdate[key] = JSON.parse(value);
  });

  console.log('Fields to Update:', fieldsToUpdate);
});
