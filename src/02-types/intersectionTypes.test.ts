const { test } = require("node:test");
const assert = require("node:assert/strict");
const { person, employee, event, printEmployee } = require("./intersectionTypes");

test("a Named & Aged intersection requires every member from both types", () => {
  assert.equal(person.name, "Taruf");
  assert.equal(person.age, 28);
});

test("intersecting three types requires members from all of them at once", () => {
  assert.equal(employee.name, "Sara");
  assert.equal(employee.age, 32);
  assert.equal(employee.company, "Acme Corp");
});

test("printEmployee() reads from every intersected member", () => {
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);

  try {
    printEmployee(employee);
  } finally {
    console.log = originalLog;
  }

  assert.equal(lines[0], "Sara (32) works at Acme Corp");
});

test("intersecting an interface with an inline type alias works the same way", () => {
  assert.ok(event.createdAt instanceof Date);
  assert.equal(event.message, "User logged in");
});
