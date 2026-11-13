// ─────────────────────────────────────────────
// 1. Mapped types - build a new type by looping
//    over the keys of an existing one and transforming
//    each property's type
// ─────────────────────────────────────────────
interface Task {
  id: number;
  title: string;
  done: boolean;
}

type ReadonlyVersion<T> = {
  readonly [K in keyof T]: T[K];
};

type OptionalVersion<T> = {
  [K in keyof T]?: T[K];
};

const frozenTask: ReadonlyVersion<Task> = { id: 1, title: "Write docs", done: false };
// frozenTask.done = true; // Error: readonly property

const partialTask: OptionalVersion<Task> = { title: "Just a title" };

// ─────────────────────────────────────────────
// 2. The built-in utility types are themselves just
//    mapped types - `Partial`, `Readonly`, and `Pick`
//    do what the two above do (plus field selection)
// ─────────────────────────────────────────────
type TaskPreview = Pick<Task, "id" | "title">;
type TaskWithoutId = Omit<Task, "id">;
type TaskLookup = Record<number, Task>;

const preview: TaskPreview = { id: 1, title: "Write docs" };
const lookup: TaskLookup = { 1: { id: 1, title: "Write docs", done: false } };

// ─────────────────────────────────────────────
// 3. Conditional types - choose between two types
//    based on whether one type is assignable to
//    another, written as `T extends U ? X : Y`
// ─────────────────────────────────────────────
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>; // false

// ─────────────────────────────────────────────
// 4. `infer` - extract a type from inside another
//    type while pattern-matching in a conditional type
// ─────────────────────────────────────────────
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Unwrapped = UnwrapPromise<Promise<string>>; // string
type AlreadyPlain = UnwrapPromise<number>; // number

function logUnwrapped(value: Unwrapped, other: AlreadyPlain): void {
  console.log(`Unwrapped: ${value}, AlreadyPlain: ${other}`);
}

logUnwrapped("resolved value", 42);

// ─────────────────────────────────────────────
// 5. Distributive conditional types - when T is a
//    union, `T extends U ? X : Y` applies to each
//    member of the union separately
// ─────────────────────────────────────────────
type ToArray<T> = T extends unknown ? T[] : never;

type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

const mixed: StringOrNumberArray = ["a", "b"];
console.log(mixed);

console.log(frozenTask, partialTask, preview, lookup);
