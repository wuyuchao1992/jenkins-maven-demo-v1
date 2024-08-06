import { setWorldConstructor, Before, After } from '@cucumber/cucumber';
import { IWorldOptions } from '@cucumber/cucumber/lib/support_code_library_builder/world';

class CustomWorld {
  attach: any;
  parameters: any;
  isSingleThread: boolean;

  constructor({ attach, parameters }: IWorldOptions) {
    this.attach = attach;
    this.parameters = parameters;
    this.isSingleThread = false;
  }

  setSingleThread(value: boolean) {
    this.isSingleThread = value;
  }
}

setWorldConstructor(CustomWorld);

Before('@single-thread', function () {
  this.setSingleThread(true);
});

After('@single-thread', function () {
  this.setSingleThread(false);
});
