const fs = require('fs');
const path = require('path');
const { merge } = require('cucumber-reporting');
const reporter = require('cucumber-html-reporter');

const jsonDir = 'reports';
const outputJsonFile = 'reports/cucumber-combined.json';
const outputHtmlFile = 'report/cucumber-report.html'; // 将报告放在 report 目录下

// 获取所有的 JSON 文件
const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));

// 读取并合并 JSON 文件
const jsonReports = jsonFiles.map(file => {
  const filePath = path.join(jsonDir, file);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
});

const combinedReport = merge(jsonReports);

// 写入合并后的 JSON 文件
fs.writeFileSync(outputJsonFile, JSON.stringify(combinedReport, null, 2));

// 生成 HTML 报告
const options = {
  theme: 'bootstrap',
  jsonFile: outputJsonFile,
  output: outputHtmlFile,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chrome  89.0.4389.82",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);

console.log('HTML report has been generated at', outputHtmlFile);

{
  "scripts": {
    "merge-and-generate-report": "node merge-and-generate-report.js",
    "test:all": "npm run prepare-reports && npm run test:singleThread && npm run test:parallel && npm run merge-and-generate-report"
  }
}
