const { test } = require("node:test");
const assert = require("node:assert/strict");
const { move, rollResult, setStatus } = require("./literalTypes");

test("move() accepts any of the Direction literal values", () => {
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);

  try {
    move("up");
    move("left");
  } finally {
    console.log = originalLog;
  }

  assert.deepEqual(lines, ["Moving up", "Moving left"]);
});

test("rollResult() accepts any of the DiceRoll numeric literals", () => {
  assert.equal(rollResult(4), "You rolled a 4");
  assert.equal(rollResult(1), "You rolled a 1");
});

test("setStatus() narrows its parameter to the allowed literal strings", () => {
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);

  try {
    setStatus("loading");
    setStatus("success");
  } finally {
    console.log = originalLog;
  }

  assert.deepEqual(lines, ["Status: loading", "Status: success"]);
});
