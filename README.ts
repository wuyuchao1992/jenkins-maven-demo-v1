import { test, expect } from '@playwright/test';

test('should submit form successfully', async ({ page }) => {
  await page.goto('https://example.com'); // Replace with your actual URL

  const maxRetries = 10;
  const retryInterval = 2000; // 2 seconds
  let attempt = 0;
  let submissionSuccess = false;

  while (attempt < maxRetries && !submissionSuccess) {
    attempt++;
    console.log(`Attempt ${attempt}: Clicking submit button`);

    // Click the submit button
    await page.click('#submit-button'); // Replace with your actual submit button selector

    // Wait for the response (adjust the selector to match the element showing the success message)
    try {
      await page.waitForSelector('#success-message', { timeout: 5000 }); // Adjust the selector and timeout as necessary
      console.log(`Attempt ${attempt}: Submission successful`);
      submissionSuccess = true;
    } catch (error) {
      console.log(`Attempt ${attempt}: Submission failed, retrying...`);
      // Wait for the retry interval before the next attempt
      await new Promise(resolve => setTimeout(resolve, retryInterval));
    }
  }

  if (!submissionSuccess) {
    throw new Error('Failed to submit form after 10 attempts');
  }

  expect(submissionSuccess).toBe(true);
});
