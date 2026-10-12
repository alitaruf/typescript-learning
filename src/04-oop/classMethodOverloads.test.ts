const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Point, Logger, Repository } = require("./classMethodOverloads");

test("Point's two constructor overloads both produce the same shape", () => {
  const p1 = new Point(3, 4);
  const p2 = new Point([5, 6]);

  assert.equal(p1.toString(), "(3, 4)");
  assert.equal(p2.toString(), "(5, 6)");
});

test("Logger.log() overloads pick behaviour based on the argument types", () => {
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);

  try {
    new Logger().log("Server started");
    new Logger().log(404, "Not found");
  } finally {
    console.log = originalLog;
  }

  assert.deepEqual(lines, ["Server started", "[404] Not found"]);
});

test("Repository.find() narrows its return type based on the overload matched", () => {
  const repo = new Repository();

  const one = repo.find(1);
  const many = repo.find([1, 2, 3]);

  assert.equal(one, "Laptop");
  assert.deepEqual(many, ["Laptop", "Phone", undefined]);
});
