npm install cucumber-html-reporter cucumber-json-merge --save-dev

merge-and-generate-report.ts

import fs from 'fs';
import path from 'path';
import { generate, Options } from 'cucumber-html-reporter';
import merge from 'cucumber-json-merge';

const jsonDir = 'reports';
const outputJsonFile = 'reports/cucumber-combined.json';
const outputHtmlFile = 'report/cucumber-report.html'; // Place the report in the report directory

// Get all JSON files
const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json')).map(file => path.join(jsonDir, file));

// Merge JSON files
const combinedReport = merge(jsonFiles);

// Write the merged JSON file
fs.writeFileSync(outputJsonFile, JSON.stringify(combinedReport, null, 2));

// Configure HTML report options
const options: Options = {
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

// Generate HTML report
generate(options);

console.log('HTML report has been generated at', outputHtmlFile);



{
  "scripts": {
    "merge-and-generate-report": "node merge-and-generate-report.js",
    "test:all": "npm run prepare-reports && npm run test:singleThread && npm run test:parallel && npm run merge-and-generate-report"
  }
}

