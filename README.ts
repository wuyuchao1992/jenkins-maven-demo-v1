Given('I have the following key-value pairs:', function (dataTable) {
  const fieldsToUpdate: Record<string, string> = {};

  // Ensure TypeScript knows the structure of rawTable
  const rawTable: [string, string][] = dataTable.rawTable.slice(1);

  rawTable.forEach(([key, value]) => {
    fieldsToUpdate[key] = value;
  });

  console.log('Fields to Update:', fieldsToUpdate);
});
