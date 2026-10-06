// ─────────────────────────────────────────────
// 1. `#` private fields - the JavaScript-native
//    version of `private`. Enforced at RUNTIME too,
//    not just by the TypeScript compiler.
// ─────────────────────────────────────────────
class Wallet {
  #pin: string;
  balance: number;

  constructor(pin: string, balance: number) {
    this.#pin = pin;
    this.balance = balance;
  }

  checkPin(attempt: string): boolean {
    return this.#pin === attempt;
  }
}

const wallet = new Wallet("1234", 500);
console.log(`Correct PIN: ${wallet.checkPin("1234")}`);
console.log(`Wrong PIN: ${wallet.checkPin("0000")}`);
// wallet.#pin;   // Error: private identifiers are only accessible inside the class

// ─────────────────────────────────────────────
// 2. Composition over inheritance - instead of a
//    class inheriting behaviour, it HOLDS other
//    objects that provide that behaviour ("has-a"
//    instead of "is-a")
// ─────────────────────────────────────────────
class Engine {
  start(): string {
    return "Engine started";
  }
}

class GpsModule {
  locate(): string {
    return "Location: 51.5, -0.12";
  }
}

// Car HAS an engine and a GPS, rather than extending a big base class
class Car {
  constructor(
    private engine: Engine,
    private gps: GpsModule,
  ) {}

  drive(): void {
    console.log(this.engine.start());
    console.log(this.gps.locate());
  }
}

const car = new Car(new Engine(), new GpsModule());
car.drive();

// ─────────────────────────────────────────────
// 3. Polymorphism through an interface - code that
//    depends on the interface works with ANY class
//    that implements it, with no shared parent needed
// ─────────────────────────────────────────────
interface PaymentMethod {
  pay(amount: number): string;
}

class CreditCard implements PaymentMethod {
  pay(amount: number): string {
    return `Charged $${amount} to credit card`;
  }
}

class CryptoWallet implements PaymentMethod {
  pay(amount: number): string {
    return `Sent ${amount} units from crypto wallet`;
  }
}

function checkout(method: PaymentMethod, amount: number): void {
  console.log(method.pay(amount));
}

checkout(new CreditCard(), 40);
checkout(new CryptoWallet(), 40);

// ─────────────────────────────────────────────
// 4. Swapping behaviour at runtime - composition
//    lets you change a dependency without changing
//    the class that uses it
// ─────────────────────────────────────────────
class Checkout {
  constructor(private method: PaymentMethod) {}

  setMethod(method: PaymentMethod): void {
    this.method = method;
  }

  process(amount: number): void {
    console.log(this.method.pay(amount));
  }
}

const checkoutFlow = new Checkout(new CreditCard());
checkoutFlow.process(15);
checkoutFlow.setMethod(new CryptoWallet());
checkoutFlow.process(15);
