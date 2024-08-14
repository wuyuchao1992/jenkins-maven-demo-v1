import { After, Status } from '@cucumber/cucumber';
import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';

After(async function (this: { page: Page }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = path.resolve(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`);
        
        // 捕获并保存截图
        await this.page.screenshot({ path: screenshotPath });
        
        // 将截图转换为 Base64
        const screenshotData = fs.readFileSync(screenshotPath);
        const base64Screenshot = screenshotData.toString('base64');
        
        // 手动嵌入到自定义报告中（假设你有某种自定义报告系统）
        const html = `
            <html>
            <body>
                <h1>Scenario Failed: ${scenario.pickle.name}</h1>
                <img src="data:image/png;base64,${base64Screenshot}" alt="Screenshot" />
            </body>
            </html>
        `;
        
        // 将 HTML 保存到报告目录
        fs.writeFileSync(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.html`, html);
    }
});