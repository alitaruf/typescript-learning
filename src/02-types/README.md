# 02 — Types

TypeScript's static type system: interfaces, type aliases, union and intersection types, literal types, discriminated unions, `as const` assertions.

> Interfaces, type aliases, and union types are introduced in [`01-basics`](../01-basics). This folder covers what's left: literal types, intersection types, discriminated unions, and `as const`.

## Files

- `literalTypes.ts` — string/numeric literal types, how they narrow a plain `string`/`number`, and how `const` vs `let` affects literal widening
- `literalTypes.test.ts` — tests for the above, covering `move()`, `rollResult()`, and `setStatus()` across their allowed literal values
- `intersectionTypes.ts` — combining multiple types with `&` so a value must satisfy all of them at once
- `intersectionTypes.test.ts` — tests for the above, covering a two-type intersection, a three-type intersection, `printEmployee()`, and intersecting an interface with an inline type alias
- `discriminatedUnions.ts` — unions tagged with a shared literal property, narrowing with `switch`, exhaustiveness checking via `never`, and tagging an intersection-based union
- `discriminatedUnions.test.ts` — tests for the above, covering `area()`/`describe()` narrowing on `kind`, and `handle()` narrowing an intersection-based union on `type`
- `asConstAssertions.ts` — `as const` on a primitive, an array (readonly tuple of literals), and an object (readonly, literal-typed properties), plus what happens without it
- `asConstAssertions.test.ts` — tests for the above, covering the readonly tuple, the readonly object, and confirming `as const` is compile-time only (no runtime enforcement)

## Run

```bash
npm run run -- src/02-types/literalTypes.ts
npm run run -- src/02-types/intersectionTypes.ts
npm run run -- src/02-types/discriminatedUnions.ts
npm run run -- src/02-types/asConstAssertions.ts
```

## Test

```bash
npm test
```
