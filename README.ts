function getRandomFormattedDateThisYear(): string {
  const now = new Date();
  const year = now.getFullYear();

  // 获取当年的第一天和最后一天
  const firstDayOfYear = new Date(year, 0, 1);
  const lastDayOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

  // 生成当年的一个随机日期
  const randomTime = firstDayOfYear.getTime() + Math.random() * (lastDayOfYear.getTime() - firstDayOfYear.getTime());
  const randomDate = new Date(randomTime);

  // 格式化日期为YYYYMMDD
  const yearStr = randomDate.getFullYear();
  const monthStr = String(randomDate.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
  const dayStr = String(randomDate.getDate()).padStart(2, '0');

  return `${yearStr}${monthStr}${dayStr}`;
}

// 使用示例并打印结果
const randomFormattedDate = getRandomFormattedDateThisYear();
console.log(`随机日期: ${randomFormattedDate}`);
