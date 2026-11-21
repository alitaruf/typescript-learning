// ─────────────────────────────────────────────
// 1. Branded (nominal) types - plain `string`/`number`
//    aliases are structurally interchangeable, so nothing
//    stops you from passing a UserId where an OrderId is
//    expected. A brand adds a fake, compile-time-only
//    property that makes each one a distinct type.
// ─────────────────────────────────────────────
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };

function asUserId(value: string): UserId {
  return value as UserId;
}

function asOrderId(value: string): OrderId {
  return value as OrderId;
}

function getUser(id: UserId): string {
  return `user:${id}`;
}

const userId = asUserId("u-1");
const orderId = asOrderId("o-1");

console.log(getUser(userId));
// console.log(getUser(orderId)); // Error: OrderId is not assignable to UserId
// console.log(getUser("u-1"));   // Error: plain string isn't a UserId either

// ─────────────────────────────────────────────
// 2. Assertion functions - like a type guard, but instead
//    of returning a boolean to narrow in an `if`, they throw
//    when the check fails and narrow everything after the call
// ─────────────────────────────────────────────
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError(`Expected a string, got ${typeof value}`);
  }
}

function printLength(value: unknown): void {
  assertIsString(value);
  // from here on, `value` is narrowed to `string` - no cast needed
  console.log(`Length: ${value.length}`);
}

printLength("hello");
try {
  printLength(42);
} catch (error) {
  console.log(`Caught: ${(error as Error).message}`);
}

// ─────────────────────────────────────────────
// 3. `asserts this` - a narrower variant used on methods,
//    asserting something about the calling object itself
// ─────────────────────────────────────────────
class Connection {
  private ready = false;

  connect(): void {
    this.ready = true;
  }

  assertConnected(): asserts this is this & { ready: true } {
    if (!this.ready) {
      throw new Error("Not connected");
    }
  }

  send(message: string): void {
    this.assertConnected();
    console.log(`Sending: ${message}`);
  }
}

const connection = new Connection();
connection.connect();
connection.send("ping");
