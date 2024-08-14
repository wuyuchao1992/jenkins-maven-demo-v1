import { Before, After, Status } from '@cucumber/cucumber';
import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';

Before(async function (this: { page: Page }) {
    // 在每个测试之前，注入 JavaScript 来监听点击事件并保存最后一个点击的元素
    await this.page.addInitScript(() => {
        (window as any).lastClickedElement = null;
        document.addEventListener('click', (event) => {
            (window as any).lastClickedElement = event.target as HTMLElement;
        }, true);
    });
});

After(async function (this: { page: Page, attach: Function }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        // 高亮最后一个点击的元素
        await this.page.evaluate(() => {
            const lastClickedElement = (window as any).lastClickedElement;
            if (lastClickedElement) {
                lastClickedElement.style.border = '2px solid red';
                lastClickedElement.style.boxShadow = '0 0 10px red';
            }
        });

        const screenshotPath = path.resolve(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`);
        
        // 捕获并保存高亮后的截图
        await this.page.screenshot({ path: screenshotPath });
        
        // 读取截图文件并转换为 Buffer
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        
        // 将 Buffer 附加到报告中，指定 MIME 类型为 'image/png'
        this.attach(screenshotBuffer, 'image/png');
    }
});