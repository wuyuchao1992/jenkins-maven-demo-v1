After(async function (this: { page: Page }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = `reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`;
        await this.page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved at: ${screenshotPath}`);
    }
});
