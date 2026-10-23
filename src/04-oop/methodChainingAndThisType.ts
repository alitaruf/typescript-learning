// ─────────────────────────────────────────────
// 1. Method chaining - a method returns `this`,
//    so calls can be strung together one after
//    another
// ─────────────────────────────────────────────
class QueryBuilder {
  private parts: string[] = [];

  select(fields: string): this {
    this.parts.push(`SELECT ${fields}`);
    return this;
  }

  from(table: string): this {
    this.parts.push(`FROM ${table}`);
    return this;
  }

  where(condition: string): this {
    this.parts.push(`WHERE ${condition}`);
    return this;
  }

  build(): string {
    return this.parts.join(" ");
  }
}

const query = new QueryBuilder()
  .select("name, price")
  .from("products")
  .where("price > 100")
  .build();

console.log(query);

// ─────────────────────────────────────────────
// 2. The `this` return type - instead of naming
//    the class, `this` means "the type of whatever
//    object this method was called on". That keeps
//    subclasses chaining with their own type.
// ─────────────────────────────────────────────
class Animal {
  protected sounds: string[] = [];

  makeSound(sound: string): this {
    this.sounds.push(sound);
    return this;
  }

  report(): string {
    return this.sounds.join(" ");
  }
}

class Dog extends Animal {
  wagTail(): this {
    this.sounds.push("(wags tail)");
    return this;
  }
}

// makeSound() returns `this` (typed as Dog here, not Animal),
// so wagTail() is still available mid-chain.
const dogReport = new Dog().makeSound("Woof").wagTail().makeSound("Woof!").report();
console.log(dogReport);

// ─────────────────────────────────────────────
// 3. Chaining with state - each step changes the
//    object, and the chain returns it for the next step
// ─────────────────────────────────────────────
class Cart {
  private items: { name: string; price: number }[] = [];

  add(name: string, price: number): this {
    this.items.push({ name, price });
    return this;
  }

  remove(name: string): this {
    this.items = this.items.filter((item) => item.name !== name);
    return this;
  }

  total(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

const cart = new Cart().add("Book", 20).add("Pen", 3).add("Bag", 35).remove("Pen");
console.log(`Cart total: $${cart.total()}`);
