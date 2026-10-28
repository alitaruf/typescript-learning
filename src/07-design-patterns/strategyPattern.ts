// ─────────────────────────────────────────────
// 1. The Strategy pattern - define a family of
//    interchangeable algorithms behind one interface,
//    and let the client pick which one to use at runtime
// ─────────────────────────────────────────────
interface PricingStrategy {
  calculate(amount: number): number;
}

// ─────────────────────────────────────────────
// 2. Concrete strategies - each implements the
//    same contract with a different algorithm
// ─────────────────────────────────────────────
class RegularPricing implements PricingStrategy {
  calculate(amount: number): number {
    return amount;
  }
}

class PercentageDiscount implements PricingStrategy {
  constructor(private percentOff: number) {}

  calculate(amount: number): number {
    return amount * (1 - this.percentOff / 100);
  }
}

class FlatRateShippingSurcharge implements PricingStrategy {
  constructor(private surcharge: number) {}

  calculate(amount: number): number {
    return amount + this.surcharge;
  }
}

// ─────────────────────────────────────────────
// 3. The context - holds a reference to a strategy
//    and delegates to it, with no idea which concrete
//    strategy it's actually using
// ─────────────────────────────────────────────
class Checkout {
  constructor(private strategy: PricingStrategy) {}

  setStrategy(strategy: PricingStrategy): void {
    this.strategy = strategy;
  }

  total(amount: number): number {
    return this.strategy.calculate(amount);
  }
}

// ─────────────────────────────────────────────
// 4. Swapping strategies at runtime - the Checkout
//    class itself never changes
// ─────────────────────────────────────────────
const checkout = new Checkout(new RegularPricing());
console.log(`Regular: ${checkout.total(100)}`);

checkout.setStrategy(new PercentageDiscount(20));
console.log(`20% off: ${checkout.total(100)}`);

checkout.setStrategy(new FlatRateShippingSurcharge(5));
console.log(`Plus $5 shipping: ${checkout.total(100)}`);
