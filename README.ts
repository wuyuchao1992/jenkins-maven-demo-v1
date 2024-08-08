import fs from 'fs';
import path from 'path';
import { merge } from 'cucumber-reporting';
import { generate, Options } from 'cucumber-html-reporter';

const jsonDir = 'reports';
const outputJsonFile = 'reports/cucumber-combined.json';
const outputHtmlFile = 'report/cucumber-report.html'; // Place the report in the report directory

// Get all JSON files
const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));

// Read and merge JSON files
const jsonReports = jsonFiles.map((file) => {
  const filePath = path.join(jsonDir, file);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
});

const combinedReport = merge(jsonReports);

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

