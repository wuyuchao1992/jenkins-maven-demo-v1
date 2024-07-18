Feature: Update object with multiple fields

  Scenario: Printing key-value pairs
    Given I have the following key-value pairs:
      | key                      | value                     |
      | user.name                | Jane Doe                  |
      | user.address.city        | Los Angeles               |
      | user.posts[0].title      | Welcome to the blog       |



      Given('I have the following key-value pairs:', function (this: any, dataTable: DataTable) {
  const fieldsToUpdate: Record<string, string> = {};

  const rawTable = dataTable.raw().slice(1);

  rawTable.forEach(([key, value]) => {
    fieldsToUpdate[key] = value;
  });

  console.log('Fields to Update:', fieldsToUpdate);
});
