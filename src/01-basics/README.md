# 01 — Basics

Fundamentals: typed variables and functions, arrays and tuples, special types (`any`/`unknown`/`void`/`never`), control flow, unions, enums, type aliases, interfaces, function overloads, and using interfaces to model API responses.

## Files

- `variables.ts` — a typed variable and a simple typed function
- `optioanFunctionalParameters.ts` — validating input with a boolean-returning function before using it
- `arraysAndTuples.ts` — typed arrays, fixed-shape tuples, named tuple members, and readonly arrays/tuples
- `specialTypes.ts` — `any` vs `unknown`, `void`, `never` (exhaustive checks), and `as` type assertions
- `controlFlow.ts` — control flow analysis narrowing a `string | number | boolean` variable
- `unions.ts` — union types narrowed with `typeof`
- `enum.ts` — a numeric enum plus `keyof typeof` for its string keys
- `typeAlias.ts` — type aliases for a primitive, an object shape, a union, and a function signature
- `interface.ts` — a basic interface describing an object shape
- `functionoverload.ts` — multiple call signatures for one function implementation
- `api/interface.ts` — a `Product` interface, exported for reuse
- `api/example.ts` — importing an interface to type an API-shaped response object

## Run

```bash
npm run run -- src/01-basics/variables.ts
npm run run -- src/01-basics/optioanFunctionalParameters.ts
npm run run -- src/01-basics/arraysAndTuples.ts
npm run run -- src/01-basics/specialTypes.ts
npm run run -- src/01-basics/controlFlow.ts
npm run run -- src/01-basics/unions.ts
npm run run -- src/01-basics/enum.ts
npm run run -- src/01-basics/typeAlias.ts
npm run run -- src/01-basics/interface.ts
npm run run -- src/01-basics/functionoverload.ts
npm run run -- src/01-basics/api/example.ts
```
