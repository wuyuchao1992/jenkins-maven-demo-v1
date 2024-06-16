import { setWorldConstructor, World } from '@cucumber/cucumber';

interface CustomWorld extends World {
  dataCenter: Map<string, any>;
}

class CustomWorldImpl implements CustomWorld {
  dataCenter: Map<string, any>;

  constructor() {
    this.dataCenter = new Map();
  }

  attach: World['attach'];
  log: World['log'];
  parameters: World['parameters'];
}

setWorldConstructor(CustomWorldImpl);
