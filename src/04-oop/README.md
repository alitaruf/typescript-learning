# 04 — OOP

Classes, inheritance, access modifiers, abstract classes.

## Files

- `classBasics.ts` — classes with a constructor and methods, parameter properties, access modifiers (`public`/`private`), readonly properties, getters/setters, and static members
- `inheritance.ts` — `extends`, `super` calls, method overriding, `protected` members, and `instanceof` across an inheritance chain
- `abstractClasses.ts` — abstract classes and abstract methods, `implements` for multiple interfaces, and combining an abstract base class with an interface contract
- `compositionAndPrivateFields.ts` — runtime-enforced `#private` fields, composition ("has-a") over inheritance, polymorphism through an interface, and swapping behaviour at runtime
- `methodChainingAndThisType.ts` — fluent method chaining by returning `this`, and the `this` return type so subclasses keep their own type mid-chain
- `classMethodOverloads.ts` — overloaded constructors, overloaded regular methods, and an overload whose return type narrows based on the input
- `interfaceExtensionAndMixins.ts` — interfaces extending multiple interfaces, and mixins for sharing behaviour across unrelated classes (since a class can only `extends` one parent)
- `staticFactoriesAndSingletons.ts` — private constructors, the singleton pattern via a static `getInstance()`, a static factory method that hides which subclass gets constructed, and named static factories as an alternative to subclassing
- `overrideKeyword.ts` — how a typo'd override silently fails without the `override` keyword, what `override` catches at compile time, and how it protects subclasses when a base class method is renamed or removed

## Run

```bash
npm run run -- src/04-oop/classBasics.ts
npm run run -- src/04-oop/inheritance.ts
npm run run -- src/04-oop/abstractClasses.ts
npm run run -- src/04-oop/compositionAndPrivateFields.ts
npm run run -- src/04-oop/methodChainingAndThisType.ts
npm run run -- src/04-oop/classMethodOverloads.ts
npm run run -- src/04-oop/interfaceExtensionAndMixins.ts
npm run run -- src/04-oop/staticFactoriesAndSingletons.ts
npm run run -- src/04-oop/overrideKeyword.ts
```
