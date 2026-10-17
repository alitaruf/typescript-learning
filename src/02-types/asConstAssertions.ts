// ─────────────────────────────────────────────
// 1. `as const` on a primitive - forces a literal
//    type even on a `let`, which would otherwise
//    widen to the general type (see literalTypes.ts)
// ─────────────────────────────────────────────
function greet(name: "Ali" | "Sara"): string {
  return `Hello, ${name}`;
}

let favorite = "Ali" as const; // type is the literal "Ali", not string
console.log(greet(favorite));

// ─────────────────────────────────────────────
// 2. `as const` on an array - without it, TypeScript
//    would infer a widened, mutable `string[]`. With
//    it, you get a readonly tuple of literal types.
// ─────────────────────────────────────────────
const directions = ["up", "down", "left", "right"] as const;
// directions.push("diagonal");   // Error: push doesn't exist on a readonly tuple
// directions[0] = "down";        // Error: index 0 is readonly

type Direction = (typeof directions)[number]; // "up" | "down" | "left" | "right"

function move(direction: Direction): string {
  return `Moving ${direction}`;
}

console.log(move(directions[0]));

// ─────────────────────────────────────────────
// 3. `as const` on an object - every property
//    becomes readonly, and its value narrows to
//    a literal type instead of widening
// ─────────────────────────────────────────────
const config = {
  env: "production",
  retries: 3,
} as const;
// config.env = "staging";   // Error: 'env' is readonly

function describeConfig(env: "production" | "staging"): string {
  return `Running in ${env}`;
}

console.log(describeConfig(config.env));

// ─────────────────────────────────────────────
// 4. Without `as const`, the same literals widen to
//    `string`/`number`, so they no longer fit a
//    narrower parameter type
// ─────────────────────────────────────────────
const widenedConfig = { env: "production", retries: 3 }; // env: string, retries: number
// describeConfig(widenedConfig.env);   // Error: string is not "production" | "staging"
widenedConfig.env = "staging"; // fine - no `as const`, so env is just a plain string
console.log(`Widened config env is now: ${widenedConfig.env}`);

module.exports = { move, describeConfig, directions, config };
