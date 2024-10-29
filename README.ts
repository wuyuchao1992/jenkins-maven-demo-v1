export class MyPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 方法：使用 CSS 兄弟选择器查找同层的上一个 span
  async getCellLocatorWithAsteriskUsingCSS(fieldName: string): Promise<Locator> {
    // 定位包含字段名的单元格
    const cellLocator = this.page.locator(`text=exact("${fieldName}")`);

    // 使用 + 查找前一个兄弟节点
    const spanLocator = cellLocator.locator('previous-sibling=span');

    // 打印并返回 span 的 locator
    console.log(`Cell Locator: ${cellLocator}`);
    console.log(`Span Locator (for asterisk): ${spanLocator}`);

    return spanLocator;
  }
}