# 05 — Advanced Types

Mapped types, conditional types, and the built-in utility types (`Partial`, `Pick`, `Omit`, etc.).

## Files

- `mappedAndConditionalTypes.ts` — custom mapped types (`ReadonlyVersion`, `OptionalVersion`), the built-in utility types `Pick`/`Omit`/`Record` built on the same idea, conditional types with `extends ? :`, extracting a type with `infer`, and distributive conditional types over a union
- `templateLiteralAndIndexedAccessTypes.ts` — template literal types combining unions into string literal types, indexed access types (`T["key"]`, `T["items"][number]`), a generic `getProperty` using `keyof`, and `satisfies` for checking a value against a type without widening it

## Run

```bash
npm run run -- src/05-advanced-types/mappedAndConditionalTypes.ts
npm run run -- src/05-advanced-types/templateLiteralAndIndexedAccessTypes.ts
```
