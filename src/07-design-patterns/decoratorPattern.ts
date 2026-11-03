// ─────────────────────────────────────────────
// 1. The Decorator pattern - wrap an object in
//    another object that implements the same interface,
//    adding behaviour without touching the original class
// ─────────────────────────────────────────────
interface Coffee {
  cost(): number;
  description(): string;
}

// ─────────────────────────────────────────────
// 2. The base component being decorated
// ─────────────────────────────────────────────
class PlainCoffee implements Coffee {
  cost(): number {
    return 2;
  }

  description(): string {
    return "Coffee";
  }
}

// ─────────────────────────────────────────────
// 3. An abstract decorator - holds the wrapped
//    Coffee and implements the same interface, so
//    decorators can be stacked on top of each other
// ─────────────────────────────────────────────
abstract class CoffeeDecorator implements Coffee {
  constructor(protected wrapped: Coffee) {}

  cost(): number {
    return this.wrapped.cost();
  }

  description(): string {
    return this.wrapped.description();
  }
}

// ─────────────────────────────────────────────
// 4. Concrete decorators - each adds its own cost
//    and description on top of whatever it wraps
// ─────────────────────────────────────────────
class WithMilk extends CoffeeDecorator {
  override cost(): number {
    return super.cost() + 0.5;
  }

  override description(): string {
    return `${super.description()} + milk`;
  }
}

class WithCaramel extends CoffeeDecorator {
  override cost(): number {
    return super.cost() + 0.75;
  }

  override description(): string {
    return `${super.description()} + caramel`;
  }
}

// ─────────────────────────────────────────────
// 5. Stacking decorators at runtime - any combination,
//    in any order, without a combinatorial explosion
//    of subclasses for every possible mix
// ─────────────────────────────────────────────
const order = new WithCaramel(new WithMilk(new PlainCoffee()));
console.log(`${order.description()}: $${order.cost().toFixed(2)}`);

const plain = new PlainCoffee();
console.log(`${plain.description()}: $${plain.cost().toFixed(2)}`);
