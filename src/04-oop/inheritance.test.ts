const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Animal, Dog, Bird, Fish, Vehicle, Car } = require("./inheritance");

test("Dog inherits move() from Animal and adds its own bark()", () => {
  const dog = new Dog("Rex");
  assert.equal(dog.move(), "Rex moves");
  assert.equal(dog.bark(), "Rex barks");
});

test("Bird's constructor calls super() and move() reuses the parent via super.move()", () => {
  const sparrow = new Bird("Sparrow", true);
  const penguin = new Bird("Penguin", false);
  assert.equal(sparrow.move(), "Sparrow moves by flying");
  assert.equal(penguin.move(), "Penguin moves by walking");
});

test("overriding move() replaces the parent's version at runtime", () => {
  const animals = [new Dog("Rex"), new Fish("Nemo"), new Bird("Owl", true)];
  const moves = animals.map((animal) => animal.move());
  assert.deepEqual(moves, ["Rex moves", "Nemo swims", "Owl moves by flying"]);
});

test("protected members are reachable from a subclass", () => {
  const car = new Car();
  car.accelerate(60);
  assert.equal(car.describe(), "Car is going 60 km/h");
  assert.ok(car instanceof Vehicle);
});

test("instanceof checks the whole inheritance chain", () => {
  const dog = new Dog("Rex");
  assert.ok(dog instanceof Dog);
  assert.ok(dog instanceof Animal);
  assert.ok(!(dog instanceof Fish));
});
