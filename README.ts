import { Given, Then } from '@cucumber/cucumber';
import { DataTable } from '@cucumber/cucumber';

// 随机选择一个值
function randomlySelectValue(value: string): string {
    const options = value.split('/'); // 根据斜杠分割候选值
    const randomIndex = Math.floor(Math.random() * options.length); // 随机选择一个索引
    return options[randomIndex]; // 返回随机选择的值
}

Given('I have the following user data:', function (dataTable: DataTable) {
    // 存储原始 DataTable
    this.originalDataTable = dataTable.hashes();
});

Given('I replace usernames with randomly selected values', function () {
    // 遍历 DataTable 并随机选择候选值
    this.modifiedDataTable = this.originalDataTable.map(row => {
        const username = randomlySelectValue(row.username); // 随机选择 username
        return {
            ...row,
            username // 替换为随机选择的 username
        };
    });

    // 将修改后的 DataTable 以 DataTable 格式存储
    this.modifiedDataTableObject = new DataTable({
        rows: this.modifiedDataTable.map(row => Object.values(row))
    });

    console.log('Modified DataTable:', this.modifiedDataTable);
});

Then('I create users with the modified data', async function () {
    // 使用修改后的 DataTable 创建用户
    for (const row of this.modifiedDataTable) {
        const { username, email, age } = row;
        console.log(`Creating user with username: ${username}, email: ${email}, age: ${age}`);
        
        // 假设你有一个方法 createUser 来处理用户创建
        await createUser(username, email, age);
    }
});