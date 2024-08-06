// hooks.ts
import { setParallelCanAssign, ITestCaseHookParameter } from '@cucumber/cucumber';

setParallelCanAssign((testCase: ITestCaseHookParameter) => {
  // 检查是否有 @singleThread 标签
  const tags = testCase.pickle.tags.map(tag => tag.name);
  if (tags.includes('@singleThread')) {
    return false; // 禁止并行执行
  }
  return true; // 允许并行执行
});
