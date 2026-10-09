// ─────────────────────────────────────────────
// 1. Interfaces extending interfaces - build a
//    bigger contract out of smaller ones, the
//    same way a class extends a class
// ─────────────────────────────────────────────
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// Employee requires everything from BOTH parent interfaces, plus its own field
interface Employee extends Named, Aged {
  employeeId: number;
}

class StaffMember implements Employee {
  constructor(
    public name: string,
    public age: number,
    public employeeId: number,
  ) {}
}

const staff = new StaffMember("Ali", 28, 101);
console.log(`${staff.name} (#${staff.employeeId}), age ${staff.age}`);

// ─────────────────────────────────────────────
// 2. Mixins - TypeScript/JavaScript classes only
//    support ONE parent via `extends`. A mixin is a
//    function that takes a base class and returns a
//    new class with extra behaviour bolted on - a way
//    to share behaviour across unrelated classes.
// ─────────────────────────────────────────────
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();

    getAge(): number {
      return Date.now() - this.createdAt.getTime();
    }
  };
}

function Serializable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    serialize(): string {
      return JSON.stringify(this);
    }
  };
}

class Document {
  constructor(public title: string) {}
}

// Stack both mixins onto the same base class
const TimestampedSerializableDocument = Serializable(Timestamped(Document));

const doc = new TimestampedSerializableDocument("Report.pdf");
console.log(`Title: ${doc.title}`);
console.log(`Age in ms: ${doc.getAge()}`);
console.log(`Serialized: ${doc.serialize()}`);

// ─────────────────────────────────────────────
// 3. Why mixins instead of more inheritance -
//    `Timestamped` and `Serializable` can each be
//    reused on a totally different base class too
// ─────────────────────────────────────────────
class Image {
  constructor(public url: string) {}
}

const TimestampedImage = Timestamped(Image);
const image = new TimestampedImage("photo.png");
console.log(`Image age in ms: ${image.getAge()}`);
