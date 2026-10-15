const { test } = require("node:test");
const assert = require("node:assert/strict");
const { area, describe, handle } = require("./discriminatedUnions");

test("area() narrows on the `kind` tag to compute each shape differently", () => {
  assert.equal(Math.round(area({ kind: "circle", radius: 2 }) * 100) / 100, 12.57);
  assert.equal(area({ kind: "square", side: 4 }), 16);
  assert.equal(area({ kind: "rectangle", width: 3, height: 5 }), 15);
});

test("describe() switches on `kind` with an exhaustive default", () => {
  assert.equal(describe({ kind: "circle", radius: 2 }), "Circle r=2");
  assert.equal(describe({ kind: "square", side: 4 }), "Square side=4");
  assert.equal(describe({ kind: "rectangle", width: 3, height: 5 }), "Rectangle 3x5");
});

test("handle() narrows an intersection-based discriminated union on `type`", () => {
  const now = new Date();
  assert.equal(handle({ timestamp: now, type: "click", x: 10, y: 20 }), "Click at (10, 20)");
  assert.equal(handle({ timestamp: now, type: "key", key: "Enter" }), "Key: Enter");
});
