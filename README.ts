import { Pool } from 'pg';
import { Browser } from 'puppeteer'; // 假设你使用的是 Puppeteer

// 创建连接池
const pool = new Pool({
  user: 'yourUsername',
  host: 'yourHost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,
});

let browser: Browser;

async function deleteRecords(queries: string[]) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // 开始事务

    // 循环执行每个删除语句
    for (const query of queries) {
      await client.query(query);
    }

    await client.query('COMMIT'); // 提交事务
    console.log('Records deleted successfully');
  } catch (error) {
    await client.query('ROLLBACK'); // 回滚事务
    console.error('Error executing queries:', error);
  } finally {
    client.release(); // 释放客户端
  }
}

beforeAll(async () => {
  // 启动浏览器
  browser = await someBrowserLaunchingFunction();
});

afterAll(async () => {
  // 确保关闭浏览器和连接池
  await browser.close();
  await pool.end();
  console.log('Browser closed and pool ended');
});

test('database operations', async () => {
  // 参数化的删除查询
  const queries = [
    'DELETE FROM A',
    'DELETE FROM B'
  ];

  await deleteRecords(queries);
  // 其他测试操作
});
