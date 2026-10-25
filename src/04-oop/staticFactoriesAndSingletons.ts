// ─────────────────────────────────────────────
// 1. A private constructor - only the class itself
//    can create instances with `new`. Outside code
//    must go through a static method instead.
// ─────────────────────────────────────────────
class Singleton {
  private static instance: Singleton;

  private constructor(public readonly id: number) {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(Math.random());
    }
    return Singleton.instance;
  }
}

// const broken = new Singleton(1);   // Error: constructor is private

const first = Singleton.getInstance();
const second = Singleton.getInstance();
console.log(`Same instance: ${first === second}`);

// ─────────────────────────────────────────────
// 2. A static factory method - hides which concrete
//    subclass gets constructed behind one entry point
// ─────────────────────────────────────────────
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  area(): number {
    return this.side ** 2;
  }
}

class ShapeFactory {
  static create(kind: "circle" | "square", size: number): Shape {
    switch (kind) {
      case "circle":
        return new Circle(size);
      case "square":
        return new Square(size);
    }
  }
}

const circle = ShapeFactory.create("circle", 2);
console.log(`Circle area: ${circle.area().toFixed(2)}`);

// ─────────────────────────────────────────────
// 3. Private constructor + named static factories -
//    different "flavors" of the same class, with no
//    subclassing needed
// ─────────────────────────────────────────────
class Color {
  private constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
  ) {}

  static rgb(r: number, g: number, b: number): Color {
    return new Color(r, g, b);
  }

  static fromHex(hex: string): Color {
    const value = parseInt(hex.replace("#", ""), 16);
    return new Color((value >> 16) & 255, (value >> 8) & 255, value & 255);
  }

  toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

console.log(`Color.rgb: ${Color.rgb(255, 0, 0)}`);
console.log(`Color.fromHex: ${Color.fromHex("#00ff00")}`);
