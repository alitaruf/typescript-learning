// ─────────────────────────────────────────────
// 1. The Adapter pattern - convert the interface
//    of an existing class into another interface
//    that the client code actually expects
// ─────────────────────────────────────────────
interface PaymentProcessor {
  pay(amountInDollars: number): void;
}

// ─────────────────────────────────────────────
// 2. The existing (incompatible) class - maybe it's
//    a third-party library you can't change, with its
//    own shape: cents instead of dollars, different method name
// ─────────────────────────────────────────────
class LegacyGateway {
  sendPaymentInCents(cents: number): void {
    console.log(`LegacyGateway charged ${cents} cents`);
  }
}

// ─────────────────────────────────────────────
// 3. The adapter - implements the interface the
//    client expects, and translates each call into
//    whatever the wrapped class actually needs
// ─────────────────────────────────────────────
class LegacyGatewayAdapter implements PaymentProcessor {
  constructor(private legacyGateway: LegacyGateway) {}

  pay(amountInDollars: number): void {
    const cents = Math.round(amountInDollars * 100);
    this.legacyGateway.sendPaymentInCents(cents);
  }
}

// ─────────────────────────────────────────────
// 4. A second, already-compatible implementation,
//    so the client can treat both the same way
// ─────────────────────────────────────────────
class ModernGateway implements PaymentProcessor {
  pay(amountInDollars: number): void {
    console.log(`ModernGateway charged $${amountInDollars.toFixed(2)}`);
  }
}

// ─────────────────────────────────────────────
// 5. Client code only ever talks to PaymentProcessor -
//    it doesn't know or care whether it's using the
//    legacy gateway through an adapter or a native one
// ─────────────────────────────────────────────
function checkout(processor: PaymentProcessor, amount: number): void {
  processor.pay(amount);
}

checkout(new LegacyGatewayAdapter(new LegacyGateway()), 19.99);
checkout(new ModernGateway(), 19.99);
