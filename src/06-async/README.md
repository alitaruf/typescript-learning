# 06 — Async

Promises and async/await.

## Files

- `promiseBasics.ts` — creating a `Promise`, `async`/`await` with `try`/`catch` for rejections, running concurrent operations with `Promise.all`, and collecting both successes and failures with `Promise.allSettled`
- `asyncIterationAndRace.ts` — sequential vs concurrent `await`, `Promise.race` for a timeout pattern, and async generators consumed with `for await...of`

## Run

```bash
npm run run -- src/06-async/promiseBasics.ts
npm run run -- src/06-async/asyncIterationAndRace.ts
```
