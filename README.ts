When('I intercept API requests to {string}', async function (apiEndpoint: string) {
  await this.page.route(apiEndpoint, async (route, request) => {
    const response = await this.page.request.fetch(request);
    const jsonResponse = await response.json();
    this.responses.push(jsonResponse);
    await route.fulfill({ response });
  });
});
