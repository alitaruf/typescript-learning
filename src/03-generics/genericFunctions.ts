// ─────────────────────────────────────────────
// 1. Why generics? Without them, you'd either
//    lose type safety (`any`) or duplicate the
//    same function for every type.
// ─────────────────────────────────────────────
function firstAny(items: any[]): any {
  return items[0];
}

const bad = firstAny([1, 2, 3]);
// bad.toUpperCase();   // No error here, but this WILL crash at runtime -
//                       // TypeScript lost track of the real type.

// ─────────────────────────────────────────────
// 2. A generic function - `<T>` is a placeholder
//    type, filled in with the real type each time
//    the function is called
// ─────────────────────────────────────────────
function first<T>(items: T[]): T | undefined {
  // `noUncheckedIndexedAccess` makes `items[0]` type as `T | undefined`,
  // since the array could be empty - this signature is honest about that.
  return items[0];
}

const firstNumber = first([1, 2, 3]); // T becomes number
const firstName = first(["Ali", "Sara"]); // T becomes string

console.log(`First number: ${firstNumber}`);
console.log(`First name: ${firstName}`);
// firstNumber.toUpperCase();   // Error - TypeScript knows this is number | undefined

// ─────────────────────────────────────────────
// 3. Multiple type parameters - useful when two
//    values can be different, unrelated types
// ─────────────────────────────────────────────
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const result = pair("age", 28);
console.log(`Pair: ${result[0]} = ${result[1]}`);

// ─────────────────────────────────────────────
// 4. Generic constraints (`extends`) - limit `T`
//    to types that have certain properties, so you
//    can safely use them inside the function
// ─────────────────────────────────────────────
type HasLength = { length: number };

function describeLength<T extends HasLength>(item: T): string {
  return `Length: ${item.length}`;
}

console.log(describeLength("hello")); // string has .length
console.log(describeLength([1, 2, 3, 4])); // array has .length
// console.log(describeLength(42));   // Error - number has no .length

// ─────────────────────────────────────────────
// 5. Default type parameters - used when the
//    caller doesn't specify one
// ─────────────────────────────────────────────
function createEmptyList<T = string>(): T[] {
  return [];
}

const numbers = createEmptyList<number>(); // T explicitly set to number
const strings = createEmptyList(); // T defaults to string

numbers.push(1, 2, 3);
strings.push("a", "b");

console.log(`Numbers: ${numbers.join(", ")}`);
console.log(`Strings: ${strings.join(", ")}`);
