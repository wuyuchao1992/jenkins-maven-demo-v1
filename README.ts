import { Given, Then } from '@cucumber/cucumber';
import { DataTable } from '@cucumber/cucumber';

// 假设 getRandomString 方法已存在并导入
import { getRandomString } from './utils';

Given('I have the following user data:', function (dataTable: DataTable) {
    // 存储原始 DataTable
    this.originalDataTable = dataTable.hashes();
});

Given('I replace all usernames with random values', function () {
    // 生成随机的 username 并替换原始 DataTable 中的 username
    this.modifiedDataTable = this.originalDataTable.map(row => {
        return {
            ...row,
            username: getRandomString() // 使用现有的 getRandomString 方法生成随机字符串
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