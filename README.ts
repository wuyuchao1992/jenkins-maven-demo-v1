Given('I have the following key-value pairs:', function (dataTable) {
  fieldsToUpdate = {};
  dataTable.rawTable.slice(1).forEach(([key, value]: KeyValuePairs[]) => {
    fieldsToUpdate[key] = value;
  });
});
