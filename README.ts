npm install typescript ts-node @types/node multiple-cucumber-html-reporter cucumber-json-merge concurrently --save-dev

import { generate } from 'multiple-cucumber-html-reporter';

generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '89'
    },
    device: 'Local test machine',
    platform: {
      name: 'ubuntu',
      version: '20.04'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'My Project' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'B11221.34321' },
      { label: 'Execution Start Time', value: new Date().toISOString() },
      { label: 'Execution End Time', value: new Date().toISOString() }
    ]
  }
});

{
  "scripts": {
    "prepare-reports": "mkdir -p reports",
    "test:parallel": "cucumber-js",
    "test:singleThread": "cucumber-js --profile singleThread",
    "merge-reports": "cucumber-json-merge reports/cucumber-parallel.json reports/cucumber-single-thread.json > reports/cucumber-combined.json",
    "generate-report": "ts-node generate-html-report.ts",
    "test:all": "npm run prepare-reports && concurrently \"npm run test:singleThread\" \"npm run test:parallel\" && npm run merge-reports && npm run generate-report"
  }
}
