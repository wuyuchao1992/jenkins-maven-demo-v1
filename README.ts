import { test, expect } from '@playwright/test';

test('Verify navigation URL matches the target URL', async ({ page, params }) => {
  // 获取 URL 参数
  const baseUrl = params.URL;

  // 判断 URL 中是否包含 'DEV' 或 'UAT'
  let targetUrl = '';
  if (baseUrl.includes('DEV')) {
    targetUrl = 'https://dev.example.com';
  } else if (baseUrl.includes('UAT')) {
    targetUrl = 'https://uat.example.com';
  } else {
    targetUrl = 'https://prod.example.com'; // 默认生产环境URL
  }

  // 跳转到目标 URL
  await page.goto(targetUrl);

  // 获取当前页面的 URL
  const currentURL = page.url();

  // 验证当前 URL 是否与 targetUrl 相等
  expect(currentURL).toBe(targetUrl);
});