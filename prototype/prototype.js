/**
 * How to implement Prototype?
 *
 * 1. Declare a base class/interface prototype that contains
 *  clone methods.
 *
 *  If the base prototype is a class could be an abstract one
 *  to maintain some basic behavior and implement the clone
 *  method in the sub class.
 *
 *  Base prototype:
 *    - BaseCar
 *
 * 2. Create concrete products who inherits/implements from
 *  prototype class and override clone method functionality.
 *
 *  Concrete products:
 *    - MastodonSedanCar
 *
 * Notes:
 *  The code of this file has some modifications with the version showed
 *  during the course.
 *
 *  Change 1: Renamed Car class name to BaseCar.
 *
 *  Change 2: Renamed MastodonSedanCar class name to MastodonSedanCar.
 *
 *  Change 3: Change return types of functions defined in CarProductionLine
 *  to return the actual instance to chain methods as we did in builder.ts.
 *
 *  Change 4: Change the way we define default values for params passed
 *  to BaseCar constructor.
 *
 *  Change 5: Rename Factory interface to CarFactory
 *
 */

// STEP 1
class BaseCar {

  constructor({
    edition = '',
    model = '',
    airBags = 0,
    color = '',
  } = {}) {
    this._edition = edition;
    this._model = model;
    this._airBags = airBags;
    this._color = color;
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

// STEP 2
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

// ------ [BEGIN] Use of Factory Method pattern ------

class CarFactory {
  create() {
    throw new Error('Method not implemented!');
  }
}

class MastodonSedanCarFactory extends CarFactory {
  create() {
    return new MastodonSedanCar();
  }
}

// ------ [END] Use of Factory Method pattern ------

// ------ [BEGIN] Builder pattern similar code ------

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

  resetProductionLine(newCar) {
    throw new Error('Method not implemented!');
  }
}

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

class Director {

  setProductionLine(productionLine) {
    this.productionLine = productionLine;
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

// ------ [END] Builder pattern similar code ------


function appPrototype(director) {
  console.log('--- [JS] Calling appPrototype ---\n');

  if (!director) {
    console.log('--- No director provided ---');
    return;
  }

  const mastodonSedanProductionLine = new SedanProductionLine({
    factory: new MastodonSedanCarFactory(),
  });

  director.setProductionLine(mastodonSedanProductionLine);

  director.constructCvtEdition();
  const mastodonSedanCvt = mastodonSedanProductionLine.build();
  console.log('--- Mastodon Sedan CVT ---\n');
  console.log(mastodonSedanCvt);

  const mastodonSedanCvtClone = mastodonSedanCvt.clone();
  console.log('\n--- Mastodon Sedan CVT Clone ---\n');
  console.log(mastodonSedanCvtClone);

  director.constructSignatureEdition();
  const mastodonSedanSignature = mastodonSedanProductionLine.build();
  console.log('\n--- Mastodon Sedan Signature ---\n');
  console.log(mastodonSedanSignature);

  const mastodonSedanSignatureClone = mastodonSedanSignature.clone();
  console.log('\n--- Mastodon Sedan Signature Clone ---\n');
  console.log(mastodonSedanSignatureClone);
}

appPrototype(new Director());