import { test, expect } from '@playwright/test';

test('find cell based on text and return content', async ({ page }) => {
  // 打开页面
  await page.goto('https://example.com');

  // 根据指定的文本定位到包含该文本的单元格（<td> 或 <th>）
  const cellLocator = page.locator('table td', { hasText: '目标文本' });

  // 获取单元格内的文本内容
  const cellContent = await cellLocator.textContent();

  console.log('Cell content:', cellContent);

  // 断言或其他操作
  expect(cellContent).toContain('期望内容');
});