// 在 TypeScript 文件顶部添加这个声明
declare module 'multiple-cucumber-html-reporter';

// 然后再导入模块
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


declare module 'multiple-cucumber-html-reporter' {
  interface Metadata {
    browser: { name: string; version: string };
    device: string;
    platform: { name: string; version: string };
  }

  interface CustomData {
    title: string;
    data: { label: string; value: string }[];
  }

  interface ReportOptions {
    jsonDir: string;
    reportPath: string;
    metadata: Metadata;
    customData?: CustomData;
  }

  export function generate(options: ReportOptions): void;
}


// @ts-ignore

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
