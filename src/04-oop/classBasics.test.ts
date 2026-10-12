const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  Person,
  Product,
  BankAccount,
  Order,
  Temperature,
  Counter,
} = require("./classBasics");

test("Person.greet() uses the constructor-assigned fields", () => {
  const person = new Person("Ali", 28);
  assert.equal(person.greet(), "Hi, I'm Ali and I'm 28 years old.");
});

test("Product parameter properties are assigned without a constructor body", () => {
  const laptop = new Product("Laptop", 1200);
  assert.equal(laptop.name, "Laptop");
  assert.equal(laptop.price, 1200);
});

test("BankAccount exposes deposit/getBalance but keeps balance private", () => {
  const account = new BankAccount("Sara", 100);
  account.deposit(50);
  assert.equal(account.getBalance(), 150);
  assert.ok("balance" in account); // private is type-only; the field still exists at runtime
});

test("Order.status can change but id is set once via readonly", () => {
  const order = new Order(1001);
  assert.equal(order.id, 1001);
  assert.equal(order.status, "pending");
  order.status = "shipped";
  assert.equal(order.status, "shipped");
});

test("Temperature getter/setter convert between celsius and fahrenheit", () => {
  const temp = new Temperature(25);
  assert.equal(temp.fahrenheit, 77);
  temp.fahrenheit = 98.6;
  assert.equal(Math.round(temp.fahrenheit * 10) / 10, 98.6);
});

test("Counter.count is shared across instances via a static member", () => {
  const before = Counter.count;
  new Counter();
  new Counter();
  assert.equal(Counter.count, before + 2);
});
