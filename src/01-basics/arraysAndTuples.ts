// ─────────────────────────────────────────────
// 1. Typed arrays
// ─────────────────────────────────────────────
const scores: number[] = [90, 85, 77];
const names: Array<string> = ["Ali", "Sara", "Zara"];

function total(nums: number[]): number {
  return nums.reduce((sum, n) => sum + n, 0);
}

console.log(`Total score: ${total(scores)}`);
console.log(`Names: ${names.join(", ")}`);

// ─────────────────────────────────────────────
// 2. Tuples - a fixed-length array where each
//    position has its own known type
// ─────────────────────────────────────────────
let user: [string, number]; // [name, age]
user = ["Taruf", 28];

console.log(`User: ${user[0]}, Age: ${user[1]}`);

// Wrong order or wrong type would be a compile error:
// user = [28, "Taruf"];

// ─────────────────────────────────────────────
// 3. Named tuple members (labels are for
//    readability only - order still matters)
// ─────────────────────────────────────────────
type HttpResponse = [status: number, message: string];

function logResponse(response: HttpResponse): void {
  const [status, message] = response;
  console.log(`Status ${status}: ${message}`);
}

logResponse([200, "OK"]);
logResponse([404, "Not Found"]);

// ─────────────────────────────────────────────
// 4. Readonly arrays and tuples - prevents
//    mutation after creation
// ─────────────────────────────────────────────
const point: readonly [number, number] = [10, 20];
console.log(`Point: (${point[0]}, ${point[1]})`);

// point[0] = 99;      // Error: readonly
// point.push(30);     // Error: push doesn't exist on a readonly tuple
