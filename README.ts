{
  "scripts": {
    "test:parallel": "cucumber-js",
    "test:singleThread": "cucumber-js --profile singleThread",
    "merge-reports": "cucumber-json-merge reports/cucumber-*.json > reports/cucumber-combined.json",
    "test:all": "concurrently \"npm run test:singleThread\" \"npm run test:parallel\" && npm run merge-reports"
  }
}
