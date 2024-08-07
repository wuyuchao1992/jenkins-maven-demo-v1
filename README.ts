import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';

// Set default timeout to a reasonable value
setDefaultTimeout(60000); // Example: 60 seconds

Before(function (scenario) {
  if (scenario.sourceLocation.uri.includes('@single-thread')) {
    // If the scenario belongs to a single-threaded feature
    process.env.CUCUMBER_PARALLEL = '1'; // Set environment variable for single-threaded
  } else {
    // Set the parallel count for other scenarios
    process.env.CUCUMBER_PARALLEL = '6'; // Example: 6 parallel threads
  }
});

After(function () {
  // Clean up or reset any settings if needed
});
