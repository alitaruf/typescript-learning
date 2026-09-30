// ─────────────────────────────────────────────
// 1. A generic class - `<T>` on the class itself
//    means every property/method can share the
//    same placeholder type, fixed once per instance
// ─────────────────────────────────────────────
class Box<T> {
  private contents: T;

  constructor(value: T) {
    this.contents = value;
  }

  getContents(): T {
    return this.contents;
  }

  setContents(value: T): void {
    this.contents = value;
  }
}

const numberBox = new Box<number>(42); // T is fixed to number for this instance
const stringBox = new Box("hello"); // T inferred as string from the constructor arg

console.log(`numberBox: ${numberBox.getContents()}`);
console.log(`stringBox: ${stringBox.getContents()}`);

numberBox.setContents(100);
// numberBox.setContents("oops");   // Error: this Box is locked to number

console.log(`numberBox after update: ${numberBox.getContents()}`);

// ─────────────────────────────────────────────
// 2. A generic class holding a collection - a
//    realistic use case: a typed stack
// ─────────────────────────────────────────────
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const taskStack = new Stack<string>();
taskStack.push("Write code");
taskStack.push("Write tests");
taskStack.push("Review PR");

console.log(`Stack size: ${taskStack.size}`);
console.log(`Top task: ${taskStack.peek()}`);
console.log(`Popped: ${taskStack.pop()}`);
console.log(`Stack size after pop: ${taskStack.size}`);

// ─────────────────────────────────────────────
// 3. Constraining a class's type parameter -
//    same `extends` rule as generic functions
// ─────────────────────────────────────────────
type Identifiable = { id: number };

class Repository<T extends Identifiable> {
  private records: T[] = [];

  add(record: T): void {
    this.records.push(record);
  }

  findById(id: number): T | undefined {
    return this.records.find((record) => record.id === id);
  }
}

type User = { id: number; name: string };

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "Ali" });
userRepo.add({ id: 2, name: "Sara" });

console.log(`Found: ${userRepo.findById(2)?.name}`);
console.log(`Not found: ${userRepo.findById(99)?.name ?? "no user"}`);
