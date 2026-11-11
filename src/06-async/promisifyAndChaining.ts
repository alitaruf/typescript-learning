// ─────────────────────────────────────────────
// 1. A callback-style API - the kind many older
//    Node.js and browser APIs still use: pass a
//    callback that gets (error, result)
// ─────────────────────────────────────────────
type NodeCallback<T> = (error: Error | null, result?: T) => void;

function readConfigCallbackStyle(key: string, callback: NodeCallback<string>): void {
  setTimeout(() => {
    if (key === "missing") {
      callback(new Error(`No config for "${key}"`));
      return;
    }
    callback(null, `value-for-${key}`);
  }, 20);
}

// ─────────────────────────────────────────────
// 2. Promisifying - wrap the callback API in a
//    function that returns a Promise, so it can be
//    used with `await` instead of nested callbacks
// ─────────────────────────────────────────────
function readConfig(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readConfigCallbackStyle(key, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result!);
      }
    });
  });
}

// ─────────────────────────────────────────────
// 3. .then/.catch/.finally chaining - the same
//    promise can be consumed without async/await,
//    by chaining handlers directly
// ─────────────────────────────────────────────
function readConfigWithChaining(key: string): void {
  readConfig(key)
    .then((value) => console.log(`Chained: ${value}`))
    .catch((error: Error) => console.log(`Chained error: ${error.message}`))
    .finally(() => console.log(`Chained: done with "${key}"`));
}

// ─────────────────────────────────────────────
// 4. The same logic written with async/await -
//    equivalent behaviour, usually easier to read
//    once there's more than one step involved
// ─────────────────────────────────────────────
async function readConfigWithAwait(key: string): Promise<void> {
  try {
    const value = await readConfig(key);
    console.log(`Awaited: ${value}`);
  } catch (error) {
    console.log(`Awaited error: ${(error as Error).message}`);
  } finally {
    console.log(`Awaited: done with "${key}"`);
  }
}

// ─────────────────────────────────────────────
// 5. Running the examples
// ─────────────────────────────────────────────
async function main(): Promise<void> {
  readConfigWithChaining("timeout");
  await readConfigWithAwait("timeout");
  await readConfigWithAwait("missing");
}

main();
