// 点击复制按钮
driver.findElement(By.id("copy-button")).click();

// 获取选中的文本
String copiedText = (String) ((JavascriptExecutor) driver)
    .executeScript("return window.getSelection().toString();");

Assert.assertEquals("预期文本", copiedText);