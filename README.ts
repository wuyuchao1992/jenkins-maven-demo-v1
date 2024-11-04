import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait

// 配置 WebDriver
// 可以选择 FirefoxDriver 或 ChromeDriver，根据需求调整
WebDriver driver = new ChromeDriver() // 或 FirefoxDriver()

try {
    // 设置等待时间
    WebDriverWait wait = new WebDriverWait(driver, 10)

    // 打开网址
    driver.get("https://example.com")

    // 查找元素并进行操作
    WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("example-id")))
    element.click()

    // 获取页面标题
    String title = driver.getTitle()
    log.info("页面标题: " + title)

    // 执行其他操作
    WebElement inputField = driver.findElement(By.name("example-name"))
    inputField.sendKeys("Test Input")

    // 提交表单
    WebElement submitButton = driver.findElement(By.id("submit"))
    submitButton.click()
    
    // 验证某个元素是否出现
    WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("success")))
    log.info("成功信息: " + successMessage.getText())

} finally {
    // 关闭浏览器
    driver.quit()
}