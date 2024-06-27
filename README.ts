import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { expect } from '@playwright/test';

Given('I store {string} with value {string}', function (this: CustomWorld, key: string, value: string) {
  this.dataCenter.set(key, value);
});

When('I retrieve the value for {string}', function (this: CustomWorld, key: string) {
  const value = this.dataCenter.get(key);
  this.dataCenter.set('retrievedValue', value);
});

Then('the value should be {string}', function (this: CustomWorld, expectedValue: string) {
  const actualValue = this.dataCenter.get('retrievedValue');
  expect(actualValue).toBe(expectedValue);
});
