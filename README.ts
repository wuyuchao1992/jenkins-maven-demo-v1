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


const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

