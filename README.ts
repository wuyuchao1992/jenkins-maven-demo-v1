import { After, Status } from '@cucumber/cucumber';
import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';

After(async function (this: { page: Page, attach: Function }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        // 高亮或遮蔽元素
        await this.page.evaluate(() => {
            const elementToHide = document.querySelector('#element-selector'); // 使用选择器找到元素
            if (elementToHide) {
                elementToHide.style.visibility = 'hidden'; // 或者使用 `display: none`
            }
        });

        const screenshotPath = path.resolve(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`);
        
        // 捕获并保存截图
        await this.page.screenshot({ path: screenshotPath });

        // 读取截图文件并转换为 Buffer
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        
        // 将 Buffer 附加到报告中，指定 MIME 类型为 'image/png'
        this.attach(screenshotBuffer, 'image/png');
    }
});