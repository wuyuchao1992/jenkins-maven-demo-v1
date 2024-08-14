import { After, Status } from '@cucumber/cucumber';
import { Page } from 'playwright';

After(async function (this: { page: Page }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ path: `reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`, fullPage: true });
        this.attach(screenshot, 'image/png');
    }
});