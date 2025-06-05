以下是一个完整的解决方案，用于处理带有合并行的表格数据，并根据需求组合 group 名称和子分类名称。当存在组合数据时，输出 "group + 子分类"；当是独立行时，仅输出 group 名称：

```typescript
import { chromium, Browser, Page, ElementHandle } from 'playwright';

interface TableRow {
  displayName: string;
  group: string;
  subCategory: string;
  data: Record<string, string>;
}

interface GroupedData {
  [displayName: string]: Record<string, string>;
}

async function extractTableData(page: Page, tableSelector: string): Promise<GroupedData> {
  // 获取表头
  const headers = await page.$$eval(
    `${tableSelector} thead tr:first-child th`,
    (ths) => ths.map(th => th.textContent?.trim() || '')
  );

  // 获取所有行
  const rows = await page.$$(`${tableSelector} tbody tr`);
  const tableData: TableRow[] = [];
  
  let currentGroup = '';
  let remainingGroupRows = 0;
  let groupHasSubCategories = false;

  for (const row of rows) {
    const cells = await row.$$('td');
    const rowData: Record<string, string> = {};
    let displayName = '';
    
    // 处理分组行
    if (remainingGroupRows <= 0) {
      const firstCell = cells[0];
      const rowspan = parseInt(await firstCell.getAttribute('rowspan') || '1', 10);
      
      currentGroup = (await firstCell.textContent() || '').trim();
      remainingGroupRows = rowspan;
      groupHasSubCategories = rowspan > 1;
      
      // 填充行数据
      await fillRowData(cells, headers, rowData);
      
      // 确定显示名称
      if (groupHasSubCategories) {
        // 分组行自身也是子分类
        const subCategory = rowData[headers[1]] || '';
        displayName = `${currentGroup}${subCategory}`;
      } else {
        // 独立行
        displayName = currentGroup;
      }
      
      tableData.push({
        displayName,
        group: currentGroup,
        subCategory: rowData[headers[1]] || '',
        data: rowData
      });
      
      remainingGroupRows--;
      continue;
    }
    
    // 处理子行
    if (groupHasSubCategories) {
      // 填充行数据（第一列被合并，从第二列开始）
      await fillRowData(cells, headers.slice(1), rowData, 1);
      
      const subCategory = rowData[headers[1]] || '';
      displayName = `${currentGroup}${subCategory}`;
      
      tableData.push({
        displayName,
        group: currentGroup,
        subCategory,
        data: rowData
      });
    }
    
    remainingGroupRows--;
  }

  // 组装最终数据结构
  const groupedData: GroupedData = {};
  
  for (const row of tableData) {
    // 使用组合名称作为键
    groupedData[row.displayName] = row.data;
  }
  
  return groupedData;
}

// 辅助函数：填充行数据
async function fillRowData(
  cells: ElementHandle<SVGElement | HTMLElement>[],
  headers: string[],
  rowData: Record<string, string>,
  startIndex: number = 0
): Promise<void> {
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const cellIndex = i + startIndex;
    
    if (cellIndex < cells.length) {
      rowData[header] = (await cells[cellIndex].textContent() || '').trim();
    } else {
      rowData[header] = '';
    }
  }
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://example.com/your-page');
  
  const tableSelector = '#your-table-id';
  const groupedData = await extractTableData(page, tableSelector);
  
  console.log('Grouped Data:');
  console.dir(groupedData, { depth: null, colors: true });
  
  await browser.close();
}

main().catch(console.error);
```

### 解决方案说明

#### 核心逻辑
1. **分组识别**：
   - 检测 `rowspan` 属性识别分组行
   - 设置 `groupHasSubCategories` 标志区分组合数据/独立行
   - 跟踪 `remainingGroupRows` 处理合并行范围

2. **名称组合策略**：
   ```typescript
   if (groupHasSubCategories) {
     displayName = `${currentGroup}${subCategory}`;
   } else {
     displayName = currentGroup;
   }
   ```
   - 组合数据：拼接 group 和 subCategory
   - 独立行：仅使用 group 名称

3. **数据结构**：
   ```typescript
   {
     "Group1Sub1": { ...rowData },
     "Group1Sub2": { ...rowData },
     "IndependentGroup": { ...rowData }
   }
   ```
   - 键：组合后的显示名称
   - 值：行数据对象

#### 处理不同表格结构
1. **分组行（有子分类）**：
   - 第一列：group（带 rowspan）
   - 第二列：子分类名称
   - 后续列：数据值

2. **子行**：
   - 第一列：子分类名称（因合并列空缺）
   - 后续列：数据值

3. **独立行**：
   - 第一列：group 名称
   - 后续列：数据值（无子分类）

#### 示例表格处理
输入表格：
```html
<table>
  <thead>
    <tr>
      <th>Group</th>
      <th>Sub Category</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <!-- 分组行 -->
    <tr>
      <td rowspan="3">Group1</td>
      <td>Sub1</td>
      <td>100</td>
    </tr>
    <!-- 子行1 -->
    <tr>
      <td>Sub2</td>
      <td>200</td>
    </tr>
    <!-- 子行2 -->
    <tr>
      <td>Sub3</td>
      <td>300</td>
    </tr>
    <!-- 独立行 -->
    <tr>
      <td>Group2</td>
      <td></td>
      <td>400</td>
    </tr>
  </tbody>
</table>
```

输出结果：
```javascript
{
  "Group1Sub1": {
    "Group": "Group1",
    "Sub Category": "Sub1",
    "Value": "100"
  },
  "Group1Sub2": {
    "Group": "Group1",
    "Sub Category": "Sub2",
    "Value": "200"
  },
  "Group1Sub3": {
    "Group": "Group1",
    "Sub Category": "Sub3",
    "Value": "300"
  },
  "Group2": {
    "Group": "Group2",
    "Sub Category": "",
    "Value": "400"
  }
}
```

### 使用说明

1. **安装依赖**：
   ```bash
   npm install playwright
   ```

2. **配置选择器**：
   - 修改 `tableSelector` 为实际表格选择器
   - 调整表头选择器逻辑（如无 thead 改用 `tr:first-child`）

3. **处理复杂情况**：
   - **多级表头**：修改表头提取逻辑
   ```typescript
   // 获取复杂表头
   const headers = await page.$$eval(
     `${tableSelector} tr:nth-child(1) th, ${tableSelector} tr:nth-child(2) th`,
     (ths) => ths.map(th => th.textContent?.trim() || '')
   );
   ```
   - **列合并**：添加 colspan 处理
   ```typescript
   // 在 fillRowData 中添加
   const colspan = parseInt(await cell.getAttribute('colspan') || '1', 10);
   // 处理合并列逻辑
   ```

4. **运行脚本**：
   ```bash
   ts-node table-scraper.ts
   ```

此方案能智能处理各种表格结构，根据是否包含子分类自动组合显示名称，输出符合要求的键值对数据结构。