class Product{
  constructor(name, id, cost){
    this.name = name;
    this.id = id;
    this.cost = cost;
  }

  getName(){
    return this.name;
  }

  setName(name){
    this.name = name;
  }

  getId(){
    return this.id;
  }

  getCost(){
    return this.cost;
  }
}

class ShoppingCar{
  static instance = undefined;

  constructor(){
    this.products = [];
  }

  getProducts(){
    return this.products;
  }

  add(product){
    this.products.push(product);
  }

  deleteById(id){
    this.products = this.products.filter( product => product.id !== id);
  }

  static getInstance(){
    if (!ShoppingCar.instance) {
      ShoppingCar.instance = new ShoppingCar();
    }
    return ShoppingCar.instance;
  }
}

function ClientApp(){
  const car = ShoppingCar.getInstance();
  const glasses = new Product("glasses", 112, 20);
  const shoes = new Product('shoes', 2166, 250)
  console.log(glasses.getName(), glasses.getCost(), glasses.getId());
  // adding products to the ShoppingCar. 
  console.log(car);
  car.add(glasses);
  console.log('adding glasses to the car', car.getProducts());

  // checking that the car is by myself
  const car2 = ShoppingCar.getInstance();
  car2.add(shoes);
  console.log('testing that car has products', car2.getProducts());

  // delete product both cars. 
  car.deleteById(112);
  console.log('delete glasses of the cart', car.getProducts(), car2.getProducts());
}

ClientApp();