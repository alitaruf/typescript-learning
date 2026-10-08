// ─────────────────────────────────────────────
// 1. Overloaded constructors - list each allowed
//    "shape" of arguments, then write ONE real
//    implementation that handles all of them
// ─────────────────────────────────────────────
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number);
  constructor(pair: [number, number]);
  constructor(xOrPair: number | [number, number], y?: number) {
    if (Array.isArray(xOrPair)) {
      [this.x, this.y] = xOrPair;
    } else {
      this.x = xOrPair;
      this.y = y as number;
    }
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

const p1 = new Point(3, 4);
const p2 = new Point([5, 6]);
// new Point(1);        // Error: doesn't match either overload
console.log(`p1: ${p1.toString()}, p2: ${p2.toString()}`);

// ─────────────────────────────────────────────
// 2. Overloaded methods - same idea, but on a
//    regular method instead of the constructor
// ─────────────────────────────────────────────
class Logger {
  log(message: string): void;
  log(code: number, message: string): void;
  log(messageOrCode: string | number, message?: string): void {
    if (typeof messageOrCode === "number") {
      console.log(`[${messageOrCode}] ${message}`);
    } else {
      console.log(messageOrCode);
    }
  }
}

const logger = new Logger();
logger.log("Server started");
logger.log(404, "Not found");
// logger.log(404);     // Error: this overload needs a message too

// ─────────────────────────────────────────────
// 3. Overloads that narrow the RETURN type based
//    on the input - useful when one method's
//    output genuinely depends on which overload matched
// ─────────────────────────────────────────────
class Repository {
  private items = new Map<number, string>([
    [1, "Laptop"],
    [2, "Phone"],
  ]);

  find(id: number): string | undefined;
  find(ids: number[]): (string | undefined)[];
  find(idOrIds: number | number[]): string | undefined | (string | undefined)[] {
    if (Array.isArray(idOrIds)) {
      return idOrIds.map((id) => this.items.get(id));
    }
    return this.items.get(idOrIds);
  }
}

const repo = new Repository();
const one = repo.find(1); // string | undefined
const many = repo.find([1, 2, 3]); // (string | undefined)[]

console.log(`One: ${one}`);
console.log(`Many: ${many.join(", ")}`);
