const { test } = require("node:test");
const assert = require("node:assert/strict");
const { QueryBuilder, Animal, Dog, Cart } = require("./methodChainingAndThisType");

test("each QueryBuilder method returns this so calls can be chained", () => {
  const query = new QueryBuilder()
    .select("name, price")
    .from("products")
    .where("price > 100")
    .build();

  assert.equal(query, "SELECT name, price FROM products WHERE price > 100");
});

test("the `this` return type keeps a subclass's own methods available mid-chain", () => {
  const dogReport = new Dog().makeSound("Woof").wagTail().makeSound("Woof!").report();
  assert.equal(dogReport, "Woof (wags tail) Woof!");
});

test("makeSound() alone still works on a plain Animal", () => {
  const animalReport = new Animal().makeSound("Moo").report();
  assert.equal(animalReport, "Moo");
});

test("Cart chaining mutates state across add()/remove() and total() reads it back", () => {
  const cart = new Cart().add("Book", 20).add("Pen", 3).add("Bag", 35).remove("Pen");
  assert.equal(cart.total(), 55);
});
