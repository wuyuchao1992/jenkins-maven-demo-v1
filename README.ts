npm install multiple-cucumber-html-reporter --save-dev


import fs from 'fs';
import path from 'path';
import { generate } from 'multiple-cucumber-html-reporter';

const jsonDir = 'reports';
const outputHtmlFile = 'report/cucumber-report.html'; // Place the report in the report directory

// Get all JSON files
const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json')).map(file => path.join(jsonDir, file));

// Merge JSON files into one
const combinedReport = jsonFiles.reduce((acc: any[], file) => {
  const jsonData = JSON.parse(fs.readFileSync(file, 'utf8'));
  return acc.concat(jsonData);
}, []);

// Write the merged JSON file
const outputJsonFile = path.join(jsonDir, 'cucumber-combined.json');
fs.writeFileSync(outputJsonFile, JSON.stringify(combinedReport, null, 2));

// Generate HTML report
generate({
  jsonDir: jsonDir,
  reportPath: outputHtmlFile,
  metadata: {
    browser: {
      name: 'chrome',
      version: '89'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '10'
    }
  },
  displayReportTime: true,
  openReportInBrowser: true
});

console.log('HTML report has been generated at', outputHtmlFile);

{
  "scripts": {
    "build-report-script": "tsc merge-and-generate-report.ts",
    "merge-and-generate-report": "node merge-and-generate-report.js",
    "test:all": "npm run prepare-reports && npm run test:singleThread && npm run test:parallel && npm run build-report-script && npm run merge-and-generate-report"
  }
}

