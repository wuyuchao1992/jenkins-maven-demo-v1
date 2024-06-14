import { runWithContext } from '../context';

export function withContext<T extends (...args: any[]) => any>(stepFunction: T): T {
  return function (this: any, ...args: any[]) {
    return runWithContext(() => stepFunction.apply(this, args));
  } as T;
}
