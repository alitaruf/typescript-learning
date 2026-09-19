# 02 — Types

TypeScript's static type system: interfaces, type aliases, union and intersection types, literal types.

> Interfaces, type aliases, and union types are introduced in [`01-basics`](../01-basics). This folder covers what's left: literal types and intersection types.

## Files

- `literalTypes.ts` — string/numeric literal types, how they narrow a plain `string`/`number`, and how `const` vs `let` affects literal widening
- `intersectionTypes.ts` — combining multiple types with `&` so a value must satisfy all of them at once

## Run

```bash
npm run run -- src/02-types/literalTypes.ts
npm run run -- src/02-types/intersectionTypes.ts
```
