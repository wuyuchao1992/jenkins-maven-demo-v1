import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { set } from 'lodash';

function setMultipleFields(obj: any, fields: { [key: string]: any }) {
  Object.keys(fields).forEach(key => {
    set(obj, key, fields[key]);
  });
}

// 示例对象
let obj: any = {
  user: {
    name: 'John Doe',
    address: {
      city: 'New York',
      zip: '10001'
    },
    posts: [
      { id: 1, title: 'Hello World' },
      { id: 2, title: 'Lodash is awesome' }
    ]
  }
};

let fieldsToUpdate: { [key: string]: any } = {};

Given('I have the following key-value pairs:', (dataTable) => {
  fieldsToUpdate = dataTable.rawTable.slice(1).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
});

When('I update the object with these fields', () => {
  setMultipleFields(obj, fieldsToUpdate);
});

Then('I should see the updated object', () => {
  const expectedObj = {
    user: {
      name: 'Jane Doe',
      address: {
        city: 'Los Angeles',
        zip: '10001'
      },
      posts: [
        { id: 1, title: 'Welcome to the blog' },
        { id: 2, title: 'Lodash is awesome' }
      ]
    }
  };
  expect(obj).toEqual(expectedObj);
});
