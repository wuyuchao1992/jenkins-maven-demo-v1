 args: [
      '--disable-extensions',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--single-process',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--no-zygote',
      '--disable-default-apps',
      '--disable-webgl',
      '--disable-notifications',
      '--disable-background-networking',
      '--max-old-space-size=4096', // 增加内存限制
      '--disable-gpu-compositing',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-plugins'
    ]
