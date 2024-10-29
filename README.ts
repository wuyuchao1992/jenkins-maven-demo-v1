export class MyPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 方法：使用正则表达式部分匹配并查找同层的 span 元素
  async getCellLocatorWithRegex(fieldName: string): Promise<Locator> {
    // 使用正则表达式部分匹配文本
    const cellLocator = this.page.locator(new RegExp(fieldName, 'i'));

    // 使用 previous-sibling 查找同层的上一个兄弟元素 span
    const spanLocator = cellLocator.locator('xpath=preceding-sibling::span');

    // 打印并返回 span 的 locator
    console.log(`Cell Locator: ${cellLocator}`);
    console.log(`Span Locator (for asterisk): ${spanLocator}`);

    return spanLocator;
  }
}