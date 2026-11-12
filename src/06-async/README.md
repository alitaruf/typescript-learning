# 06 — Async

Promises and async/await.

## Files

- `promiseBasics.ts` — creating a `Promise`, `async`/`await` with `try`/`catch` for rejections, running concurrent operations with `Promise.all`, and collecting both successes and failures with `Promise.allSettled`
- `asyncIterationAndRace.ts` — sequential vs concurrent `await`, `Promise.race` for a timeout pattern, and async generators consumed with `for await...of`
- `retryAndCancellation.ts` — a custom `TransientError` type, retrying only transient failures with exponential backoff, and cancelling an in-flight async operation from the outside with `AbortController`
- `promisifyAndChaining.ts` — wrapping a Node-style `(error, result)` callback API in a function that returns a `Promise`, and consuming it both with `.then`/`.catch`/`.finally` chaining and with equivalent `async`/`await`
- `concurrencyLimitAndMicrotasks.ts` — `Promise.any` for "first success wins", a worker-pool concurrency limiter so only a few tasks run at once, and why a `Promise.then` callback (microtask) always runs before a `setTimeout` callback (macrotask)

## Run

```bash
npm run run -- src/06-async/promiseBasics.ts
npm run run -- src/06-async/asyncIterationAndRace.ts
npm run run -- src/06-async/retryAndCancellation.ts
npm run run -- src/06-async/promisifyAndChaining.ts
npm run run -- src/06-async/concurrencyLimitAndMicrotasks.ts
```
