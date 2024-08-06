import { Before, After } from 'cucumber';
import { browser } from 'playwright';

let singleThreadFeatureRunning = false;

Before({ tags: '@singleThread' }, async function () {
  // 假设只有一个浏览器实例在跑单线程的feature
  if (singleThreadFeatureRunning) {
    // 阻塞其他的feature，直到单线程的feature完成
    await new Promise(resolve => {
      const check = setInterval(() => {
        if (!singleThreadFeatureRunning) {
          clearInterval(check);
          resolve(true);
        }
      }, 100);
    });
  } else {
    singleThreadFeatureRunning = true;
  }
});

After({ tags: '@singleThread' }, async function () {
  singleThreadFeatureRunning = false;
});
