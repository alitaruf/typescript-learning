# 02 — Types

TypeScript's static type system: interfaces, type aliases, union and intersection types, literal types, discriminated unions, `as const` assertions.

> Interfaces, type aliases, and union types are introduced in [`01-basics`](../01-basics). This folder covers what's left: literal types, intersection types, discriminated unions, and `as const`.

## Files

- `literalTypes.ts` — string/numeric literal types, how they narrow a plain `string`/`number`, and how `const` vs `let` affects literal widening
- `intersectionTypes.ts` — combining multiple types with `&` so a value must satisfy all of them at once
- `discriminatedUnions.ts` — unions tagged with a shared literal property, narrowing with `switch`, exhaustiveness checking via `never`, and tagging an intersection-based union
- `asConstAssertions.ts` — `as const` on a primitive, an array (readonly tuple of literals), and an object (readonly, literal-typed properties), plus what happens without it

## Run

```bash
npm run run -- src/02-types/literalTypes.ts
npm run run -- src/02-types/intersectionTypes.ts
npm run run -- src/02-types/discriminatedUnions.ts
npm run run -- src/02-types/asConstAssertions.ts
```
