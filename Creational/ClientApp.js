class Product{
  constructor(id, name, cost){
    this._name = name;
    this._id = id;
    this._cost = cost;
  }

  get name(){
    return this._name;
  }

  set name(name){
    this._name = name;
  }

  get id(){
    return this._id;
  }

  set id(id){
    this._id = id;
  }

  get cost(){
    return this._cost;
  }

  set cost(cost){
    this._cost = cost;
  }
}

class ShoppingCar{
  static _instance = undefined;

  constructor(){
    this._products = [];
  }

  static getInstance(){
    if (!ShoppingCar._instance) {
      ShoppingCar._instance = new ShoppingCar();
    }
    return ShoppingCar._instance;
  }

  get products(){
    return this._products;
  }
  

  add(product){
    this._products.push(product);
  }

  deleteById(id) {
    this._products = this._products.filter( product => product.id !== id);
  }
}

function appSingleton() {
  // Create new shopping car
  const shoppingCar = ShoppingCar.getInstance();

  // First product
  shoppingCar.add(
    new Product(
      'BK001',
      'Design Patterns: Elements of Reusable Object-Oriented Software',
      750
    )
  );

  // Second product
  shoppingCar.add(
    new Product('BK002', 'Introduction to Algorithms', 1000)
  );

  // Get existing shopping car instance
  const shoppingCarNewInstance = ShoppingCar.getInstance();
  shoppingCarNewInstance.add(new Product('BK003', 'Compilers', 900));

  console.log('\n--- Shopping Car products ---\n');
  console.log(shoppingCar.products);

  console.log('\n--- Shopping Car New Instance products ---\n');
  console.log(shoppingCarNewInstance.products);

  // Products list must be the same
  console.log('\n--- Are shopping cars products the same? ---\n');
  console.log(shoppingCar.products === shoppingCarNewInstance.products); // true

  // The number of elements in the list must be the same, in this case 3
  console.log(
    '\n--- Is shopping car number of products in both instances equal? ---\n'
  );
  console.log(
    shoppingCar.products.length ===
      shoppingCarNewInstance.products.length
  );

  // Let's delete second product
  shoppingCarNewInstance.deleteById('BK002');
  console.log('\n--- Product deleted: BK002---\n');

  console.log('\n--- Shopping Car products ---\n');
  console.log(shoppingCar.products);

  console.log('\n--- Shopping Car New Instance products ---\n');
  console.log(shoppingCarNewInstance.products);

  // The number of elements in the list must be the same, in this case 2
  console.log(
    '\n--- Is shopping car number of products in both instances equal? ---\n'
  );

  console.log(
    shoppingCar.products.length)
  console.log(
    shoppingCar.products.length ===
      shoppingCarNewInstance.products.length
  );
}

appSingleton();