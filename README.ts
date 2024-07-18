    args: [
      '--disable-dev-shm-usage',
      '--disable-background-timer-throttling',
      '--no-sandbox', // 可选项，如果在 CI/CD 环境中运行
    ]
  });
