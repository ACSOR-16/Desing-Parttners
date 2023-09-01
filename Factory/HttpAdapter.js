//class principal
class HttpAdapter{
  constructor(type){
    this._type = type;
  }

  get(){
    throw new Error("It's get")
  }

  post(){
    throw new Error("It's post")
  }

  put(){
    throw new Error("It's put")
  }

  delete(){
    throw new Error("It's delete")
  }

  get type(){
    return this._type;
  }
}

// concrete product
class RestHttpAdapter extends HttpAdapter{
  constructor (){
    super("REST")
  }

  get(){
    console.log(this._type + " get Method")
  }

  post(){
    console.log(this._type + " post Method")
  }

  put(){
    console.log(this._type + " put Method")
  }

  delete(){
    console.log(this._type + " delete Method")
  }
}

// Base factory
class HttpAdapterFactory{
  makeAdapter(){
    throw new Error("Method is not implement")
  }
}

// concrete factory
class RestHttpAdapterFactory extends HttpAdapterFactory{
  makeAdapter(){
    return new RestHttpAdapter();
  }
}

function appFactory(factory) {
  console.log('--- [JS] Calling appFactory ---\n');

  if (!factory) {
    console.log('--- No factory provided ---');
    return;
  }

  const adapter = factory.makeAdapter();
  console.log(`Http Adapter is ${adapter.type}\n`);
  adapter.get();
  adapter.post();
  adapter.put();
  adapter.delete();
}

/**
 * You could change the Factory as you wish since
 * all of them implement the same be haviour.
 */
appFactory(new RestHttpAdapterFactory());