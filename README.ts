import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { IWorldOptions, World } from '@cucumber/cucumber';

class CustomWorld extends World {
  attach: any;
  parameters: any;
  isSingleThread: boolean;

  constructor(options: IWorldOptions) {
    super(options);
    this.attach = options.attach;
    this.parameters = options.parameters;
    this.isSingleThread = false;
  }

  setSingleThread(value: boolean) {
    this.isSingleThread = value;
  }
}

setWorldConstructor(CustomWorld);

Before({ tags: '@single-thread' }, function () {
  (this as CustomWorld).setSingleThread(true);
});

After({ tags: '@single-thread' }, function () {
  (this as CustomWorld).setSingleThread(false);
});
