import { Then } from '@cucumber/cucumber';
import { BreakdownValidator } from './BreakdownValidator'; // 假设你将封装类保存在这个文件路径下

Then('the following breakdowns should exist on the page', async function (dataTable) {
    const validator = new BreakdownValidator(this.page);

    // 获取表格的第一行，并将其解析为字符串数组进行验证
    await validator.validateBreakdownsFromString(dataTable.rows()[0][0]);
});