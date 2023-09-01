class Singleton {
  static instance = undefined;

  constructor(version){
    this.version = version;
  }

  static getInstance(){
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

function appSingleton() {
  const singletonTestOne = Singleton.getInstance("Version-1")
  const singletonTestTwo = Singleton.getInstance("Version-2")

  console.log(singletonTestOne === singletonTestTwo);
}

appSingleton();