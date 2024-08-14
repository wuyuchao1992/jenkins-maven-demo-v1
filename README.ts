import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    video: 'on-first-retry', // 你可以选择 'on', 'on-first-retry', 或 'retain-on-failure'
  },
});

import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { BrowserContext, Page } from 'playwright';
import { expect } from '@playwright/test';

let context: BrowserContext;
let page: Page;

Before(async () => {
  context = await global.browser.newContext({
    video: {
      dir: 'videos/', // 设置录像文件保存的目录
    },
  });
  page = await context.newPage();
});

After(async function () {
  // 在测试失败时嵌入录像
  if (this.result?.status === 'failed') {
    const video = await page.video();
    if (video) {
      const videoPath = await video.path();
      this.attach(`file://${videoPath}`, 'video/webm');
    }
  }
  await context.close();
});
