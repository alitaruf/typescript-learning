# 07 — Design Patterns

Common design patterns (singleton, factory, observer, etc.) implemented in TypeScript.

## Files

- `observerPattern.ts` — a `Subject`/`Observer` pair of interfaces, a `NewsPublisher` that notifies all subscribed observers on an event, and subscribing/unsubscribing at runtime
- `strategyPattern.ts` — a `PricingStrategy` interface with interchangeable concrete algorithms, and a `Checkout` context that delegates to whichever strategy it's given and can swap strategies at runtime

## Run

```bash
npm run run -- src/07-design-patterns/observerPattern.ts
npm run run -- src/07-design-patterns/strategyPattern.ts
```
