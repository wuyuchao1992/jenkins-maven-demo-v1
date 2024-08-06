import { setParallelCanAssign } from '@cucumber/cucumber';

setParallelCanAssign((type, scenario) => {
  // 检查 scenario 对象中的 tags 属性是否包含 @singleThread 标签
  const tags = scenario.pickle.tags;
  if (tags.some(tag => tag.name === '@singleThread')) {
    return false; // 如果标记为 @singleThread，则不并行运行
  }
  return true; // 其他情况下并行运行
});
