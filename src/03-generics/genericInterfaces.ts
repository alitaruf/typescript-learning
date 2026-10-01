// ─────────────────────────────────────────────
// 1. A generic interface - describes a shape
//    whose property types depend on `T`
// ─────────────────────────────────────────────
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

type Product = { id: number; name: string; price: number };

const productResponse: ApiResponse<Product> = {
  success: true,
  data: { id: 1, name: "Laptop", price: 1200 },
};

const usersResponse: ApiResponse<string[]> = {
  success: true,
  data: ["Ali", "Sara", "Zara"],
};

console.log(`Product: ${productResponse.data.name}`);
console.log(`Users: ${usersResponse.data.join(", ")}`);

// ─────────────────────────────────────────────
// 2. A generic type alias - same idea, written
//    as a `type` instead of an `interface`
// ─────────────────────────────────────────────
type Pair<A, B> = {
  first: A;
  second: B;
};

const nameAge: Pair<string, number> = { first: "Ali", second: 28 };
console.log(`${nameAge.first} is ${nameAge.second} years old`);

// ─────────────────────────────────────────────
// 3. A generic interface with a method - the
//    method's parameter/return types depend on `T`
// ─────────────────────────────────────────────
interface Comparator<T> {
  compare(a: T, b: T): number;
}

const numberComparator: Comparator<number> = {
  compare: (a, b) => a - b,
};

const sortedNumbers = [5, 2, 9, 1].sort(numberComparator.compare);
console.log(`Sorted: ${sortedNumbers.join(", ")}`);

// ─────────────────────────────────────────────
// 4. `keyof` + generics together - a function
//    that only accepts a key that actually exists
//    on the object, and returns the correct value type
// ─────────────────────────────────────────────
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const laptop: Product = { id: 1, name: "Laptop", price: 1200 };

const name = getProperty(laptop, "name"); // inferred as string
const price = getProperty(laptop, "price"); // inferred as number
console.log(`name: ${name}, price: ${price}`);
// getProperty(laptop, "weight");   // Error: "weight" is not a key of Product
