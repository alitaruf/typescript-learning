// ─────────────────────────────────────────────
// 1. Rest parameters - collect any number of
//    extra arguments into a single typed array
// ─────────────────────────────────────────────
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(`sum(1, 2) = ${sum(1, 2)}`);
console.log(`sum(1, 2, 3, 4, 5) = ${sum(1, 2, 3, 4, 5)}`);
console.log(`sum() = ${sum()}`); // rest params can also receive zero arguments

// ─────────────────────────────────────────────
// 2. Combining regular parameters with a rest
//    parameter - rest must always come last
// ─────────────────────────────────────────────
function greetAll(greeting: string, ...names: string[]): string {
  return `${greeting}, ${names.join(" and ")}!`;
}

console.log(greetAll("Hello", "Ali"));
console.log(greetAll("Hi", "Sara", "Zara", "Ahmed"));

// ─────────────────────────────────────────────
// 3. Spreading an array into a function call -
//    the reverse of collecting: expand an array
//    into individual arguments
// ─────────────────────────────────────────────
const values = [4, 8, 15, 16, 23, 42];

console.log(`Max: ${Math.max(...values)}`);
console.log(`Min: ${Math.min(...values)}`);
console.log(`Sum via spread: ${sum(...values)}`);

// ─────────────────────────────────────────────
// 4. Rest parameters with a specific object type -
//    useful for functions that accept a variable
//    number of structured items
// ─────────────────────────────────────────────
type Task = { title: string; done: boolean };

function countDone(...tasks: Task[]): number {
  return tasks.filter((task) => task.done).length;
}

const completed = countDone(
  { title: "Write code", done: true },
  { title: "Write tests", done: false },
  { title: "Review PR", done: true },
);

console.log(`Completed tasks: ${completed}`);
