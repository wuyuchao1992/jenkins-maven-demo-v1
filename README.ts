import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

export async function runWithContext<T>(callback: () => Promise<T> | T): Promise<T> {
  const store = new Map<string, any>();
  return asyncLocalStorage.run(store, async () => {
    return await callback();
  });
}

export function setContextValue(key: string, value: any): void {
  const store = asyncLocalStorage.getStore();
  if (store) {
    store.set(key, value);
  } else {
    throw new Error('Context not initialized. Use runWithContext() to initialize the context.');
  }
}

export function getContextValue(key: string): any {
  const store = asyncLocalStorage.getStore();
  if (store) {
    return store.get(key);
  } else {
    throw new Error('Context not initialized. Use runWithContext() to initialize the context.');
  }
}

export function deleteContextValue(key: string): void {
  const store = asyncLocalStorage.getStore();
  if (store) {
    store.delete(key);
  } else {
    throw new Error('Context not initialized. Use runWithContext() to initialize the context.');
  }
}

export function clearContext(): void {
  const store = asyncLocalStorage.getStore();
  if (store) {
    store.clear();
  }
}
