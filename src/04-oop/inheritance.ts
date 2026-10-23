// ─────────────────────────────────────────────
// 1. Inheritance - a child class (`extends`) gets
//    everything from its parent class
// ─────────────────────────────────────────────
class Animal {
  constructor(public name: string) {}

  move(): string {
    return `${this.name} moves`;
  }
}

class Dog extends Animal {
  bark(): string {
    return `${this.name} barks`;
  }
}

const dog = new Dog("Rex");
console.log(dog.move()); // inherited from Animal
console.log(dog.bark()); // defined on Dog

// ─────────────────────────────────────────────
// 2. `super` - call the parent's constructor and
//    methods from inside the child class
// ─────────────────────────────────────────────
class Bird extends Animal {
  constructor(
    name: string,
    public canFly: boolean,
  ) {
    super(name); // must run before using `this`
  }

  move(): string {
    const base = super.move(); // reuse the parent's version
    return this.canFly ? `${base} by flying` : `${base} by walking`;
  }
}

const sparrow = new Bird("Sparrow", true);
const penguin = new Bird("Penguin", false);
console.log(sparrow.move());
console.log(penguin.move());

// ─────────────────────────────────────────────
// 3. Method overriding - a child replaces a parent
//    method with its own version. Calling `move()`
//    on an Animal-typed variable uses the child's
//    version at runtime.
// ─────────────────────────────────────────────
class Fish extends Animal {
  move(): string {
    return `${this.name} swims`;
  }
}

const animals: Animal[] = [new Dog("Rex"), new Fish("Nemo"), new Bird("Owl", true)];
for (const animal of animals) {
  console.log(animal.move()); // each one uses its own move()
}

// ─────────────────────────────────────────────
// 4. `protected` - like `private`, but subclasses
//    CAN access it (outside code still cannot)
// ─────────────────────────────────────────────
class Vehicle {
  protected speed: number = 0;

  accelerate(amount: number): void {
    this.speed += amount;
  }
}

class Car extends Vehicle {
  describe(): string {
    return `Car is going ${this.speed} km/h`; // allowed - protected
  }
}

const car = new Car();
car.accelerate(60);
console.log(car.describe());
// car.speed;   // Error: 'speed' is protected - not accessible from outside

// ─────────────────────────────────────────────
// 5. `instanceof` checks the whole inheritance chain
// ─────────────────────────────────────────────
console.log(`dog is Dog: ${dog instanceof Dog}`);
console.log(`dog is Animal: ${dog instanceof Animal}`);
console.log(`dog is Fish: ${dog instanceof Fish}`);
