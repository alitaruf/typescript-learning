# 03 — Generics

Generic functions, generic classes, and constraints.

## Files

- `genericFunctions.ts` — why generics beat `any`, a generic `first<T>` function, multiple type parameters, constraints (`extends`), and default type parameters
- `genericClasses.ts` — a generic `Box<T>` class, a typed `Stack<T>` collection, and constraining a class's type parameter with `extends`
- `genericInterfaces.ts` — generic interfaces and type aliases (`ApiResponse<T>`, `Pair<A, B>`), a generic method signature, and the `keyof` + generics pattern for type-safe property access
- `genericUtilityFunctions.ts` — hand-rolled generic `map`/`filter`/`groupBy`/`merge` helpers, showing two independent type parameters (`T`, `U`) and combining generics with `Record` and intersection types

## Run

```bash
npm run run -- src/03-generics/genericFunctions.ts
npm run run -- src/03-generics/genericClasses.ts
npm run run -- src/03-generics/genericInterfaces.ts
npm run run -- src/03-generics/genericUtilityFunctions.ts
```
