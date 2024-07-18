Given('I have the following key-value pairs:', function (dataTable) {
  const fieldsToPrint: Record<string, any> = {};
  dataTable.rawTable.slice(1).forEach(([key, value]: KeyValuePairs[]) => {
    fieldsToPrint[key] = value;
  });
  console.log('Key-Value Pairs:');
