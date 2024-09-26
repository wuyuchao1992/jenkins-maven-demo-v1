import { Page } from '@playwright/test';

export class TablePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 根据表头 ID 直接找到列索引
  async getColumnIndexByHeaderId(headerId: string): Promise<number> {
    const headerLocator = this.page.locator(`#${headerId}`);
    const columnIndex = await headerLocator.evaluate((el) => Array.from(el.parentNode!.children).indexOf(el));
    return columnIndex;
  }

  // 根据列索引和行索引找到 tooltip
  async printTooltipInRowByHeaderId(headerId: string, rowIndex: number) {
    // 获取列索引
    const columnIndex = await this.getColumnIndexByHeaderId(headerId);

    // 根据行索引和列索引定位单元格
    const cellLocator = this.page.locator(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`);

    // 假设 tooltip 位于单元格内的某个 div > span
    const tooltipLocator = cellLocator.locator('div > span');
    
    // 获取并打印 tooltip 文本内容
    const tooltipText = await tooltipLocator.textContent();
    console.log(`Tooltip in row ${rowIndex + 1}, column with ID "${headerId}":`, tooltipText);
  }
}