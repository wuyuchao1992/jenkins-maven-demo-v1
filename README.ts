import { After, Status } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { attach } from '@cucumber/cucumber';  // 用于将附件添加到 Cucumber 报告中

let page: Page;  // 假设有全局的 page 对象

After(async function (this: { page: Page }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = `reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`;
        
        // 捕获页面截图
        await this.page.screenshot({ path: screenshotPath });

        // 将截图添加到 Cucumber 报告中
        const screenshot = await this.page.screenshot();
        await attach(screenshot, 'image/png');
    }
});