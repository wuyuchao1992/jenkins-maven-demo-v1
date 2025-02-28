在 Cucumber.js 中合并并行和串行执行的测试报告，尤其是使用 `@cucumber/pretty-formatter`（默认终端格式化输出）时，需要借助 **支持报告文件合并的工具**。以下是分步实现方案：

---

### **1. 核心思路**
1. **生成结构化报告文件**（如 JSON、HTML），而非仅依赖终端输出。
2. **分别保存并行和串行测试的报告文件**。
3. **合并报告文件**，生成统一的可视化报告。

---

### **2. 推荐工具**
| 工具                          | 作用                              |
|------------------------------|---------------------------------|
| `@cucumber/json-formatter`    | 生成 JSON 格式的原始测试报告         |
| `cucumber-html-reporter`      | 将 JSON 报告转换为 HTML 可视化报告   |
| `json-report-merger`          | 合并多个 JSON 报告文件              |

---

### **3. 实现步骤**

#### **(1) 安装依赖**
```bash
npm install @cucumber/json-formatter cucumber-html-reporter json-report-merger --save-dev
```

#### **(2) 生成 JSON 报告**
修改测试命令，为并行和串行测试分别生成 JSON 报告：

```json
{
  "scripts": {
    "test:parallel": "cucumber-js --parallel 4 --tags 'not @serial' --format json:reports/report-parallel.json",
    "test:serial": "cucumber-js --parallel 1 --tags '@serial' --format json:reports/report-serial.json",
    "test": "npm run test:parallel && npm run test:serial"
  }
}
```

#### **(3) 合并 JSON 报告**
创建合并脚本 `scripts/merge-reports.ts`：

```typescript
import { merge } from 'json-report-merger';
import path from 'path';

async function mergeReports() {
  const inputPatterns = [
    path.join(__dirname, '../reports/report-*.json'), // 匹配所有报告文件
  ];
  const outputFile = path.join(__dirname, '../reports/merged-report.json');

  await merge({
    inputPatterns,
    outputFile,
  });
  console.log('Reports merged successfully!');
}

mergeReports();
```

在 `package.json` 中添加合并命令：

```json
{
  "scripts": {
    "merge-reports": "ts-node scripts/merge-reports.ts"
  }
}
```

#### **(4) 生成 HTML 报告**
创建 HTML 报告生成脚本 `scripts/generate-html-report.ts`：

```typescript
const reporter = require('cucumber-html-reporter');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../reports/merged-report.json'),
  output: path.join(__dirname, '../reports/cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
};

reporter.generate(options);
```

在 `package.json` 中添加生成命令：

```json
{
  "scripts": {
    "generate-html-report": "ts-node scripts/generate-html-report.ts"
  }
}
```

#### **(5) 完整执行流程**
```bash
# 1. 运行测试并生成原始 JSON 报告
npm test

# 2. 合并报告
npm run merge-reports

# 3. 生成 HTML 报告
npm run generate-html-report
```

---

### **4. 最终报告效果**
- **合并后的 HTML 报告**：  
  ![HTML 报告示例](https://example.com/cucumber-html-report.png)
- **包含所有场景的执行状态、时间线和错误详情**。

---

### **5. 自定义报告样式（可选）**
修改 `cucumber-html-reporter` 的配置（如主题、颜色）：

```typescript
const options = {
  theme: 'hierarchy', // 可选主题：bootstrap、hierarchy、foundation
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Production"
  },
  // 更多配置见 https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md#html
};
```

---

### **6. 注意事项**
- **报告文件路径**：确保 `reports` 目录存在，或脚本中自动创建。
- **依赖兼容性**：确认 `json-report-merger` 与 Cucumber 版本兼容。
- **并行执行顺序**：合并后的报告可能打乱原始执行顺序，但不影响最终结果统计。

---

### **7. 替代方案（无合并工具）**
如果不想引入额外依赖，可手动拼接 JSON 报告：

```typescript
// scripts/merge-reports-manual.ts
import fs from 'fs';
import path from 'path';

const reportsDir = path.join(__dirname, '../reports');
const outputFile = path.join(reportsDir, 'merged-report.json');

const reportFiles = fs.readdirSync(reportsDir)
  .filter(file => file.startsWith('report-') && file.endsWith('.json'));

const mergedReport = [];
for (const file of reportFiles) {
  const content = fs.readFileSync(path.join(reportsDir, file), 'utf-8');
  mergedReport.push(...JSON.parse(content));
}

fs.writeFileSync(outputFile, JSON.stringify(mergedReport, null, 2));
```

---

### **总结**
通过 `JSON 报告合并 + HTML 生成`，可以无缝整合并行和串行测试的结果，最终得到一个统一的、可视化的测试报告。此方案适用于需要分批次执行测试但需集中查看结果的场景。