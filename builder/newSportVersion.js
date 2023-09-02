// ----- Builder -----
class CarProductionLine {
  constructor({ factory }) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  setAirBags(howMany) {
    this.car.airBags = howMany;
    return this;
  }

  setColor(color) {
    this.car.color = color;
    return this;
  }

  setEdition(edition) {
    this.car.edition = edition;
    return this;
  }

  resetProductionLine(car) {
    this.car = car;
  }

  build() {
    const car = this.car;
    this.resetProductionLine(this.carFactory.create());
    return car;
  }
}

// ----- Concrete Builders -----

class SedanProductionLine extends CarProductionLine {}
class HatchbackProductionLine extends CarProductionLine {}

// ----- Base Product -----

class BaseCar {
  constructor() {
    this._edition = '';
    this._model = '';
    this._airBags = 2;
    this._color = 'black';
  }

  set airBags(howMany) {
    this._airBags = howMany;
  }

  set color(color) {
    this._color = color;
  }

  set edition(edition) {
    this._edition = edition;
  }

  set model(model) {
    this._model = model;
  }
}

// ----- Concrete products -----

class MastodonSedanCar extends BaseCar {
  constructor() {
    super();
    this.model = 'sedan';
  }
}

class MastodonHatchbackCar extends BaseCar {
  constructor() {
    super();
    this.model = 'hatchback';
  }
}

// ----- Base factory -----

class CarFactory {
  create() {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete factories -----

class MastodonSedanCarFactory extends CarFactory {
  create() {
    return new MastodonSedanCar();
  }
}
class MastodonHatchbackCarFactory extends CarFactory {
  create() {
    return new MastodonHatchbackCar();
  }
}

// ----- Director -----

class Director {
  setProductionLine(productionLine) {
    this._productionLine = productionLine;
  }

  get productionLine() {
    return this._productionLine;
  }

  constructCvtEdition() {
    this.productionLine
      .setAirBags(4)
      .setColor('blue')
      .setEdition('cvt');
  }

  constructSignatureEdition() {
    this.productionLine
      .setAirBags(8)
      .setColor('red')
      .setEdition('signature');
  }

  constructSportEdition() {
    this.productionLine
      .setAirBags(4)
      .setColor('gray')
      .setEdition('sport');
  }
}

/**
 * Main function
 */
function appBuilder(director) {
  console.log('--- [JS] Calling appBuilder ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  // Sedan production line
  director.setProductionLine(
    new SedanProductionLine({
      factory: new MastodonSedanCarFactory(),
    })
  );

  director.constructCvtEdition();
  const mastodonSedanCvt = director.productionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  director.constructSignatureEdition();
  const mastodonSedanSignature = director.productionLine.build();
  console.log('\n--- Mastodon Sedan Signature ---\n');
  console.log(mastodonSedanSignature);

  // Hatchback production line
  director.setProductionLine(
    new HatchbackProductionLine({
      factory: new MastodonHatchbackCarFactory(),
    })
  );

  director.constructCvtEdition();
  const mastodonHatchbackCvt = director.productionLine.build();
  console.log('\n--- Mastodon Hatchback CVT ---\n');
  console.log(mastodonHatchbackCvt);

  director.constructSignatureEdition();
  const mastodonHatchbackSignature = director.productionLine.build();
  console.log('\n--- Mastodon Hatchback Signature ---\n');
  console.log(mastodonHatchbackSignature);

  // Build sport edition
  director.constructSportEdition();
  const mastodonHatchbackSport = director.productionLine.build();
  console.log('\n--- Mastodon Hatchback Sport ---\n');
  console.log(mastodonHatchbackSport);
}

appBuilder(new Director());