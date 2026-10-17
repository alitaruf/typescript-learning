const { test } = require("node:test");
const assert = require("node:assert/strict");
const { move, describeConfig, directions, config } = require("./asConstAssertions");

test("`as const` array becomes a readonly tuple of literal values", () => {
  assert.deepEqual(directions, ["up", "down", "left", "right"]);
  assert.equal(move(directions[0]), "Moving up");
  assert.equal(move(directions[3]), "Moving right");
});

test("`as const` object keeps its literal property values", () => {
  assert.equal(config.env, "production");
  assert.equal(config.retries, 3);
  assert.equal(describeConfig(config.env), "Running in production");
});

test("`as const` readonly-ness is compile-time only - TypeScript blocks the write, JS at runtime does not", () => {
  const mutableDirections = [...directions] as unknown as string[];
  mutableDirections.push("diagonal");
  assert.equal(mutableDirections.length, 5);

  const mutableConfig = { ...config } as unknown as { env: string };
  mutableConfig.env = "staging";
  assert.equal(mutableConfig.env, "staging");
});
