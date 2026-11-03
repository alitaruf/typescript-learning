// ─────────────────────────────────────────────
// 1. A Promise wraps a value that isn't available
//    yet - it settles exactly once, either resolved
//    with a value or rejected with an error
// ─────────────────────────────────────────────
function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

function fetchUser(id: number): Promise<{ id: number; name: string }> {
  if (id <= 0) {
    return Promise.reject(new Error(`Invalid user id: ${id}`));
  }
  return delay({ id, name: `User${id}` }, 50);
}

// ─────────────────────────────────────────────
// 2. async/await - write asynchronous code that
//    reads like synchronous code, with try/catch
//    for rejected promises
// ─────────────────────────────────────────────
async function printUser(id: number): Promise<void> {
  try {
    const user = await fetchUser(id);
    console.log(`Found: ${user.name}`);
  } catch (error) {
    console.log(`Failed: ${(error as Error).message}`);
  }
}

// ─────────────────────────────────────────────
// 3. Promise.all - run independent async operations
//    concurrently and wait for all of them; rejects
//    as soon as any one of them rejects
// ─────────────────────────────────────────────
async function printAllUsers(ids: number[]): Promise<void> {
  const users = await Promise.all(ids.map((id) => fetchUser(id)));
  console.log(`All users: ${users.map((u) => u.name).join(", ")}`);
}

// ─────────────────────────────────────────────
// 4. Promise.allSettled - like Promise.all, but
//    never short-circuits; every result comes back
//    tagged as either fulfilled or rejected
// ─────────────────────────────────────────────
async function printSettledUsers(ids: number[]): Promise<void> {
  const results = await Promise.allSettled(ids.map((id) => fetchUser(id)));
  for (const result of results) {
    if (result.status === "fulfilled") {
      console.log(`  ok: ${result.value.name}`);
    } else {
      console.log(`  error: ${(result.reason as Error).message}`);
    }
  }
}

// ─────────────────────────────────────────────
// 5. Running the examples
// ─────────────────────────────────────────────
async function main(): Promise<void> {
  await printUser(1);
  await printUser(-1);
  await printAllUsers([1, 2, 3]);
  await printSettledUsers([1, -1, 2]);
}

main();
