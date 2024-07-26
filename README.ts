import { test, expect } from '@playwright/test';

test('should submit form successfully', async ({ page }) => {
  await page.goto('https://example.com'); // Replace with your actual URL

  const maxRetries = 10;
  const retryInterval = 2000; // 2 seconds
  let attempt = 0;
  let submissionSuccess = false;

  while (attempt < maxRetries && !submissionSuccess) {
    attempt++;

    const [response] = await Promise.all([
      // Wait for the network request to finish
      page.waitForResponse(response => response.url().includes('/your-submit-endpoint') && response.status() !== 429, { timeout: retryInterval * (maxRetries - attempt) }), // Adjust the endpoint accordingly

      // Click the submit button
      page.click('#submit-button') // Replace with your actual submit button selector
    ]);

    if (response.status() !== 429) {
      console.log(`Attempt ${attempt}: Submission successful`);
      submissionSuccess = true;
    } else {
      console.log(`Attempt ${attempt}: Received status code 429, retrying...`);
      // Wait for the retry interval before the next attempt
      await new Promise(resolve => setTimeout(resolve, retryInterval));
    }
  }

  if (!submissionSuccess) {
    throw new Error('Failed to submit form after 10 attempts');
  }

  expect(submissionSuccess).toBe(true);
});
