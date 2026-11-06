// ─────────────────────────────────────────────
// 1. The Builder pattern - construct a complex
//    object step by step, instead of a constructor
//    with a long list of (possibly optional) parameters
// ─────────────────────────────────────────────
interface Pizza {
  size: "small" | "medium" | "large";
  toppings: string[];
  extraCheese: boolean;
}

// ─────────────────────────────────────────────
// 2. The builder - each method sets one piece of
//    the final object and returns `this`, so calls
//    can be chained in any order the caller wants
// ─────────────────────────────────────────────
class PizzaBuilder {
  private size: Pizza["size"] = "medium";
  private toppings: string[] = [];
  private extraCheese = false;

  setSize(size: Pizza["size"]): this {
    this.size = size;
    return this;
  }

  addTopping(topping: string): this {
    this.toppings.push(topping);
    return this;
  }

  withExtraCheese(): this {
    this.extraCheese = true;
    return this;
  }

  // ───────────────────────────────────────────
  // 3. build() assembles the final, immutable
  //    object only once every step is done
  // ───────────────────────────────────────────
  build(): Pizza {
    return {
      size: this.size,
      toppings: [...this.toppings],
      extraCheese: this.extraCheese,
    };
  }
}

// ─────────────────────────────────────────────
// 4. The client never touches the Pizza constructor
//    directly - it just chains builder calls and asks
//    for the finished product
// ─────────────────────────────────────────────
const pizza = new PizzaBuilder()
  .setSize("large")
  .addTopping("mushrooms")
  .addTopping("olives")
  .withExtraCheese()
  .build();

console.log(pizza);

// a second pizza, built independently with its own builder
const simplePizza = new PizzaBuilder().addTopping("pepperoni").build();
console.log(simplePizza);
