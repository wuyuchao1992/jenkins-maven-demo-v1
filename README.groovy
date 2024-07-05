const { Before, After } = require('@cucumber/cucumber');
const playwright = require('playwright');

let browser;
let browserType;
let browserVersion;
let browserExecutablePath;

Before(async function () {
  browserType = 'chromium'; // 这里可以更改为 'firefox' 或 'webkit'
  const browserTypeInstance = playwright[browserType];
  
  // 获取浏览器的可执行文件路径
  browserExecutablePath = browserTypeInstance.executablePath();

  browser = await browserTypeInstance.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 获取浏览器版本信息
  browserVersion = await page.evaluate(() => navigator.userAgent);

  // 将浏览器和页面存储在全局变量中
  global.browser = browser;
  global.page = page;
  global.browserExecutablePath = browserExecutablePath;
});

After(async function () {
  await browser.close();
});

module.exports = { browserType, browserVersion, browserExecutablePath };
