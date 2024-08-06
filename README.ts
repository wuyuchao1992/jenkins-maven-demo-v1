const { Before, After, setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
    this.isSingleThread = false;
  }

  setSingleThread(value) {
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
