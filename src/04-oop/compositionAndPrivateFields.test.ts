const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  Wallet,
  Engine,
  GpsModule,
  Car,
  CreditCard,
  CryptoWallet,
  Checkout,
} = require("./compositionAndPrivateFields");

test("#pin is checked through checkPin(), not read directly", () => {
  const wallet = new Wallet("1234", 500);
  assert.equal(wallet.checkPin("1234"), true);
  assert.equal(wallet.checkPin("0000"), false);
});

test("Car is composed of an Engine and a GpsModule rather than extending them", () => {
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);

  try {
    new Car(new Engine(), new GpsModule()).drive();
  } finally {
    console.log = originalLog;
  }

  assert.deepEqual(lines, ["Engine started", "Location: 51.5, -0.12"]);
});

test("checkout() works with any PaymentMethod implementation, no shared parent needed", () => {
  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);

  try {
    console.log(new CreditCard().pay(40));
    console.log(new CryptoWallet().pay(40));
  } finally {
    console.log = originalLog;
  }

  assert.equal(lines[0], "Charged $40 to credit card");
  assert.equal(lines[1], "Sent 40 units from crypto wallet");
});

test("Checkout can swap its PaymentMethod dependency at runtime", () => {
  const checkoutFlow = new Checkout(new CreditCard());
  checkoutFlow.setMethod(new CryptoWallet());

  const lines: string[] = [];
  const originalLog = console.log;
  console.log = (line: string) => lines.push(line);
  try {
    checkoutFlow.process(15);
  } finally {
    console.log = originalLog;
  }

  assert.equal(lines[0], "Sent 15 units from crypto wallet");
});
