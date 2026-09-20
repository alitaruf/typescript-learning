// ─────────────────────────────────────────────
// 1. `any` - turns type checking OFF for a value.
//    Avoid it: mistakes only show up at runtime.
// ─────────────────────────────────────────────
let anything: any = "hello";
anything = 42;
anything = { id: 1 };

// TypeScript does not complain here, but this would crash at runtime:
// anything.toUpperCase();

// ─────────────────────────────────────────────
// 2. `unknown` - the safe alternative to `any`.
//    You can store anything in it, but you must
//    check its type before using it.
// ─────────────────────────────────────────────
function describe(value: unknown): string {
  if (typeof value === "string") {
    return `String of length ${value.length}`;
  }
  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }
  return "Something else";
}

console.log(describe("TypeScript"));
console.log(describe(3.14159));
console.log(describe(true));

// ─────────────────────────────────────────────
// 3. `void` - a function that returns nothing
// ─────────────────────────────────────────────
function logMessage(message: string): void {
  console.log(`LOG: ${message}`);
}

logMessage("void functions just do something");

// ─────────────────────────────────────────────
// 4. `never` - a value that can never happen.
//    Used for functions that never return, and
//    for exhaustive checks on unions.
// ─────────────────────────────────────────────
function fail(message: string): never {
  throw new Error(message);
}

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    default: {
      // If a new Shape is added and not handled above, this line
      // becomes a compile error because `shape` is no longer `never`.
      const unhandled: never = shape;
      return fail(`Unhandled shape: ${JSON.stringify(unhandled)}`);
    }
  }
}

console.log(`Circle area: ${area({ kind: "circle", radius: 2 }).toFixed(2)}`);
console.log(`Square area: ${area({ kind: "square", size: 3 })}`);

// ─────────────────────────────────────────────
// 5. Type assertions (`as`) - you tell TypeScript
//    the type. It is NOT a runtime check, so only
//    use it when you know more than the compiler.
// ─────────────────────────────────────────────
const json = '{"id": 7, "name": "Laptop"}';
const parsed = JSON.parse(json) as { id: number; name: string };

console.log(`Parsed: #${parsed.id} ${parsed.name}`);
