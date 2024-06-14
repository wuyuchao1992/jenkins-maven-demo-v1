import { runWithContext } from '../context';

export function withContext(stepFunction: () => void | Promise<void>) {
  return function (...args: any[]) {
    return runWithContext(() => stepFunction.apply(this, args));
  };
}
