import { Before, After, Given, When, Then } from '@cucumber/cucumber';
import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';

let lastFoundSelector: string | null = null;

Before(async function (this: { page: Page }) {
    // 在 Before 钩子中初始化 lastFoundSelector
    lastFoundSelector = null;
});

When(/^I find element with selector "(.*)"$/, async function (this: { page: Page }, selector: string) {
    // 记录最后一个查找的元素选择器
    lastFoundSelector = selector;
    await this.page.locator(selector).waitFor(); // 确保元素存在
});

After(async function (this: { page: Page, attach: Function }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        if (lastFoundSelector) {
            const screenshotPath = path.resolve(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`);
            
            // 捕获并保存截图，并隐藏最后查找的元素
            await this.page.screenshot({
                path: screenshotPath,
                mask: [lastFoundSelector],  // 遮蔽最后查找的元素
                maskColor: '#000000' // 遮蔽区域的颜色 (黑色)
            });

            // 读取截图文件并转换为 Buffer
            const screenshotBuffer = fs.readFileSync(screenshotPath);
            
            // 将 Buffer 附加到报告中，指定 MIME 类型为 'image/png'
            this.attach(screenshotBuffer, 'image/png');
        }
    }
});