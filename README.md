import java.time.LocalDate
import java.time.format.DateTimeFormatter

// 定义最小日期和最大日期
def minDateString = '20240101'
def maxDateString = '20240110'

// 初始化日期格式
def formatter = DateTimeFormatter.ofPattern('yyyyMMdd')

// 获取或初始化当前日期
def currentDateStr = vars.get('currentDate')
if (currentDateStr == null) {
    currentDateStr = minDateString
}

// 定义一个方法来递增日期
def incrementDate(String dateStr, DateTimeFormatter formatter, String minDateString, String maxDateString) {
    LocalDate currentDate = LocalDate.parse(dateStr, formatter)
    LocalDate maxDate = LocalDate.parse(maxDateString, formatter)
    LocalDate minDate = LocalDate.parse(minDateString, formatter)

    // 增加一天
    currentDate = currentDate.plusDays(1)

    // 如果增加后的日期大于最大日期，则重新初始化为最小日期
    if (currentDate.isAfter(maxDate)) {
        currentDate = minDate
    }

    return currentDate.format(formatter)
}

// 增加一天并更新变量
def newDateStr = incrementDate(currentDateStr, formatter, minDateString, maxDateString)
vars.put('currentDate', newDateStr)

// 打印新的日期以便在日志中查看
log.info('Updated Date: ' + newDateStr)

// 将新的日期设置为请求的一个参数
vars.put('requestDate', newDateStr)
