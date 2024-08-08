const fs = require('fs');
const path = require('path');
const merge = require('cucumber-json-merge');
const reporter = require('multiple-cucumber-html-reporter');

const jsonDir = 'reports';
const outputJsonFile = path.join(jsonDir, 'cucumber-combined.json');
const outputHtmlFile = 'report/cucumber-report.html'; // Place the report in the report directory

// Get all JSON files
const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json')).map(file => path.join(jsonDir, file));

// Merge JSON files into one
const combinedReport = merge(jsonFiles);

// Write the merged JSON file
fs.writeFileSync(outputJsonFile, JSON.stringify(combinedReport, null, 2));

// Generate HTML report
reporter.generate({
  jsonDir: jsonDir,
  reportPath: outputHtmlFile,
  metadata: {
    browser: {
      name: 'chrome',
      version: '89.0.4389.82'
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

const fs = require('fs');
const path = require('path');
const merge = require('cucumber-json-merge');
const reporter = require('multiple-cucumber-html-reporter');

const jsonDir = 'reports';
const outputJsonFile = path.join(jsonDir, 'cucumber-combined.json');
const outputHtmlFile = 'report/cucumber-report.html'; // Place the report in the report directory

// Get all JSON files
const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json')).map(file => path.join(jsonDir, file));

// Merge JSON files into one
const combinedReport = merge(jsonFiles);

// Write the merged JSON file
fs.writeFileSync(outputJsonFile, JSON.stringify(combinedReport, null, 2));

// Generate HTML report
reporter.generate({
  jsonDir: jsonDir,
  reportPath: outputHtmlFile,
  metadata: {
    browser: {
      name: 'chrome',
      version: '89.0.4389.82'
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
