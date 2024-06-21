function getRandomDateThisYear(): Date {
  const now = new Date();
  const year = now.getFullYear();

  // 获取当年的第一天和最后一天
  const firstDayOfYear = new Date(year, 0, 1);
  const lastDayOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

  // 生成当年的一个随机日期
  const randomTime = firstDayOfYear.getTime() + Math.random() * (lastDayOfYear.getTime() - firstDayOfYear.getTime());
  return new Date(randomTime);
}

// 使用示例
const randomDate = getRandomDateThisYear();
console.log(randomDate);
