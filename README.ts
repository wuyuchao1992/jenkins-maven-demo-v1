import { Page, Locator, expect } from '@playwright/test';

class BreakdownValidator {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * 验证页面上是否存在指定的文本数组
     * @param breakdowns - 一个包含要验证的文本的数组
     */
    async validateBreakdowns(breakdowns: string[]): Promise<void> {
        for (const breakdown of breakdowns) {
            const locator = this.page.locator(`text=${breakdown}`);
            await expect(locator).toBeVisible(); // 期望页面上存在该文本
        }
    }

    /**
     * 从字符串解析出数组，并进行验证
     * @param breakdownsString - 逗号分隔的字符串
     */
    async validateBreakdownsFromString(breakdownsString: string): Promise<void> {
        const breakdowns = breakdownsString.split(',').map(item => item.trim());
        await this.validateBreakdowns(breakdowns);
    }
}