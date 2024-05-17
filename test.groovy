// 生成0到1之间的随机数
double randomNumber = Math.random()

// 保留两位小数
randomNumber = Math.round(randomNumber * 100.0) / 100.0

// 将随机数存储到JMeter变量中
vars.put("randomNumber", String.format("%.2f", randomNumber))

// 打印日志以供调试
log.info("Generated random number: " + randomNumber)
