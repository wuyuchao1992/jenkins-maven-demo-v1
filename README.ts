// Page Object定义
class TablePage {
  private page: playwright.Page;

  constructor(page: playwright.Page) {
    this.page = page;
  }

  // 获取表格数据的主方法
  async getData(): Promise<NestedData> {
    await this.waitForTableLoad();
    
    const rawRows = this.extractRawTableData();
    return this.processData(rawRows);
  }

  private waitForTableLoad(): Promise<void> {
    return this.page.waitForSelector('table', { state: 'visible' });
  }

  private extractRawTableData(): string[][] {
    return this.page.$$eval('table tr', rows => 
      rows.slice(2) // 跳过表头
        .map(row => Array.from(row.querySelectorAll('td, th')).map(cell => cell.textContent.trim())))
    );
  }

  private processData(rawRows: string[][]): NestedData {
    const nestedData: NestedData = {};
    let currentCategory: string | null = null;

    for (const row of rawRows) {
      if (this.isEmptyRow(row)) {
        currentCategory = null;
      } else if (this.isCategoryRow(row)) {
        currentCategory = row[0];
        nestedData[currentCategory] = {};
      } else if (currentCategory && row.length >= 6) {
        try {
          const yearlyData = this.parseYearlyData(row);
          const name = row[0];
          nestedData[currentCategory][name] = yearlyData;
        } catch (error) {
          console.error(`Invalid data row: ${JSON.stringify(row)}`, error);
        }
      } else {
        console.warn(`Unexpected row format:`, row);
      }
    }

    return nestedData;
  }

  private isEmptyRow(row: string[]): boolean {
    return row.length === 0 || row.every(cell => cell === '');
  }

  private isCategoryRow(row: string[]): boolean {
    return !this.isEmptyRow(row) && row[0] !== '' && row.slice(1).every(cell => cell === '');
  }

  private parseYearlyData(row: string[]): YearlyData {
    return {
      actual_2023: parseInt(row[1]),
      actual_2024: parseInt(row[2]),
      budget_2024: parseInt(row[3]),
      forecast_2024: parseInt(row[4]),
      forecast_2025: parseInt(row[5])
    };
  }
}

// 使用示例
(async () => {
  const browser = await playwright.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://your-table-page.com');
  
  try {
    const tablePage = new TablePage(page);
    const data = await tablePage.getData();
    
    // 示例断言
    expect(data['Total']['AA']).toEqual({
      actual_2023: 1,
      actual_2024: 2,
      budget_2024: 3,
      forecast_2024: 4,
      forecast_2025: 5
    });
    
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Data extraction failed:', error);
  } finally {
    await browser.close();
  }
})();
