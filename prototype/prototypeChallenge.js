// ----- Base product -----

class BaseCar {

  constructor({
    edition,
    model,
    airBags,
    color,
  } = {}) {
    this._edition = edition || '';
    this._model = model || '';
    this._airBags = airBags || 0;
    this._color = color || '';
  }

  set edition(edition) {
    this._edition = edition;
  }

  set model(model) {
    this._model = model;
  }

  set airBags(howMany) {
    this._airBags = howMany;
  }

  set color(color) {
    this._color = color;
  }

  get edition() {
    return this._edition;
  }

  get model() {
    return this._model;
  }

  get airBags() {
    return this._airBags;
  }

  get color() {
    return this._color;
  }

  clone() {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete products -----

class MastodonSedanCar extends BaseCar {

  constructor(carToClone) {
    super({
      edition: carToClone?.edition,
      model: 'sedan',
      airBags: carToClone?.airBags,
      color: carToClone?.color,
    });
  }

  clone() {
    return new MastodonSedanCar(this);
  }
}

class RhinoSedanCar extends BaseCar {
  
  constructor(carToClone) {
    super({
      edition: carToClone?.edition,
      model: 'sedan',
      airBags: carToClone?.airBags,
      color: carToClone?.color,
    });
  }

  clone() {
    return new RhinoSedanCar(this);
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

class RhinoSedanCarFactory extends CarFactory {
  create() {
    return new RhinoSedanCar();
  }
}

// ----- Base builder -----

class CarProductionLine {
 
  setEdition(edition) {
    throw new Error('Method not implemented!');
  }

  
  setAirBags(howMany) {
    throw new Error('Method not implemented!');
  }

  
  setColor(color) {
    throw new Error('Method not implemented!');
  }


  setCarFactory(factory) {
    throw new Error('Method not implemented!');
  }


  resetProductionLine(newCar) {
    throw new Error('Method not implemented!');
  }
}

// ----- Concrete builder -----

class SedanProductionLine extends CarProductionLine {
  
  constructor({ factory }) {
    super();
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  
  setEdition(edition) {
    this.sedanCar.edition = edition;
    return this;
  }

  setAirBags(howMany) {
    this.sedanCar.airBags = howMany;
    return this;
  }

  setColor(color) {
    this.sedanCar.color = color;
    return this;
  }

  setCarFactory(factory) {
    this.carFactory = factory;
    this.resetProductionLine(this.carFactory.create());
  }

  resetProductionLine(car) {
    this.sedanCar = car;
  }

  build() {
    const sedanCar = this.sedanCar;
    this.resetProductionLine(this.carFactory.create());
    return sedanCar;
  }
}

// ----- Director -----

class Director {
 
  setProductionLine(productionLine) {
    this.productionLine = productionLine;
  }

  setProductionLineCarFactory(carFactory) {
    this.productionLine.setCarFactory(carFactory);
  }

  constructCvtEdition() {
    this.productionLine.setAirBags(4).setColor('red').setEdition('cvt');
  }

  constructSignatureEdition() {
    this.productionLine
      .setAirBags(8)
      .setColor('gray')
      .setEdition('signature');
  }
}

/**
 * Main function
 */
function appPrototype(director) {
  console.log('--- [JS] Calling appPrototype ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  const sedanProductionLine = new SedanProductionLine({
    factory: new MastodonSedanCarFactory(),
  });

  director.setProductionLine(sedanProductionLine);

  director.constructCvtEdition();
  const mastodonSedanCvt = sedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  const mastodonSedanCvtClone = mastodonSedanCvt.clone();
  console.log('\n--- Mastodon Sedan CVT Clone ---\n');
  console.log(mastodonSedanCvtClone);

  /**
   * 1. We update the car factory to use Rhino cars factory
   * 2. Create Rhino cars and clone them
   * */
  director.setProductionLineCarFactory(new RhinoSedanCarFactory());
  director.constructCvtEdition();
  const rhinoSedanCvt = sedanProductionLine.build();
  console.log('\n--- Rhino Sedan CVT ---\n');
  console.log(rhinoSedanCvt);

  const rhinoSedanCvtClone = rhinoSedanCvt.clone();
  console.log('\n--- Rhino Sedan CVT Clone ---\n');
  console.log(rhinoSedanCvtClone);
}

appPrototype(new Director());