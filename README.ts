# Playwright 表格数据提取 Page Object 实现

下面是一个完整的 Playwright Page Object 解决方案，将分组处理和非分组处理逻辑分离，使代码更清晰易维护：

```typescript
import { Page, Locator } from '@playwright/test';

interface TableData {
  [displayKey: string]: Record<string, string>;
}

export class TablePage {
  private page: Page;
  private tableSelector: string;

  constructor(page: Page, tableSelector: string = 'table') {
    this.page = page;
    this.tableSelector = tableSelector;
  }

  /**
   * 提取表格数据
   */
  async extractTableData(): Promise<TableData> {
    const table = this.page.locator(this.tableSelector);
    const headers = await this.getHeaders(table);
    const rows = await table.locator('tbody tr').all();
    
    const tableData: TableData = {};
    let currentGroup = '';
    let remainingGroupRows = 0;

    for (const [index, row] of rows.entries()) {
      const cells = await row.locator('td').all();
      
      // 处理分组行
      if (await this.isGroupRow(row, cells)) {
        const groupData = await this.processGroupRow(row, cells, headers);
        currentGroup = groupData.groupName;
        remainingGroupRows = groupData.rowspan - 1;
        tableData[groupData.displayKey] = groupData.rowData;
      } 
      // 处理子行
      else if (remainingGroupRows > 0) {
        const subRowData = await this.processSubRow(row, cells, headers, currentGroup);
        tableData[subRowData.displayKey] = subRowData.rowData;
        remainingGroupRows--;
      } 
      // 处理独立行
      else {
        const independentData = await this.processIndependentRow(row, cells, headers);
        tableData[independentData.displayKey] = independentData.rowData;
      }
    }

    return tableData;
  }

  /**
   * 判断是否为分组行
   */
  private async isGroupRow(row: Locator, cells: Locator[]): Promise<boolean> {
    if (cells.length === 0) return false;
    
    const firstCell = cells[0];
    const rowspan = await firstCell.getAttribute('rowspan');
    return rowspan ? parseInt(rowspan) > 1 : false;
  }

  /**
   * 处理分组行
   */
  private async processGroupRow(
    row: Locator, 
    cells: Locator[], 
    headers: string[]
  ): Promise<{ 
    groupName: string; 
    rowspan: number; 
    displayKey: string;
    rowData: Record<string, string> 
  }> {
    const rowData = await this.fillRowData(cells, headers);
    const groupName = rowData[headers[0]] || '';
    
    const firstCell = cells[0];
    const rowspanAttr = await firstCell.getAttribute('rowspan');
    const rowspan = rowspanAttr ? parseInt(rowspanAttr) : 1;
    
    const displayKey = `${groupName}${rowData[headers[1]] || ''}`;
    
    return {
      groupName,
      rowspan,
      displayKey,
      rowData
    };
  }

  /**
   * 处理子行
   */
  private async processSubRow(
    row: Locator, 
    cells: Locator[], 
    headers: string[],
    groupName: string
  ): Promise<{ 
    displayKey: string;
    rowData: Record<string, string> 
  }> {
    // 子行缺少第一列（被合并），所以从第二列开始填充
    const rowData = await this.fillRowData(cells, headers.slice(1), 1);
    
    // 添加分组信息
    rowData[headers[0]] = groupName;
    
    const subCategory = rowData[headers[1]] || '';
    const displayKey = `${groupName}${subCategory}`;
    
    return {
      displayKey,
      rowData
    };
  }

  /**
   * 处理独立行
   */
  private async processIndependentRow(
    row: Locator, 
    cells: Locator[], 
    headers: string[]
  ): Promise<{ 
    displayKey: string;
    rowData: Record<string, string> 
  }> {
    const rowData = await this.fillRowData(cells, headers);
    const displayKey = rowData[headers[0]] || '';
    
    return {
      displayKey,
      rowData
    };
  }

  /**
   * 填充行数据
   */
  private async fillRowData(
    cells: Locator[], 
    headers: string[],
    startIndex: number = 0
  ): Promise<Record<string, string>> {
    const rowData: Record<string, string> = {};
    
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const cellIndex = i + startIndex;
      
      if (cellIndex < cells.length) {
        rowData[header] = (await cells[cellIndex].textContent())?.trim() || '';
      } else {
        rowData[header] = '';
      }
    }
    
    return rowData;
  }

  /**
   * 获取表头
   */
  private async getHeaders(table: Locator): Promise<string[]> {
    return table.locator('thead tr:first-child th').allTextContents();
  }
}
```

## 使用示例

```typescript
import { test, expect } from '@playwright/test';
import { TablePage } from './TablePage';

test('提取表格数据测试', async ({ page }) => {
  // 导航到页面
  await page.goto('https://example.com/data-table');
  
  // 创建 TablePage 实例
  const tablePage = new TablePage(page, '#report-table');
  
  // 提取表格数据
  const tableData = await tablePage.extractTableData();
  
  // 验证数据
  console.log('提取的表格数据:');
  console.dir(tableData, { depth: null });
  
  // 验证分组数据
  expect(tableData['研发中心产品架构设计']).toBeDefined();
  expect(tableData['研发中心产品架构设计']['负责人']).toEqual('张工');
  expect(tableData['研发中心产品架构设计']['进度']).toEqual('100%');
  
  // 验证子行数据
  expect(tableData['研发中心前端开发']).toBeDefined();
  expect(tableData['研发中心前端开发']['负责人']).toEqual('李工');
  
  // 验证独立行数据
  expect(tableData['人力资源']).toBeDefined();
  expect(tableData['人力资源']['进度']).toEqual('40%');
});
```

## 设计说明

### 分离的处理逻辑

1. **分组行处理 (`processGroupRow`)**:
   - 识别带有 `rowspan` 属性的行
   - 提取组名和行跨度信息
   - 生成组合键名：`组名 + 子分类`
   - 填充完整行数据

2. **子行处理 (`processSubRow`)**:
   - 在分组范围内处理子行
   - 第一列使用组名（被合并列）
   - 生成组合键名：`组名 + 子分类`
   - 填充剩余列数据

3. **独立行处理 (`processIndependentRow`)**:
   - 处理非分组行
   - 直接使用第一列作为键名
   - 填充完整行数据

### 关键方法

- `isGroupRow()`: 判断是否为分组行
- `fillRowData()`: 通用行数据填充方法
- `getHeaders()`: 提取表头信息

### 优势

1. **关注点分离**:
   - 每种行类型有专门的处理方法
   - 避免复杂的状态判断逻辑
   - 提高代码可读性和可维护性

2. **可扩展性**:
   - 轻松添加新的行类型处理逻辑
   - 支持不同的表格结构变化
   - 便于添加额外的数据处理逻辑

3. **错误隔离**:
   - 每种行类型的错误不会影响其他处理逻辑
   - 更容易定位和处理特定问题

4. **可测试性**:
   - 每个方法可以单独测试
   - 简化单元测试编写
   - 更容易模拟不同行类型

这个实现清晰地分离了分组处理和非分组处理逻辑，使代码更易于理解和维护，同时保持了处理复杂表格数据的灵活性。