import { DataTable } from '@cucumber/cucumber'; // 确保导入 DataTable 类型

/**
 * 将 DataTable 转换为列表的封装方法
 * @param dataTable - Cucumber 的 DataTable 对象
 * @returns 转换后的列表数组
 */
function dataTableToList(dataTable: DataTable): string[][] {
  // 使用 .raw() 方法将 DataTable 转换为二维数组
  return dataTable.raw();
}

// 示例使用
// 假设有一个示例 DataTable
const sampleDataTable = new DataTable([
  ['Name', 'Age'],
  ['Alice', '30'],
  ['Bob', '25'],
]);

const list = dataTableToList(sampleDataTable);
console.log(list);