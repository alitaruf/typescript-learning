// ─────────────────────────────────────────────
// 1. Optional properties (`?`) - a property that
//    may or may not be present on the object
// ─────────────────────────────────────────────
type Profile = {
  username: string;
  bio?: string; // optional - may be undefined
};

function printBio(profile: Profile): void {
  console.log(`Bio: ${profile.bio ?? "No bio provided"}`);
}

printBio({ username: "taruf", bio: "Learning TypeScript" });
printBio({ username: "sara" }); // bio omitted entirely - still valid

// ─────────────────────────────────────────────
// 2. Readonly properties - can be read but not
//    reassigned after the object is created
// ─────────────────────────────────────────────
type Config = {
  readonly apiUrl: string;
  timeoutMs: number;
};

const config: Config = { apiUrl: "https://api.example.com", timeoutMs: 5000 };
config.timeoutMs = 8000; // fine - not readonly
// config.apiUrl = "https://other.com";   // Error: cannot assign to readonly property

console.log(`API: ${config.apiUrl}, timeout: ${config.timeoutMs}ms`);

// ─────────────────────────────────────────────
// 3. Optional chaining (`?.`) - safely access a
//    nested property that might not exist,
//    instead of crashing on `undefined`
// ─────────────────────────────────────────────
type Order = {
  id: number;
  shipping?: {
    address: string;
  };
};

function printShippingAddress(order: Order): void {
  console.log(`Address: ${order.shipping?.address ?? "Not set"}`);
}

printShippingAddress({ id: 1, shipping: { address: "123 Main St" } });
printShippingAddress({ id: 2 }); // no shipping - `?.` short-circuits to undefined

// ─────────────────────────────────────────────
// 4. Nullish coalescing (`??`) - provide a
//    fallback only for null/undefined, unlike `||`
//    which also replaces 0, "", and false
// ─────────────────────────────────────────────
function getDiscount(percent: number | undefined): number {
  return percent ?? 10; // fallback only if percent is null/undefined
}

console.log(`Discount: ${getDiscount(0)}%`); // 0 is a valid discount, kept as-is
console.log(`Discount: ${getDiscount(undefined)}%`); // falls back to 10
