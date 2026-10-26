// ─────────────────────────────────────────────
// 1. Without `override`, a typo'd method name
//    doesn't override the parent - it just creates
//    an unrelated method that happens to look similar
// ─────────────────────────────────────────────
class Base {
  greet(): string {
    return "Hello from Base";
  }
}

class TypoSubclass extends Base {
  greeet(): string {
    // typo: extra "e" - TypeScript has no way to know this was meant to override greet()
    return "Hello from TypoSubclass";
  }
}

console.log(new TypoSubclass().greet()); // still Base.greet() - the bug goes unnoticed

// ─────────────────────────────────────────────
// 2. The `override` keyword states intent explicitly.
//    TypeScript then checks that a method with this
//    exact name actually exists on the base class.
// ─────────────────────────────────────────────
class Correct extends Base {
  override greet(): string {
    return "Hello from Correct";
  }
}

console.log(new Correct().greet());

// class Wrong extends Base {
//   override greeet(): string {   // Error: no 'greeet' member on Base to override
//     return "oops";
//   }
// }

// ─────────────────────────────────────────────
// 3. `override` also protects you when the BASE
//    class changes later - renaming or removing a
//    base method turns every `override` of it into
//    a compile error, so you find every affected
//    subclass immediately instead of at runtime
// ─────────────────────────────────────────────
abstract class Shape {
  abstract area(): number;

  describe(): string {
    return `Area: ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  override area(): number {
    return Math.PI * this.radius ** 2;
  }
}

console.log(new Circle(3).describe());
