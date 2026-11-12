// ─────────────────────────────────────────────
// 1. Promise.any - settles as soon as the first
//    promise fulfills, ignoring rejections unless
//    every single one rejects
// ─────────────────────────────────────────────
function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function failAfter(ms: number, message: string): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
}

async function anyDemo(): Promise<void> {
  const result = await Promise.any([
    failAfter(10, "mirror A failed"),
    delay("mirror B responded", 30),
    failAfter(20, "mirror C failed"),
  ]);
  console.log(`Promise.any: ${result}`);
}

// ─────────────────────────────────────────────
// 2. Running too many async tasks at once can
//    overwhelm a server or rate limit - a simple
//    concurrency limiter runs at most `limit` tasks
//    in flight at any given time
// ─────────────────────────────────────────────
async function runWithConcurrencyLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number,
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex++;
      const task = tasks[currentIndex]!;
      results[currentIndex] = await task();
    }
  }

  const workers = Array.from({ length: limit }, () => worker());
  await Promise.all(workers);
  return results;
}

async function concurrencyLimitDemo(): Promise<void> {
  let activeCount = 0;
  let maxActive = 0;

  const tasks = Array.from({ length: 6 }, (_, i) => async () => {
    activeCount++;
    maxActive = Math.max(maxActive, activeCount);
    await delay(undefined, 20);
    activeCount--;
    return `task-${i}`;
  });

  const results = await runWithConcurrencyLimit(tasks, 2);
  console.log(`Results: ${results.join(", ")}`);
  console.log(`Max concurrent tasks: ${maxActive}`);
}

// ─────────────────────────────────────────────
// 3. Microtasks vs macrotasks - promise callbacks
//    (microtasks) always run before the next
//    setTimeout callback (a macrotask), even one
//    scheduled with a 0ms delay and queued first
// ─────────────────────────────────────────────
function microtaskOrderingDemo(): void {
  console.log("1: sync start");

  setTimeout(() => console.log("4: setTimeout (macrotask)"), 0);

  Promise.resolve().then(() => console.log("3: Promise.then (microtask)"));

  console.log("2: sync end");
}

// ─────────────────────────────────────────────
// 4. Running the examples
// ─────────────────────────────────────────────
async function main(): Promise<void> {
  microtaskOrderingDemo();
  await delay(undefined, 10); // let the ordering demo above finish printing
  await anyDemo();
  await concurrencyLimitDemo();
}

main();
