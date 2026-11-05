# 07 — Design Patterns

Common design patterns (singleton, factory, observer, etc.) implemented in TypeScript.

## Files

- `observerPattern.ts` — a `Subject`/`Observer` pair of interfaces, a `NewsPublisher` that notifies all subscribed observers on an event, and subscribing/unsubscribing at runtime
- `strategyPattern.ts` — a `PricingStrategy` interface with interchangeable concrete algorithms, and a `Checkout` context that delegates to whichever strategy it's given and can swap strategies at runtime
- `decoratorPattern.ts` — a `Coffee` interface, an abstract `CoffeeDecorator` that wraps another `Coffee`, and concrete decorators stacked at runtime to add behaviour without subclassing every combination
- `adapterPattern.ts` — a `PaymentProcessor` interface, a `LegacyGateway` with an incompatible shape, and an adapter that translates calls so client code can treat the legacy and a native implementation the same way

## Run

```bash
npm run run -- src/07-design-patterns/observerPattern.ts
npm run run -- src/07-design-patterns/strategyPattern.ts
npm run run -- src/07-design-patterns/decoratorPattern.ts
npm run run -- src/07-design-patterns/adapterPattern.ts
```
