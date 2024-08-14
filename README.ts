import { Before, After } from '@cucumber/cucumber';
import { Page, Locator } from 'playwright';
import fs from 'fs';
import path from 'path';

let lastFoundLocator: Locator | null = null;

Before(async function (this: { page: Page }) {
    // 包装原始的 locator 方法
    const originalLocator = this.page.locator.bind(this.page);

    this.page.locator = (selector: string, ...args: any[]) => {
        const locator = originalLocator(selector, ...args);
        // 保存最后一个查找的 Locator 对象
        lastFoundLocator = locator;
        return locator;
    };
});

After(async function (this: { page: Page, attach: Function }, scenario) {
    if (scenario.result?.status === 'FAILED' && lastFoundLocator) {
        const screenshotPath = path.resolve(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`);
        
        // 捕获并保存截图，并隐藏最后查找的元素
        await this.page.screenshot({
            path: screenshotPath,
            mask: [lastFoundLocator],  // 遮蔽最后查找的元素
            maskColor: '#000000' // 遮蔽区域的颜色 (黑色)
        });

        // 读取截图文件并转换为 Buffer
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        
        // 将 Buffer 附加到报告中，指定 MIME 类型为 'image/png'
        this.attach(screenshotBuffer, 'image/png');
    }
});
