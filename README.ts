import { BeforeAll, AfterAll, setDefaultTimeout } from 'cucumber';
import { browser } from 'playwright';

let isSingleThreadRunning = false;
let waitingQueue: (() => void)[] = [];

BeforeAll({ tags: '@singleThread' }, async function () {
  if (isSingleThreadRunning) {
    await new Promise<void>(resolve => waitingQueue.push(resolve));
  } else {
    isSingleThreadRunning = true;
  }
});

AfterAll({ tags: '@singleThread' }, async function () {
  isSingleThreadRunning = false;
  if (waitingQueue.length > 0) {
    const next = waitingQueue.shift();
    if (next) next();
  }
});
