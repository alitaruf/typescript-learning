# 06 — Async

Promises and async/await.

## Files

- `promiseBasics.ts` — creating a `Promise`, `async`/`await` with `try`/`catch` for rejections, running concurrent operations with `Promise.all`, and collecting both successes and failures with `Promise.allSettled`
- `asyncIterationAndRace.ts` — sequential vs concurrent `await`, `Promise.race` for a timeout pattern, and async generators consumed with `for await...of`
- `retryAndCancellation.ts` — a custom `TransientError` type, retrying only transient failures with exponential backoff, and cancelling an in-flight async operation from the outside with `AbortController`

## Run

```bash
npm run run -- src/06-async/promiseBasics.ts
npm run run -- src/06-async/asyncIterationAndRace.ts
npm run run -- src/06-async/retryAndCancellation.ts
```
