import { Page } from 'playwright';
import { DataTable } from '@cucumber/cucumber';

/**
 * 从 drawer-body 中提取表格数据，并转换为 Cucumber DataTable 对象
 * @param page - Playwright 的 Page 对象
 * @returns Promise<DataTable> - 返回转换后的 DataTable 对象
 */
async function extractTableFromDrawerBodyToDataTable(page: Page): Promise<DataTable> {
  // 定位到 drawer-body 中的表格
  const tableRows = await page.$$('.drawer-body table tbody tr'); // 获取所有行元素

  // 存储表头和行数据
  const rowsData: string[][] = [];

  // 添加表头
  rowsData.push(['name', 'type', 'validationType', 'validation value']);

  // 使用 for 循环逐行读取数据
  for (const row of tableRows) {
    // 获取行内的所有单元格元素
    const cells = await row.$$('td');

    // 读取每个单元格的文本内容
    const rowData: string[] = [];
    for (const cell of cells) {
      const text = await cell.textContent(); // 获取单元格文本
      rowData.push(text?.trim() || ''); // 去除空格并添加到行数据中
    }

    // 将读取的行数据添加到 rowsData 中
    rowsData.push(rowData);
  }

  // 使用 rowsData 构建 DataTable
  const dataTable = new DataTable({
    rows: rowsData, // 将提取的表格数据添加到 DataTable
  });

  return dataTable;
}