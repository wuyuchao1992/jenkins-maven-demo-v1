npm install multiple-cucumber-html-reporter cucumber-json-merge concurrently --save-dev

module.exports = {
  default: {
    format: ['pretty', 'json:reports/cucumber-parallel.json'],
    require: ['features/**/*.ts'],
    tags: 'not @singleThread',
    parallel: 6
  },
  singleThread: {
    format: ['pretty', 'json:reports/cucumber-single-thread.json'],
    require: ['features/**/*.ts'],
    tags: '@singleThread',
    parallel: 1
  }
};


{
  "scripts": {
    "prepare-reports": "mkdir -p reports",
    "test:parallel": "cucumber-js",
    "test:singleThread": "cucumber-js --profile singleThread",
    "merge-reports": "cucumber-json-merge reports/cucumber-*.json > reports/cucumber-combined.json",
    "generate-report": "npx multiple-cucumber-html-reporter --report-dir reports/html --json-dir reports",
    "test:all": "npm run prepare-reports && concurrently \"npm run test:singleThread\" \"npm run test:parallel\" && npm run merge-reports && npm run generate-report"
  }
}
