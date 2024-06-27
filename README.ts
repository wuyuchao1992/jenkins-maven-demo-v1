要在每一个步骤执行时自动高亮元素，可以通过在每个步骤定义中添加高亮功能，或者更优雅的方法是通过钩子（hooks）来实现。这里我们展示如何使用 Cucumber 的 hooks 在每个步骤前后进行元素高亮。

#### 一、创建高亮函数

首先，我们定义一个高亮元素的函数。将这个函数放在一个工具文件中，以便在其他地方使用。

**src/utils/playwrightUtils.ts**：
```typescript
import { Page } from 'playwright';

export const highlightElement = async (page: Page, selector: string) => {
  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.outline = '2px solid red';
    }
  }, selector);
};
```

#### 二、配置 Cucumber Hooks

接下来，我们在 Cucumber 的 hooks 中调用高亮函数。这可以确保每个步骤执行前后都会高亮相关元素。

**src/hooks.ts**：
```typescript
import { Before, After, BeforeStep, AfterStep } from '@cucumber/cucumber';
import { highlightElement } from './utils/playwrightUtils';
import { Page } from 'playwright';

Before(async function () {
  this.context = {};
  this.context.page = await this.browser.newPage();
});

BeforeStep(async function (scenario) {
  const stepName = scenario.pickle.steps[scenario.pickle.steps.length - 1].text;
  console.log(`Before step: ${stepName}`);
  // Assuming you have a way to get the selector for the current step
  const selector = this.context.currentSelector;
  if (selector) {
    await highlightElement(this.context.page, selector);
  }
});

AfterStep(async function (scenario) {
  const stepName = scenario.pickle.steps[scenario.pickle.steps.length - 1].text;
  console.log(`After step: ${stepName}`);
  // Assuming you have a way to get the selector for the current step
  const selector = this.context.currentSelector;
  if (selector) {
    await highlightElement(this.context.page, selector);
  }
});

After(async function () {
  await this.context.page.close();
});
```

#### 三、自定义 World 并使用 Hooks

为了能够在 hooks 中使用 `page` 对象，需要自定义 World 并在其中初始化 `page` 对象。

**src/world.ts**：
```typescript
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';

class CustomWorld extends World {
  browser: Browser;
  page: Page;
  context: any;

  constructor(options) {
    super(options);
    this.browser = null;
    this.page = null;
    this.context = {};
  }
}

setWorldConstructor(CustomWorld);
```

在步骤定义文件中，可以通过 `this.context.currentSelector` 来设置当前步骤要高亮的元素选择器。

**src/steps/sample.steps.ts**：
```typescript
import { Given, Then } from '@cucumber/cucumber';
import { launchBrowser, goToPage, checkTitle } from '../utils/playwrightUtils';

Given('I open the Playwright website', async function () {
  this.browser = await launchBrowser();
  this.context.page = await this.browser.newPage();
  await goToPage('https://playwright.dev/');
});

Then('the title should be {string}', async function (expectedTitle: string) {
  this.context.currentSelector = 'title';  // 设置当前步骤要高亮的选择器
  await checkTitle(expectedTitle);
  await this.browser.close();
});
```

#### 结论

通过在 hooks 中调用高亮函数，可以确保每一个步骤执行前后都会高亮相关的元素。此方法利用 Cucumber 的钩子机制，在每个步骤之前和之后执行特定的代码，从而实现高亮效果。这种方式可以保持测试代码的清洁和模块化，同时增强调试的可视化效果。
