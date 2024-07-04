import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebDriver;

ChromeOptions options = new ChromeOptions();
options.addArguments("headless");
options.addArguments("disable-gpu");
options.addArguments("window-size=1920,1080");

WDS.browser = new ChromeDriver(options);

// 你的测试代码
WDS.browser.get("https://example.com");
WDS.log.info("Page title is: " + WDS.browser.getTitle());
