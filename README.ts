When('I intercept API requests to {string}', async function (apiEndpoint: string) {
  await this.page.route(apiEndpoint, async (route, request) => {
    const response = await this.page.request.fetch(request);
    const jsonResponse = await response.json();
    this.responses.push(jsonResponse);
    await route.fulfill({ response });
  });
});

class CustomWorld extends World {
  browser: Browser;
  page: Page;
  responses: any[];

  constructor(options) {
    super(options);
    this.responses = [];
  }

  async openBrowser() {
    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);



import axios from 'axios';
import axiosRetry from 'axios-retry';

// Configure axios-retry
axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
        // Use exponential backoff for retries
        return Math.pow(2, retryCount) * 1000;
    },
    retryCondition: (error) => {
        // Retry on 429 status or network error
        return axiosRetry.isNetworkError(error) || error.response?.status === 429;
    }
});

// Function to check file upload status from an API
async function checkFileUploadStatus(fileId: string): Promise<string> {
    try {
        const response = await axios.post(
            'https://api.example.com/files/status', // The endpoint to check the upload status
            { fileId: fileId }, // Request payload containing fileId
            {
                timeout: 20000, // 20 seconds timeout
                headers: {
                    'Authorization': 'Bearer your-token-here',
                    'Content-Type': 'application/json'
                }
            }
        );

        // Assuming success is indicated by status code 200 and a specific status in response data
        if (response.status === 200) {
            const status = response.data.status; // Assuming `status` is the field indicating upload result
            if (status === 'complete') {
                return status;
            } else {
                console.log(`File upload status is ${status}.`);
            }
        } else if (response.status === 429) {
            console.log(`Received status code 429. Retrying based on axios-retry configuration.`);
        } else {
            console.log(`Received status code ${response.status}`);
        }
    } catch (error) {
        console.error(`Error checking file upload status: ${error.message}`);
        throw error;
    }

    throw new Error(`Failed to retrieve file upload status.`);
}

// Function to verify file upload status with retries
async function verifyFileUploadStatus(fileId: string, expectedStatus: string, maxAttempts: number, interval: number) {
    let attempts = 0;

    while (attempts < maxAttempts) {
        attempts++;
        try {
            const fileStatus = await checkFileUploadStatus(fileId);
            console.log(`Attempt ${attempts}: File upload status is ${fileStatus}`);

            if (fileStatus === expectedStatus) {
                console.log(`File upload status is ${expectedStatus}!`);
                return;
            }
        } catch (error) {
            console.error(`Attempt ${attempts}: ${error.message}`);
        }

        // Wait for the specified interval before the next attempt
        await new Promise((resolve) => setTimeout(resolve, interval));
    }

    // Perform the assertion after the maximum attempts have been reached
    throw new Error(`File upload status did not become ${expectedStatus} within the allowed attempts.`);
}

// Example usage in Cucumber steps
import { Given, When, Then } from '@cucumber/cucumber';

let fileId: string;
let expectedStatus: string;

Given('a file with id {string}', function (id: string) {
    fileId = id;
});

Given('I expect the file upload status to be {string}', function (status: string) {
    expectedStatus = status;
});

When('I check the file upload status', async function () {
    await verifyFileUploadStatus(fileId, expectedStatus, 5, 5000);
});

Then('the file upload status should be as expected', function () {
    // The assertion is already handled in verifyFileUploadStatus
    console.log("Verification in verifyFileUploadStatus has already been performed.");
});

