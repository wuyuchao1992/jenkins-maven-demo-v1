import org.openqa.selenium.By

def driver = WDS.browser

// Locate the element and get its text
def element = driver.findElement(By.xpath("//elementXPath"))
def actualText = element.getText()

// Perform the assertion
def expectedText = "Expected Text"
assert actualText.contains(expectedText) : "Text does not match: expected '${expectedText}', but found '${actualText}'"