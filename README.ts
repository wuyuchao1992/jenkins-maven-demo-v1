import { After, Status } from '@cucumber/cucumber';
import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';

After(async function (this: { page: Page, attach: Function }, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        // 在点击事件中捕获最后一个被点击的元素
        const lastClickedSelector = await this.page.evaluate(() => {
            const lastClicked = (window as any).lastClickedElement;
            if (lastClicked) {
                // 提取 CSS 选择器
                const path = [];
                while (lastClicked) {
                    let selector = lastClicked.tagName.toLowerCase();
                    if (lastClicked.id) {
                        selector += `#${lastClicked.id}`;
                        path.unshift(selector);
                        break;
                    } else {
                        const sibling = lastClicked.previousElementSibling;
                        if (sibling) {
                            let nth = 1;
                            while (sibling) {
                                if (sibling.tagName === lastClicked.tagName) nth++;
                                sibling = sibling.previousElementSibling;
                            }
                            selector += `:nth-of-type(${nth})`;
                        }
                        path.unshift(selector);
                        lastClicked = lastClicked.parentElement;
                    }
                }
                return path.join(' > ');
            }
            return null;
        });

        if (lastClickedSelector) {
            const screenshotPath = path.resolve(`reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`);
            
            // 捕获并保存截图，并隐藏当前操作的元素
            await this.page.screenshot({
                path: screenshotPath,
                mask: [lastClickedSelector],  // 动态遮蔽最后点击的元素
                maskColor: '#000000' // 遮蔽区域的颜色 (黑色)
            });

            // 读取截图文件并转换为 Buffer
            const screenshotBuffer = fs.readFileSync(screenshotPath);
            
            // 将 Buffer 附加到报告中，指定 MIME 类型为 'image/png'
            this.attach(screenshotBuffer, 'image/png');
        }
    }
});