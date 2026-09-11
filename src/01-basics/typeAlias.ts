// ─────────────────────────────────────────────
// 1. Aliasing a primitive type
// ─────────────────────────────────────────────
type UserInputSanitizedString = string;

function sanitize(str: string): string {
  return str.trim();
}

function getInput(): string {
  return "  raw user input  ";
}

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

let userInput = sanitizeInput(getInput());
console.log(`Sanitized: "${userInput}"`);

// A type alias for a primitive is NOT a distinct ("nominal") type —
// it's just another name for `string`. TypeScript still allows a
// plain, un-sanitized string to be assigned straight back in.
userInput = "new input";
console.log(`Reassigned: "${userInput}"`);

// ─────────────────────────────────────────────
// 2. Aliasing an object shape
// ─────────────────────────────────────────────
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point): void {
  console.log(`Point: (${pt.x}, ${pt.y})`);
}

printCoord({ x: 10, y: 20 });

// ─────────────────────────────────────────────
// 3. Aliasing a union of types
// ─────────────────────────────────────────────
type Id = number | string;

function printId(id: Id): void {
  console.log(`ID: ${id}`);
}

printId(101);
printId("e29b41");

// ─────────────────────────────────────────────
// 4. Aliasing a function signature
// ─────────────────────────────────────────────
type BinaryOperation = (a: number, b: number) => number;

const add: BinaryOperation = (a, b) => a + b;
const multiply: BinaryOperation = (a, b) => a * b;

console.log(`add(2, 3) = ${add(2, 3)}`);
console.log(`multiply(2, 3) = ${multiply(2, 3)}`);
