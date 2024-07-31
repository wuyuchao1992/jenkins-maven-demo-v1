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

async function checkFileStatus(fileId: string, fileData: FormData): Promise<string> {
    const maxRetries = 5;
    const retryInterval = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.post(`https://api.example.com/files/${fileId}`, fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 202) {
                return response.data.data; // Extracting the 'data' field from the response
            } else {
                console.log(`Attempt ${attempt}: Received status code ${response.status}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Handle rate limiting
                const retryAfter = error.response.headers['retry-after'];
                const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : retryInterval;
                console.log(`Attempt ${attempt}: Rate limited. Waiting for ${waitTime} ms before retrying.`);
                await new Promise((resolve) => setTimeout(resolve, waitTime));
            } else {
                console.error(`Attempt ${attempt}: Error checking file status: ${error.message}`);
            }
        }

        if (attempt < maxRetries) {
            // Wait for the retry interval before the next attempt
            await new Promise((resolve) => setTimeout(resolve, retryInterval));
        } else {
            throw new Error(`Failed to retrieve file status after ${maxRetries} attempts.`);
        }
    }
}


