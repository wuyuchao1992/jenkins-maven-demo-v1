要将 `FamilyDetailSection` 和 `SubFamilyDetailSection` 结合到 `MainPage` 中，您可以在 `MainPage` 中定义一个方法，用于依次调用 `FamilyDetailSection` 和 `SubFamilyDetailSection` 的操作。这样可以实现将两个操作连贯起来的效果。

以下是结合 `FamilyDetailSection` 和 `SubFamilyDetailSection` 的代码示例：

### **更新 MainPage.ts**

```typescript
// pages/MainPage.ts
import { BasePage } from './BasePage';
import { FamilyDetailSection } from './FamilyDetailSection';
import { SubFamilyDetailSection } from './SubFamilyDetailSection';
import { Page } from 'playwright';

export class MainPage extends BasePage {
  public familyDetail: FamilyDetailSection;
  public subFamilyDetail: SubFamilyDetailSection;

  constructor(page: Page) {
    super(page);
    this.familyDetail = new FamilyDetailSection(page);
    this.subFamilyDetail = new SubFamilyDetailSection(page);
  }

  // 将 Family 和 Sub-Family 的操作连起来
  async addFamilyAndSubFamily(
    familyFields: { fieldName: string; type: string; validationRuleType: string; ruleValue: string }[],
    subFamilies: { subFamilyName: string; fields: { fieldName: string; type: string; validationRuleType: string; ruleValue: string }[] }[]
  ) {
    // 1. 添加 Family Fields
    await this.familyDetail.addFamilyFields(familyFields);

    // 2. 添加 Sub-Family Rows 和编辑 Sub-Family 详细信息
    await this.subFamilyDetail.addAndEditSubFamilies(subFamilies);
  }
}
```

### **FamilyDetailSection.ts**

确保 `FamilyDetailSection` 中有用于添加 `Family Fields` 的方法，例如 `addFamilyFields`，以便在 `MainPage` 中调用：

```typescript
// pages/FamilyDetailSection.ts
import { Page, Locator } from 'playwright';

export class FamilyDetailSection {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 添加 Family Fields
  async addFamilyFields(fields: { fieldName: string; type: string; validationRuleType: string; ruleValue: string }[]) {
    for (const field of fields) {
      // 逻辑：添加每个 Family Field 的代码，如点击 + 号并填写信息
      // 示例：
      await this.page.locator('#add-family-field-button').click(); // 替换为实际选择器
      // 填写字段逻辑
    }
  }
}
```

### **SubFamilyDetailSection.ts**

确保 `SubFamilyDetailSection` 中有方法用于添加和编辑 `Sub-Family`，例如 `addAndEditSubFamilies`：

```typescript
// pages/SubFamilyDetailSection.ts
import { Page, Locator } from 'playwright';

export class SubFamilyDetailSection {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 添加 Sub-Family Rows 并编辑详细信息
  async addAndEditSubFamilies(subFamilies: { subFamilyName: string; fields: { fieldName: string; type: string; validationRuleType: string; ruleValue: string }[] }[]) {
    // 根据需要的 Sub-Family 行数，点击 + 号
    for (let i = 0; i < subFamilies.length; i++) {
      await this.page.locator('#add-sub-family-button').click(); // 替换为实际选择器
      // 编辑每一行 Sub-Family 的逻辑
    }
  }
}
```

### **使用示例**

在 Step Definitions 中使用 `MainPage` 来调用该方法：

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { MainPage } from '../pages/MainPage'; // 根据实际路径调整
import { expect } from '@playwright/test';

let mainPage: MainPage;

Given('I am on the main page', async function () {
  mainPage = new MainPage(this.page); // 假设 this.page 是 Playwright 的 Page 对象
});

When('I add family and sub-family fields', async function () {
  const familyFields = [
    { fieldName: 'f1', type: 'LONG', validationRuleType: 'ANY', ruleValue: '' },
    { fieldName: 'f2', type: 'LONG', validationRuleType: 'RANGE', ruleValue: '1,2' },
    // 添加更多 Family Fields...
  ];

  const subFamilies = [
    {
      subFamilyName: 'SubFamily1',
      fields: [
        { fieldName: 'f1', type: 'STRING', validationRuleType: 'ANY', ruleValue: '' },
        // 添加更多 Sub-Family Fields...
      ],
    },
    // 添加更多 Sub-Families...
  ];

  await mainPage.addFamilyAndSubFamily(familyFields, subFamilies);
});

Then('the fields should be added correctly', async function () {
  // 在这里进行验证操作，例如检查页面上的字段是否正确添加
});
```

### **总结**

以上实现将 `FamilyDetailSection` 和 `SubFamilyDetailSection` 结合在 `MainPage` 中，通过定义一个 `addFamilyAndSubFamily` 方法，您可以连贯地添加 Family 和 Sub-Family，并可以通过步骤定义进行自动化测试。