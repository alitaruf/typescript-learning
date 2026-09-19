// ─────────────────────────────────────────────
// 1. String literal types - a type that only
//    accepts one exact, specific string value
// ─────────────────────────────────────────────
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

move("up");
// move("sideways");   // Error: not one of the allowed literal values

// ─────────────────────────────────────────────
// 2. Numeric literal types - same idea, but
//    with specific numbers instead of strings
// ─────────────────────────────────────────────
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollResult(value: DiceRoll): string {
  return `You rolled a ${value}`;
}

console.log(rollResult(4));
// console.log(rollResult(7));   // Error: 7 is not a valid DiceRoll

// ─────────────────────────────────────────────
// 3. Literal types narrow what a plain
//    string/number type would otherwise allow
// ─────────────────────────────────────────────
function setStatus(status: "loading" | "success" | "error"): void {
  console.log(`Status: ${status}`);
}

setStatus("loading");
setStatus("success");

// ─────────────────────────────────────────────
// 4. `const` narrows to a literal type automatically;
//    `let` widens back to the general type
// ─────────────────────────────────────────────
const fixedDirection = "left"; // type is the literal "left"
let changeableDirection = "left"; // type is widened to string

move(fixedDirection);
// move(changeableDirection);   // Error: string is not assignable to Direction
