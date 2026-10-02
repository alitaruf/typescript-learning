// ─────────────────────────────────────────────
// 1. A generic `map` - transforms every item of
//    type `T` into an item of type `U`. Two type
//    parameters are needed because input and
//    output can be completely different types.
// ─────────────────────────────────────────────
function map<T, U>(items: T[], transform: (item: T) => U): U[] {
  const result: U[] = [];
  for (const item of items) {
    result.push(transform(item));
  }
  return result;
}

const numbers = [1, 2, 3, 4];
const doubled = map(numbers, (n) => n * 2); // U inferred as number
const labels = map(numbers, (n) => `#${n}`); // U inferred as string

console.log(`Doubled: ${doubled.join(", ")}`);
console.log(`Labels: ${labels.join(", ")}`);

// ─────────────────────────────────────────────
// 2. A generic `filter` - keeps items of the
//    SAME type `T` that pass a predicate
// ─────────────────────────────────────────────
function filter<T>(items: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

const evens = filter(numbers, (n) => n % 2 === 0);
console.log(`Evens: ${evens.join(", ")}`);

// ─────────────────────────────────────────────
// 3. A generic `groupBy` - buckets items into a
//    `Record` keyed by whatever the key function
//    returns, reusing the `keyof`-style pattern
// ─────────────────────────────────────────────
function groupBy<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const item of items) {
    const key = getKey(item);
    (groups[key] ??= []).push(item);
  }
  return groups;
}

type Task = { title: string; status: "todo" | "done" };

const tasks: Task[] = [
  { title: "Write code", status: "done" },
  { title: "Write tests", status: "todo" },
  { title: "Review PR", status: "done" },
];

const tasksByStatus = groupBy(tasks, (task) => task.status);
console.log(`Done: ${tasksByStatus.done?.length ?? 0}`);
console.log(`Todo: ${tasksByStatus.todo?.length ?? 0}`);

// ─────────────────────────────────────────────
// 4. A generic `merge` - combines two objects
//    into one intersection type, with the
//    second object's fields winning on conflict
// ─────────────────────────────────────────────
function merge<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...a, ...b };
}

const defaults = { retries: 3, timeoutMs: 1000 };
const overrides = { timeoutMs: 5000, verbose: true };

const config = merge(defaults, overrides); // type: { retries, timeoutMs, verbose }
console.log(`retries: ${config.retries}, timeoutMs: ${config.timeoutMs}, verbose: ${config.verbose}`);
