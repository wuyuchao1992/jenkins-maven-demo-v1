import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait

// 配置 ChromeOptions，并添加 remote-allow-origins 参数
ChromeOptions options = new ChromeOptions()
options.addArguments("--remote-allow-origins=*")

// 设置 WebDriver 选项（适用于 Chrome）
WDS.browser.manage().window().maximize()
WDS.browser = new ChromeDriver(options)

// 开始采样
WDS.sampleResult.sampleStart()

try {
    // 打开指定的 URL
    WDS.browser.get("https://example.com")

    // 设置显式等待
    WebDriverWait wait = new WebDriverWait(WDS.browser, 10)

    // 查找元素并点击
    WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("example-id")))
    element.click()

    // 获取页面标题并输出
    String title = WDS.browser.getTitle()
    WDS.log.info("页面标题: $title")

    // 进行其他操作，例如填写表单字段
    WebElement inputField = WDS.browser.findElement(By.name("example-name"))
    inputField.sendKeys("Test Input")

    // 提交表单
    WebElement submitButton = WDS.browser.findElement(By.id("submit"))
    submitButton.click()

    // 验证成功信息
    WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("success")))
    WDS.log.info("成功信息: " + successMessage.getText())

    // 设置采样成功状态
    WDS.sampleResult.successful = true
    WDS.sampleResult.responseMessage = "操作成功"
    WDS.sampleResult.responseCode = "200"

} catch (Exception e) {
    // 捕获异常并设置采样失败状态
    WDS.sampleResult.successful = false
    WDS.sampleResult.responseMessage = "操作失败: ${e.message}"
    WDS.sampleResult.responseCode = "500"
    WDS.log.error("错误: ", e)

} finally {
    // 结束采样
    WDS.sampleResult.sampleEnd()
    // WebDriver Sampler 自动管理 driver 的关闭，不需要显式调用 driver.quit()
}