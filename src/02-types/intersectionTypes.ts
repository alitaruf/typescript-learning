// ─────────────────────────────────────────────
// 1. Intersection types (`&`) combine multiple
//    types into one that has ALL of their members
//    (unions with `|` mean "one OR the other";
//    intersections with `&` mean "all combined")
// ─────────────────────────────────────────────
type Named = {
  name: string;
};

type Aged = {
  age: number;
};

type Person = Named & Aged;

const person: Person = {
  name: "Taruf",
  age: 28,
};

console.log(`Name: ${person.name}, Age: ${person.age}`);

// ─────────────────────────────────────────────
// 2. Combining more than two types
// ─────────────────────────────────────────────
type Employed = {
  company: string;
};

type Employee = Named & Aged & Employed;

const employee: Employee = {
  name: "Sara",
  age: 32,
  company: "Acme Corp",
};

function printEmployee(e: Employee): void {
  console.log(`${e.name} (${e.age}) works at ${e.company}`);
}

printEmployee(employee);

// ─────────────────────────────────────────────
// 3. Intersecting an interface with a type alias
//    works the same way as intersecting two aliases
// ─────────────────────────────────────────────
interface Timestamped {
  createdAt: Date;
}

type LoggedEvent = Timestamped & {
  message: string;
};

const event: LoggedEvent = {
  createdAt: new Date(),
  message: "User logged in",
};

console.log(`[${event.createdAt.toISOString()}] ${event.message}`);
