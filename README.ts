// 创建一个辅助函数来为元素添加高亮效果
function highlightElement(element: Element) {
    (element as HTMLElement).style.outline = '2px solid red';
    (element as HTMLElement).style.backgroundColor = 'rgba(255, 0, 0, 0.3)';

    setTimeout(() => {
        (element as HTMLElement).style.outline = '';
        (element as HTMLElement).style.backgroundColor = '';
    }, 2000); // 2秒后移除高亮
}

// 在 Page 上覆盖 locator 方法，添加高亮逻辑
function addHighlightingToLocator(page: Page) {
    const originalLocator = page.locator.bind(page);

    page.locator = (selector: string, ...args: any[]) => {
        const locator = originalLocator(selector, ...args);

        // 包装 evaluateHandle 来高亮元素
        locator.evaluateHandle((element) => {
            highlightElement(element);
        });

        return locator;
    };
}

// 在 Playwright 启动时全局应用
export async function globalSetup(browserContext: BrowserContext) {
    browserContext.on('page', page => {
        addHighlightingToLocator(page);
    });
}


// 在 beforeAll 或全局配置中应用
BeforeAll(async function () {
    await globalSetup(browserContext);
});

import { BeforeAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from 'playwright';

let browser: Browser;
let browserContext: BrowserContext;

BeforeAll(async function () {
    // 启动浏览器
    browser = await chromium.launch();

    // 创建一个新的浏览器上下文
    browserContext = await browser.newContext();

    // 应用高亮逻辑到所有页面
    browserContext.on('page', page => {
        addHighlightingToLocator(page);
    });
});

const { BeforeAll } = require('@cucumber/cucumber');
const { globalSetup } = require('./path/to/setup.js');

BeforeAll(async function () {
    await globalSetup();
});
