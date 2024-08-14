import { Before, After } from '@cucumber/cucumber';
import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';

let lastFoundSelector: string | null = null;

Before(async function (this: { page: Page }) {
    // 包装原始的 locator 方法
    const originalLocator = this.page.locator.bind(this.page);

    this.page.locator = (selector: string, ...args: any[]) => {
        // 保存最后一个查找的选择器字符串
        lastFoundSelector = selector;
        return originalLocator(selector, ...args);
    };
});

After(async function (this: { page: Page, attach: Function }, scenario) {
    if (scenario.result?.status === 'FAILED' && lastFoundSelector) {
        const screenshotPath = path.resolve(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`);
        
        // 捕获并保存截图，并隐藏最后查找的元素
        await this.page.screenshot({
            path: screenshotPath,
            mask: [{ selector: lastFoundSelector }],  // 遮蔽最后查找的元素
            maskColor: '#000000' // 遮蔽区域的颜色 (黑色)
        });

        // 读取截图文件并转换为 Buffer
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        
        // 将 Buffer 附加到报告中，指定 MIME 类型为 'image/png'
        this.attach(screenshotBuffer, 'image/png');
    }
});
