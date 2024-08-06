import { setParallelCanAssign } from '@cucumber/cucumber';

setParallelCanAssign((type, scenario) => {
  // 检查场景是否标记为单线程
  if (scenario.tags.find(tag => tag.name === '@singleThread')) {
    return false; // 如果标记为@singleThread，则不并行运行
  }
  return true; // 其他情况下并行运行
});
