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

async function postRequestWithRetry(url, data, maxRetries = 5) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await axios.post(url, data);
            if (response.status === 202) {
                return response.data;
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.log(`Attempt ${attempt} failed with status 429. Retrying...`);
                if (attempt === maxRetries) {
                    throw new Error('Max retries reached. Request failed with status 429.');
                }
            } else {
                throw error;  // Throw if it's not a 429 error
            }
        }
    }
}
