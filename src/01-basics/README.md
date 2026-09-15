# 01 — Basics

Fundamentals: typed variables and functions, control flow, unions, enums, type aliases, interfaces, and using interfaces to model API responses.

## Files

- `variables.ts` — a typed variable and a simple typed function
- `optioanFunctionalParameters.ts` — validating input with a boolean-returning function before using it
- `controlFlow.ts` — control flow analysis narrowing a `string | number | boolean` variable
- `unions.ts` — union types narrowed with `typeof`
- `enum.ts` — a numeric enum plus `keyof typeof` for its string keys
- `typeAlias.ts` — type aliases for a primitive, an object shape, a union, and a function signature
- `interface.ts` — a basic interface describing an object shape
- `api/interface.ts` — a `Product` interface, exported for reuse
- `api/example.ts` — importing an interface to type an API-shaped response object

## Run

```bash
npm run run -- src/01-basics/variables.ts
npm run run -- src/01-basics/optioanFunctionalParameters.ts
npm run run -- src/01-basics/controlFlow.ts
npm run run -- src/01-basics/unions.ts
npm run run -- src/01-basics/enum.ts
npm run run -- src/01-basics/typeAlias.ts
npm run run -- src/01-basics/interface.ts
npm run run -- src/01-basics/api/example.ts
```
