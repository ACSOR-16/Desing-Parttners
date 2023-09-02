//
class MastodonCar{
  useGPS(){
    throw new Error("Method is not implement")
  } 
}

class RhinoCar{
  useGPS(){
    throw new Error("Method is not implement")
  } 
}

// 
class MastodonSendCar extends MastodonCar{

  useGPS(){
    console.log("[SEDAN] Mastodon GPS");
  }
}

class MastodonHatchbackCar extends MastodonCar{

  useGPS(){
    console.log("[HATCHBACK] Mastodon GPS");
  }
}

class RhinoSendCar extends RhinoCar{

  useGPS(){
    console.log("[SEDAN] Rhino GPS");
  }
}

class RhinoHatchbackCar extends RhinoCar{

  useGPS(){
    console.log("[HATCHBACK] Rhino GPS");
  }
}

//
class CarAbstractFactory{
  createMastodon(){
    throw new Error("Method is no implemented abstract")
  }

  createRhino(){
    throw new Error("Method is no implemented abstract")
  }
}

//
class SedanCarFactory{
  createMastodon(){
    return new MastodonSendCar();
  }

  createRhino(){
    return new RhinoSendCar();
  }
}

class HatchbackCarFactory{
  createMastodon(){
    return new MastodonHatchbackCar();
  }

  createRhino(){
    return new RhinoHatchbackCar();
  }
}

function appCarFactory(factory) {
  const mastodon = factory.createMastodon();
  const rhino = factory.createRhino();

  mastodon.useGPS();
  rhino.useGPS();
}

function createFactory(type){
  const factories = {
    sedan: SedanCarFactory,
    hatchback: HatchbackCarFactory,
  }

  const Factory = factories[type];
  return new Factory();
}

appCarFactory(new HatchbackCarFactory());
appCarFactory(new SedanCarFactory());

appCarFactory(createFactory('hatchback'));
appCarFactory(createFactory('sedan'));