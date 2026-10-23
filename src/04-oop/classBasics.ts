// ─────────────────────────────────────────────
// 1. A basic class - properties, a constructor,
//    and a method
// ─────────────────────────────────────────────
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

const person = new Person("Ali", 28);
console.log(person.greet());

// ─────────────────────────────────────────────
// 2. Parameter properties - a shortcut that
//    declares + assigns a property directly from
//    the constructor parameter, no `this.x = x`
// ─────────────────────────────────────────────
class Product {
  constructor(
    public name: string,
    public price: number,
  ) {}
}

const laptop = new Product("Laptop", 1200);
console.log(`${laptop.name}: $${laptop.price}`);

// ─────────────────────────────────────────────
// 3. Access modifiers - control what code outside
//    the class is allowed to touch
//    - public (default): accessible from anywhere
//    - private: only accessible inside this class
//    - protected: this class + subclasses (see inheritance.ts)
// ─────────────────────────────────────────────
class BankAccount {
  public owner: string;
  private balance: number;

  constructor(owner: string, startingBalance: number) {
    this.owner = owner;
    this.balance = startingBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("Sara", 100);
account.deposit(50);
console.log(`${account.owner}'s balance: $${account.getBalance()}`);
// account.balance;        // Error: 'balance' is private
// account.balance = 999;  // Error: can't reach in from outside the class

// ─────────────────────────────────────────────
// 4. Readonly class properties - set once
//    (in the constructor) and never reassigned
// ─────────────────────────────────────────────
class Order {
  readonly id: number;
  status: "pending" | "shipped";

  constructor(id: number) {
    this.id = id;
    this.status = "pending";
  }
}

const order = new Order(1001);
order.status = "shipped"; // fine - not readonly
// order.id = 2002;        // Error: 'id' is readonly
console.log(`Order #${order.id} is ${order.status}`);

// ─────────────────────────────────────────────
// 5. Getters and setters - look like plain
//    properties from the outside, but run code
// ─────────────────────────────────────────────
class Temperature {
  private celsius: number;

  constructor(celsius: number) {
    this.celsius = celsius;
  }

  get fahrenheit(): number {
    return this.celsius * (9 / 5) + 32;
  }

  set fahrenheit(value: number) {
    this.celsius = (value - 32) * (5 / 9);
  }
}

const temp = new Temperature(25);
console.log(`25°C = ${temp.fahrenheit}°F`);
temp.fahrenheit = 98.6; // uses the setter, stores converted celsius internally
console.log(`After setting 98.6°F: ${temp.fahrenheit.toFixed(1)}°F`);

// ─────────────────────────────────────────────
// 6. Static members - belong to the class itself,
//    not to any individual instance
// ─────────────────────────────────────────────
class Counter {
  static count = 0;

  constructor() {
    Counter.count++;
  }
}

new Counter();
new Counter();
new Counter();
console.log(`Instances created: ${Counter.count}`);
