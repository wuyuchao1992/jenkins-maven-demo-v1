import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.apache.poi.ss.usermodel.Sheet

// Configure file size (in MB)
int sizeInMB = 5 // Change to the desired size

// Convert size to bytes
int sizeInBytes = sizeInMB * 1024 * 1024

// Specify the file path
String filePath = "testFile.xlsx" // File name, can be customized

// Create a new workbook and sheet
XSSFWorkbook workbook = new XSSFWorkbook()
Sheet sheet = workbook.createSheet("Sheet1")

// Fill the sheet with data until the specified size is reached
int rowCount = 0
while (true) {
    def row = sheet.createRow(rowCount++)
    for (int col = 0; col < 10; col++) {
        row.createCell(col).setCellValue("Sample Data")
    }
    // Check the file size
    ByteArrayOutputStream baos = new ByteArrayOutputStream()
    workbook.write(baos)
    if (baos.size() >= sizeInBytes) {
        baos.close()
        break
    }
    baos.close()
}

// Write the data to the file
FileOutputStream fos = new FileOutputStream(filePath)
workbook.write(fos)
fos.close()
workbook.close()

log.info("Excel file of size ${sizeInMB}MB generated at: ${filePath}")