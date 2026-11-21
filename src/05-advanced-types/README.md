# 05 — Advanced Types

Mapped types, conditional types, and the built-in utility types (`Partial`, `Pick`, `Omit`, etc.).

## Files

- `mappedAndConditionalTypes.ts` — custom mapped types (`ReadonlyVersion`, `OptionalVersion`), the built-in utility types `Pick`/`Omit`/`Record` built on the same idea, conditional types with `extends ? :`, extracting a type with `infer`, and distributive conditional types over a union
- `templateLiteralAndIndexedAccessTypes.ts` — template literal types combining unions into string literal types, indexed access types (`T["key"]`, `T["items"][number]`), a generic `getProperty` using `keyof`, and `satisfies` for checking a value against a type without widening it
- `recursiveAndDeepUtilityTypes.ts` — a recursive `Json` type alias, recursive `DeepReadonly`/`DeepPartial` mapped types that reach into nested objects, and variadic tuple types that spread one tuple into another
- `brandedTypesAndAssertions.ts` — branded (nominal) types so structurally-identical strings like `UserId`/`OrderId` can't be mixed up, assertion functions (`asserts value is string`) that narrow by throwing instead of returning a boolean, and `asserts this is ...` for narrowing a method's own instance

## Run

```bash
npm run run -- src/05-advanced-types/mappedAndConditionalTypes.ts
npm run run -- src/05-advanced-types/templateLiteralAndIndexedAccessTypes.ts
npm run run -- src/05-advanced-types/recursiveAndDeepUtilityTypes.ts
npm run run -- src/05-advanced-types/brandedTypesAndAssertions.ts
```
