import { Given } from '@cucumber/cucumber';
import { Page } from 'playwright'; // 确保从 Playwright 导入 Page
import { extractTableFromDrawerBody } from './your-extraction-file'; // 导入提取表格数据的函数

// 初始化 Playwright Page 对象（假设 Page 已经正确初始化）
let page: Page;

Given('I extract table data from the drawer-body', async function () {
  try {
    // 调用函数提取表格数据
    const dataTable = await extractTableFromDrawerBody(page);

    // 使用 DataTable，例如打印数据
    console.log(dataTable.raw());

    // 遍历 DataTable 对象
    dataTable.raw().forEach((row) => {
      console.log(`Name: ${row[0]}, Type: ${row[1]}, ValidationType: ${row[2]}, Validation Value: ${row[3]}`);
    });
  } catch (error) {
    console.error('Error extracting table data:', error);
  }
});