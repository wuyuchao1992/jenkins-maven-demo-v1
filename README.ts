{
  "scripts": {
    "test:singleThread": "cucumber-js --profile singleThread",
    "test:parallel": "cucumber-js --profile default",
    "merge-reports": "npx cucumber-json-merge reports/cucumber-single-thread.json reports/cucumber-parallel.json > reports/cucumber-combined.json",
    "generate-html-report": "npx multiple-cucumber-html-reporter --report-dir report --json-dir reports",
    "test:all": "npm run prepare-reports && npm run test:singleThread && npm run test:parallel && npm run merge-reports && npm run generate-html-report"
  }
}
