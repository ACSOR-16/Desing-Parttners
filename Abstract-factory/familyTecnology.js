// BASES PRODUCT
class CPU {
  setSeries(series){
    throw new Error("This method is not implement")
  }
}

class Memory {
  setCapacityInGB(capacity){
    throw new Error("This method is not implement")
  }
}

class Display {
  setResolution(){
    throw new Error("This method is not implement")
  }
  
}

//FAMILIES
class MobileCPU extends CPU{
  setSeries(series){
    console.log(`[MOBILE] ${series}`);
  }
}
class LaptopCPU extends CPU{
  setSeries(series){
    console.log(`[LAPTOP] ${series}`);
  }
}


class MobileMemory extends Memory{
  setCapacityInGB(capacity){
    console.log(`[MOBILE] ${capacity}GB`);
  }
}
class LaptopMemory extends Memory{
  setCapacityInGB(capacity){
    console.log(`[LAPTOP] ${capacity}GB`);
  }
}

class PhoneDisplay extends Display{
  setResolution(){
    console.log("[PHONE] 2340x1080");
  }
}
class TabletDisplay extends Display{
  setResolution(){
    console.log("[TABLET] 2048x1536");
  }
}
class LaptopDisplay extends Display{
  setResolution(){
  console.log("[LAPTOP] 2560X1600");    
  }
}

//ABSTRACT FACTORY
class DeviceFactory{
  createCPU(){
    throw new Error('Method is no implemented')
  }  

  createMemory(){
    throw new Error('Method is no implemented')
  }

  createDisplay(){
    throw new Error('Method is no implemented')
  }  
}

// CONCRETE FACTORIES
class PhoneDeviceFactory extends DeviceFactory{
  createCPU(){
    return new MobileCPU();
  }
  createMemory(){
    return new MobileMemory();
  }
  createDisplay(){
    return new PhoneDisplay();
  }
}
class TabletDeviceFactory extends DeviceFactory{
  createCPU(){
    return new MobileCPU();
  }
  createMemory(){
    return new MobileMemory();
  }
  createDisplay(){
    return new TabletDisplay();
  }
}
class LaptopDeviceFactory extends DeviceFactory{
  createCPU(){
    return new LaptopCPU();
  }
  createMemory(){
    return new LaptopMemory();
  }
  createDisplay(){
    return new LaptopDisplay();
  }
}

function createFactory(type) {
  const factories = {
    phone: PhoneDeviceFactory,
    tablet: TabletDeviceFactory,
    laptop: LaptopDeviceFactory,
  };

  const Factory = factories[type];
  return new Factory();
}

function appAbstractFactory({ factory, isMobileFactory = true }) {
  console.log('\n--- [JS] Calling appAbstractFactory ---\n');
  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }

  const cpu = factory.createCPU();
  const memory = factory.createMemory();
  const display = factory.createDisplay();

  cpu.setSeries(isMobileFactory ? 'MB001' : 'LP001');
  memory.setCapacityInGB(isMobileFactory ? 16 : 32);
  display.setResolution();
}

appAbstractFactory({
  factory: createFactory('phone'),
});
appAbstractFactory({
  factory: createFactory('tablet'),
});
appAbstractFactory({
  factory: createFactory('laptop'),
  isMobileFactory: false,
});