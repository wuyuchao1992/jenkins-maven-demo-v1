import { Given } from '@cucumber/cucumber';

Given('I have the following key-value pairs:', function (dataTable) {
  const fieldsToPrint: Record<string, any> = {};
  dataTable.rawTable.slice(1).forEach(([key, value]) => {
    fieldsToPrint[key] = value;
  });
  console.log('Key-Value Pairs:');
  for (const [key, value] of Object.entries(fieldsToPrint)) {
    console.log(`Key: ${key}, Value: ${value}`);
  }
});
