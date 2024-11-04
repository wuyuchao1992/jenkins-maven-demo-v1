var chromeOptions = new org.openqa.selenium.chrome.ChromeOptions();
chromeOptions.addArguments("--remote-allow-origins=*"); // 添加参数

var capabilities = org.openqa.selenium.remote.DesiredCapabilities.chrome();
capabilities.setCapability(org.openqa.selenium.chrome.ChromeOptions.CAPABILITY, chromeOptions);

// 启动带有指定参数的 ChromeDriver
WDS.browser = new org.openqa.selenium.chrome.ChromeDriver(capabilities);