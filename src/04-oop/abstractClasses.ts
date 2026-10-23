// ─────────────────────────────────────────────
// 1. An abstract class - a blueprint that can't
//    be instantiated directly. It exists only to
//    be extended by other classes.
// ─────────────────────────────────────────────
abstract class Shape {
  constructor(public name: string) {}

  // Abstract method: no body here. Every subclass MUST implement it.
  abstract area(): number;

  // Regular method: shared by all subclasses, written once.
  describe(): string {
    return `${this.name} with area ${this.area().toFixed(2)}`;
  }
}

// const shape = new Shape("generic");   // Error: cannot create an instance of an abstract class

class Circle extends Shape {
  constructor(public radius: number) {
    super("Circle");
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(
    public width: number,
    public height: number,
  ) {
    super("Rectangle");
  }

  area(): number {
    return this.width * this.height;
  }
}

// class Triangle extends Shape {}   // Error: non-abstract class must implement 'area'

const shapes: Shape[] = [new Circle(2), new Rectangle(3, 4)];
for (const shape of shapes) {
  console.log(shape.describe());
}

// ─────────────────────────────────────────────
// 2. `implements` - a class promises to follow an
//    interface's shape. Unlike `extends`, a class
//    can implement MANY interfaces at once.
// ─────────────────────────────────────────────
interface Printable {
  print(): void;
}

interface Savable {
  save(): void;
}

class Report implements Printable, Savable {
  constructor(private content: string) {}

  print(): void {
    console.log(`Printing report: ${this.content}`);
  }

  save(): void {
    console.log(`Saved report: ${this.content}`);
  }
}

const report = new Report("Q3 sales");
report.print();
report.save();

// ─────────────────────────────────────────────
// 3. Abstract class + interface together - a
//    common pattern: the abstract class provides
//    shared behaviour, the interface defines the
//    contract that every implementation must meet.
// ─────────────────────────────────────────────
interface Notifier {
  send(message: string): void;
}

abstract class BaseNotifier implements Notifier {
  send(message: string): void {
    const formatted = this.format(message);
    console.log(`[${this.channel()}] ${formatted}`);
  }

  protected format(message: string): string {
    return message.trim();
  }

  protected abstract channel(): string;
}

class EmailNotifier extends BaseNotifier {
  protected channel(): string {
    return "EMAIL";
  }
}

class SmsNotifier extends BaseNotifier {
  protected channel(): string {
    return "SMS";
  }

  protected format(message: string): string {
    return message.slice(0, 40); // SMS has a length limit
  }
}

new EmailNotifier().send("  Your order has shipped  ");
new SmsNotifier().send("Your order has shipped and arrives tomorrow morning.");
