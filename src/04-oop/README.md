# 04 — OOP

Classes, inheritance, access modifiers, abstract classes.

## Files

- `classBasics.ts` — classes with a constructor and methods, parameter properties, access modifiers (`public`/`private`), readonly properties, getters/setters, and static members
- `classBasics.test.ts` — tests for the above, covering `Person`, `Product`, `BankAccount`, `Order`, `Temperature`, and `Counter`
- `inheritance.ts` — `extends`, `super` calls, method overriding, `protected` members, and `instanceof` across an inheritance chain
- `inheritance.test.ts` — tests for the above, covering inherited/overridden `move()`, `super` calls, `protected` access from `Car`, and `instanceof` across the chain
- `abstractClasses.ts` — abstract classes and abstract methods, `implements` for multiple interfaces, and combining an abstract base class with an interface contract
- `abstractClasses.test.ts` — tests for the above, covering `Circle`/`Rectangle` implementing `area()`, `Report` implementing two interfaces, and `BaseNotifier`'s shared `send()` with per-subclass `channel()`/`format()`
- `compositionAndPrivateFields.ts` — runtime-enforced `#private` fields, composition ("has-a") over inheritance, polymorphism through an interface, and swapping behaviour at runtime
- `compositionAndPrivateFields.test.ts` — tests for the above, covering `Wallet`'s `#pin` check, `Car`'s composed `Engine`/`GpsModule`, polymorphic `checkout()`, and `Checkout.setMethod()` swapping behaviour at runtime
- `methodChainingAndThisType.ts` — fluent method chaining by returning `this`, and the `this` return type so subclasses keep their own type mid-chain
- `methodChainingAndThisType.test.ts` — tests for the above, covering `QueryBuilder` chaining, `Dog` chaining its own methods mid-chain via `this`, and `Cart` state across chained calls
- `classMethodOverloads.ts` — overloaded constructors, overloaded regular methods, and an overload whose return type narrows based on the input
- `classMethodOverloads.test.ts` — tests for the above, covering both `Point` constructor overloads, `Logger.log()`'s two call shapes, and `Repository.find()`'s narrowed return type
- `interfaceExtensionAndMixins.ts` — interfaces extending multiple interfaces, and mixins for sharing behaviour across unrelated classes (since a class can only `extends` one parent)
- `interfaceExtensionAndMixins.test.ts` — tests for the above, covering `StaffMember`, the `Timestamped`/`Serializable` mixins individually and stacked, and reuse across unrelated base classes

## Run

```bash
npm run run -- src/04-oop/classBasics.ts
npm run run -- src/04-oop/inheritance.ts
npm run run -- src/04-oop/abstractClasses.ts
npm run run -- src/04-oop/compositionAndPrivateFields.ts
npm run run -- src/04-oop/methodChainingAndThisType.ts
npm run run -- src/04-oop/classMethodOverloads.ts
npm run run -- src/04-oop/interfaceExtensionAndMixins.ts
```

## Test

```bash
npm test
```
