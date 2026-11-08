// ─────────────────────────────────────────────
// 1. Sequential vs concurrent await - awaiting one
//    at a time runs them back to back; starting all
//    the promises first lets them run concurrently
// ─────────────────────────────────────────────
function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function sequential(): Promise<void> {
  const start = Date.now();
  await delay(undefined, 30);
  await delay(undefined, 30);
  console.log(`Sequential took ~${Date.now() - start}ms`);
}

async function concurrent(): Promise<void> {
  const start = Date.now();
  const first = delay(undefined, 30);
  const second = delay(undefined, 30);
  await first;
  await second;
  console.log(`Concurrent took ~${Date.now() - start}ms`);
}

// ─────────────────────────────────────────────
// 2. Promise.race - settles as soon as the first
//    promise settles (fulfilled or rejected),
//    ignoring the rest
// ─────────────────────────────────────────────
async function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  const timeout = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error("Timed out")), timeoutMs);
  });
  return Promise.race([promise, timeout]);
}

async function raceDemo(): Promise<void> {
  try {
    const result = await fetchWithTimeout(delay("slow result", 100), 20);
    console.log(`Got: ${result}`);
  } catch (error) {
    console.log(`Race failed: ${(error as Error).message}`);
  }
}

// ─────────────────────────────────────────────
// 3. Async generators - a function that can `await`
//    and `yield` values one at a time, consumed with
//    `for await...of`
// ─────────────────────────────────────────────
async function* fetchPages(totalPages: number): AsyncGenerator<string> {
  for (let page = 1; page <= totalPages; page++) {
    await delay(undefined, 10);
    yield `page-${page}`;
  }
}

async function consumePages(): Promise<void> {
  for await (const page of fetchPages(3)) {
    console.log(`Received ${page}`);
  }
}

// ─────────────────────────────────────────────
// 4. Running the examples
// ─────────────────────────────────────────────
async function main(): Promise<void> {
  await sequential();
  await concurrent();
  await raceDemo();
  await consumePages();
}

main();
