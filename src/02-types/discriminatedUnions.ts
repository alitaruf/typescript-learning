// ─────────────────────────────────────────────
// 1. Discriminated unions - every member shares a
//    common literal "tag" property, which lets
//    TypeScript narrow exactly which one you have
// ─────────────────────────────────────────────
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };

type Shape = Circle | Square | Rectangle;

// ─────────────────────────────────────────────
// 2. Narrowing with a `switch` on the tag - inside
//    each case, TypeScript knows exactly which
//    member of the union you're working with
// ─────────────────────────────────────────────
function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

console.log(`Circle area: ${area({ kind: "circle", radius: 2 }).toFixed(2)}`);
console.log(`Rectangle area: ${area({ kind: "rectangle", width: 3, height: 5 })}`);

// ─────────────────────────────────────────────
// 3. Exhaustiveness checking - a `never`-typed
//    parameter only accepts a value if every case
//    has been handled, catching a forgotten case
//    at compile time instead of at runtime
// ─────────────────────────────────────────────
function assertNever(value: never): never {
  throw new Error(`Unhandled shape: ${JSON.stringify(value)}`);
}

function describe(shape: Shape): string {
  switch (shape.kind) {
    case "circle":
      return `Circle r=${shape.radius}`;
    case "square":
      return `Square side=${shape.side}`;
    case "rectangle":
      return `Rectangle ${shape.width}x${shape.height}`;
    default:
      return assertNever(shape);
  }
}

console.log(describe({ kind: "square", side: 4 }));

// ─────────────────────────────────────────────
// 4. Combining with intersection types - a shared
//    base merged (`&`) into each tagged member,
//    still narrowed the same way as above
// ─────────────────────────────────────────────
type BaseEvent = { timestamp: Date };
type ClickEvent = BaseEvent & { type: "click"; x: number; y: number };
type KeyEvent = BaseEvent & { type: "key"; key: string };
type AppEvent = ClickEvent | KeyEvent;

function handle(event: AppEvent): string {
  switch (event.type) {
    case "click":
      return `Click at (${event.x}, ${event.y})`;
    case "key":
      return `Key: ${event.key}`;
  }
}

console.log(handle({ timestamp: new Date(), type: "click", x: 10, y: 20 }));
console.log(handle({ timestamp: new Date(), type: "key", key: "Enter" }));

module.exports = { area, describe, handle };
