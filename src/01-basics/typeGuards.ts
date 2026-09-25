// ─────────────────────────────────────────────
// 1. `instanceof` - narrows based on which class
//    a value was constructed from
// ─────────────────────────────────────────────
class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows `animal` is a Dog here
  } else {
    animal.meow(); // and a Cat here
  }
}

makeSound(new Dog());
makeSound(new Cat());

// ─────────────────────────────────────────────
// 2. `in` operator - narrows based on whether a
//    property exists on the object
// ─────────────────────────────────────────────
type Circle = { radius: number };
type Square = { side: number };

function area(shape: Circle | Square): number {
  if ("radius" in shape) {
    return Math.PI * shape.radius ** 2; // shape is Circle here
  }
  return shape.side ** 2; // shape is Square here
}

console.log(`Circle area: ${area({ radius: 3 }).toFixed(2)}`);
console.log(`Square area: ${area({ side: 4 })}`);

// ─────────────────────────────────────────────
// 3. Custom type guards - a function that tells
//    TypeScript how to narrow a type, using the
//    special `param is Type` return type
// ─────────────────────────────────────────────
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return "swim" in pet;
}

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim(); // narrowed to Fish
  } else {
    pet.fly(); // narrowed to Bird
  }
}

move({ swim: () => console.log("Swimming") });
move({ fly: () => console.log("Flying") });

// ─────────────────────────────────────────────
// 4. Combining a custom guard with array filtering
//    - a common real-world use for `is` guards
// ─────────────────────────────────────────────
const pets: (Fish | Bird)[] = [
  { swim: () => console.log("splash") },
  { fly: () => console.log("flap") },
  { swim: () => console.log("splash") },
];

const fishOnly: Fish[] = pets.filter(isFish); // array is correctly typed as Fish[]
console.log(`Number of fish: ${fishOnly.length}`);
