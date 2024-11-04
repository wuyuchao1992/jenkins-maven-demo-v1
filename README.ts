import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.apache.jmeter.samplers.SampleResult;

public class JMeterWebDriverScript {

    public void execute() {
        // 获取当前 SampleResult 对象
        SampleResult result = new SampleResult();

        // 配置 ChromeOptions
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");

        // 设置 WebDriver，并传入选项
        WebDriver driver = new ChromeDriver(options);

        try {
            // 记录采样的开始时间
            result.sampleStart();

            // 打开网址
            driver.get("https://example.com");

            // 设置等待
            WebDriverWait wait = new WebDriverWait(driver, 10);

            // 查找元素并点击
            WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("example-id")));
            element.click();

            // 获取页面标题
            String title = driver.getTitle();
            System.out.println("页面标题: " + title);

            // 执行其他操作，例如填写表单字段
            WebElement inputField = driver.findElement(By.name("example-name"));
            inputField.sendKeys("Test Input");

            // 提交表单
            WebElement submitButton = driver.findElement(By.id("submit"));
            submitButton.click();

            // 验证成功信息出现
            WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("success")));
            System.out.println("成功信息: " + successMessage.getText());

            // 记录采样成功
            result.setSuccessful(true);
            result.setResponseMessage("操作成功");
            result.setResponseCodeOK();

        } catch (Exception e) {
            // 记录采样失败
            result.setSuccessful(false);
            result.setResponseMessage("操作失败: " + e.getMessage());
            result.setResponseCode("500");
            e.printStackTrace();

        } finally {
            // 记录采样的结束时间
            result.sampleEnd();

            // 关闭浏览器
            driver.quit();
        }
    }
}