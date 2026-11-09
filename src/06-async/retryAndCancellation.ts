// ─────────────────────────────────────────────
// 1. A custom error type - lets callers tell apart
//    "this failed in a way worth retrying" from
//    other errors using `instanceof`
// ─────────────────────────────────────────────
class TransientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TransientError";
  }
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("Aborted"));
    });
  });
}

// ─────────────────────────────────────────────
// 2. Retry with exponential backoff - keep retrying
//    only transient failures, waiting longer between
//    each attempt, and give up after a fixed number
// ─────────────────────────────────────────────
let attemptCount = 0;

async function flakyRequest(): Promise<string> {
  attemptCount++;
  if (attemptCount < 3) {
    throw new TransientError(`attempt ${attemptCount} failed`);
  }
  return "success";
}

async function withRetry<T>(task: () => Promise<T>, maxAttempts: number): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await task();
    } catch (error) {
      if (!(error instanceof TransientError) || attempt === maxAttempts) {
        throw error;
      }
      const backoffMs = 10 * 2 ** (attempt - 1);
      console.log(`Retrying after ${(error as Error).message}, waiting ${backoffMs}ms`);
      await delay(backoffMs);
    }
  }
  throw new Error("unreachable");
}

// ─────────────────────────────────────────────
// 3. Cancellation with AbortController - a caller
//    can cancel an in-flight async operation from
//    the outside, without the task polling for it
// ─────────────────────────────────────────────
async function cancellableTask(signal: AbortSignal): Promise<void> {
  console.log("Task started");
  await delay(100, signal);
  console.log("Task finished (should not print if cancelled)");
}

async function cancellationDemo(): Promise<void> {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 20);

  try {
    await cancellableTask(controller.signal);
  } catch (error) {
    console.log(`Cancellation demo: ${(error as Error).message}`);
  }
}

// ─────────────────────────────────────────────
// 4. Running the examples
// ─────────────────────────────────────────────
async function main(): Promise<void> {
  const result = await withRetry(flakyRequest, 5);
  console.log(`Final result: ${result}`);

  await cancellationDemo();
}

main();
