//  Declare a base product class/interface
class BaseCar{
  showCost(){
    throw new Error("Method is not implemented");
  }
}

// implement concrete products sub Classes that inherits/implements 
class MastodonCar extends BaseCar{
  showCost(){
    console.log("Mastodon car cost: S/ 50 000.00");
  }
}

class RhinoCar extends BaseCar{
  showCost(){
    console.log("Rhino car cost: S/ 45 0000.00");
  }
}

// declare a base FACTORY CLASS/INTERFACE that returns objects that mach 
// the base Product
class carFactory{
  makeCar(){
    throw new Error("Method is no implemented!")
  }
}

// implements concrete FACTORY CLASS/INTERFACE that inherits/implements
// the base factory
class MastodonCarFactory extends MastodonCar{
  makeCar(){
    return new MastodonCar();    
  }
}

class RhinoCarFactory extends RhinoCar{
  makeCar(){
    return new RhinoCar();      
  }
}

function appFactory(factory) {
  const car = factory.makeCar();
  car.showCost();
}

function createFactory(type) {
  const factories = {
    mastodon: MastodonCarFactory,
    rhino: RhinoCarFactory
  };

  const Factory = factories[type];
  return new Factory();
}

appFactory(createFactory('rhino'));
appFactory(createFactory('mastodon'));