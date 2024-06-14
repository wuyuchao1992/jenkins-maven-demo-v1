import { AsyncLocalStorage } from 'async_hooks';

class Context {
  private static instance: Context;
  private asyncLocalStorage: AsyncLocalStorage<Map<string, any>>;

  private constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage();
  }

  public static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  public run<T>(callback: () => T): T {
    const store = new Map<string, any>();
    return this.asyncLocalStorage.run(store, callback);
  }

  public set(key: string, value: any): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    } else {
      throw new Error('Context not initialized. Use run() to initialize the context.');
    }
  }

  public get(key: string): any {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(key);
    } else {
      throw new Error('Context not initialized. Use run() to initialize the context.');
    }
  }

  public delete(key: string): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.delete(key);
    } else {
      throw new Error('Context not initialized. Use run() to initialize the context.');
    }
  }
}

export default Context;
