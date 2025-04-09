// 点击复制按钮后，等待文本被选中
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(d -> !((JavascriptExecutor) d)
    .executeScript("return window.getSelection().toString();")
    .toString().isEmpty()
);

// 获取选中文本
String copiedText = (String) ((JavascriptExecutor) driver)
    .executeScript("return window.getSelection().toString();");