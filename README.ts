npm install cucumber-html-reports --save-dev

{
  "scripts": {
    "prepare-reports": "mkdir -p reports",
    "test:parallel": "cucumber-js",
    "test:singleThread": "cucumber-js --profile singleThread",
    "merge-reports": "cucumber-json-merge reports/cucumber-parallel.json reports/cucumber-single-thread.json > reports/cucumber-combined.json",
    "generate-report": "cucumber-html-reports --jsonFile=reports/cucumber-combined.json --output=reports/html",
    "test:all": "npm run prepare-reports && concurrently \"npm run test:singleThread\" \"npm run test:parallel\" && npm run merge-reports && npm run generate-report"
  }
}

npm install cucumberjs-json2html-reporter --save-dev
{
  "scripts": {
    "prepare-reports": "mkdir -p reports",
    "test:parallel": "cucumber-js",
    "test:singleThread": "cucumber-js --profile singleThread",
    "merge-reports": "cucumber-json-merge reports/cucumber-parallel.json reports/cucumber-single-thread.json > reports/cucumber-combined.json",
    "generate-report": "cucumberjs-json2html-reporter --input reports/cucumber-combined.json --output reports/html/cucumber-report.html",
    "test:all": "npm run prepare-reports && concurrently \"npm run test:singleThread\" \"npm run test:parallel\" && npm run merge-reports && npm run generate-report"
  }
}
