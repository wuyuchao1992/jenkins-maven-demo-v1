import { test, expect } from '@playwright/test';

test('count buttons within dropdown rows', async ({ page }) => {
  // 打开页面
  await page.goto('https://example.com');

  // 找到所有符合条件的按钮
  const buttons = page
    .getByTestId('dropdown')
    .locator('[data-testid^="row_"]')
    .getByRole('button');

  // 获取匹配按钮的数量
  const count = await buttons.count();

  console.log(`There are ${count} buttons within the dropdown rows on the page.`);

  // 你可以根据这个数量进行其他操作或断言
  expect(count).toBeGreaterThan(0); // 示例断言
});
