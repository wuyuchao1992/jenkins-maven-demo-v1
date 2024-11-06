<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.3.2</version> 
</dependency>


import io.github.bonigarcia.wdm.WebDriverManager
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions

// 使用 WebDriverManager 自动配置 chromedriver
WDS.sampleResult.sampleStart()
WebDriverManager.chromedriver().setup()

ChromeOptions options = new ChromeOptions()
options.addArguments("--headless") // 在 CI/CD 中运行无界面模式
options.addArguments("--no-sandbox")
options.addArguments("--disable-dev-shm-usage")

WDS.browser = new ChromeDriver(options)
WDS.browser.get("https://example.com")
WDS.sampleResult.sampleEnd()
