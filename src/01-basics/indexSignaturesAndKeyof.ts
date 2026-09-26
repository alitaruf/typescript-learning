// ─────────────────────────────────────────────
// 1. Index signatures - describe an object whose
//    exact property names aren't known ahead of
//    time, but whose value type is consistent
// ─────────────────────────────────────────────
type Scoreboard = {
  [playerName: string]: number;
};

const scores: Scoreboard = {
  Ali: 90,
  Sara: 85,
};
scores.Zara = 78; // new keys are allowed as long as the value is a number

console.log(`Ali's score: ${scores.Ali}`);
console.log(`Zara's score: ${scores.Zara}`);

// ─────────────────────────────────────────────
// 2. `keyof` - produces a union of an object
//    type's property names as a type
// ─────────────────────────────────────────────
type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductKey = keyof Product; // "id" | "name" | "price"

function getProductValue(product: Product, key: ProductKey): string | number {
  return product[key];
}

const laptop: Product = { id: 1, name: "Laptop", price: 1200 };
console.log(`name: ${getProductValue(laptop, "name")}`);
console.log(`price: ${getProductValue(laptop, "price")}`);
// getProductValue(laptop, "weight");   // Error: "weight" is not a key of Product

// ─────────────────────────────────────────────
// 3. `Record<Keys, ValueType>` - a built-in
//    shortcut for an object type with a known
//    set of keys, all mapping to the same value type
// ─────────────────────────────────────────────
type Currency = "USD" | "EUR" | "GBP";

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
};

function convertToUsd(amount: number, currency: Currency): number {
  return amount / exchangeRates[currency];
}

console.log(`100 EUR in USD: ${convertToUsd(100, "EUR").toFixed(2)}`);

// ─────────────────────────────────────────────
// 4. Looping over an object's keys with
//    `Object.keys` + `keyof` for full type safety
// ─────────────────────────────────────────────
function describeProduct(product: Product): void {
  (Object.keys(product) as ProductKey[]).forEach((key) => {
    console.log(`${key}: ${product[key]}`);
  });
}

describeProduct(laptop);
