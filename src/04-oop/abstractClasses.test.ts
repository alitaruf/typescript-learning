const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  Shape,
  Circle,
  Rectangle,
  Report,
  BaseNotifier,
  EmailNotifier,
  SmsNotifier,
} = require("./abstractClasses");

test("Shape has no usable area() of its own - only subclasses implement it", () => {
  // TypeScript blocks `new Shape(...)` at compile time; abstract is erased at
  // runtime, so the instance exists but calling the unimplemented method throws.
  const shape = new Shape("generic");
  assert.throws(() => shape.describe());
});

test("subclasses implement area() and describe() uses it", () => {
  const circle = new Circle(2);
  const rectangle = new Rectangle(3, 4);

  assert.equal(rectangle.area(), 12);
  assert.ok(circle.area() > 0);
  assert.equal(rectangle.describe(), "Rectangle with area 12.00");
});

test("a class can implement multiple interfaces at once", () => {
  const report = new Report("Q3 sales");
  assert.equal(typeof report.print, "function");
  assert.equal(typeof report.save, "function");
});

test("BaseNotifier.send() combines the shared format() with each subclass's channel()", () => {
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);

  try {
    new EmailNotifier().send("  Your order has shipped  ");
    new SmsNotifier().send("x".repeat(50));
  } finally {
    console.log = originalLog;
  }

  assert.equal(lines[0], "[EMAIL] Your order has shipped");
  assert.equal(lines[1], `[SMS] ${"x".repeat(40)}`); // SmsNotifier overrides format() to truncate
});
