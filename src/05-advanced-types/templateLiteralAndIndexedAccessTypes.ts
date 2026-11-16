// ─────────────────────────────────────────────
// 1. Template literal types - build string literal
//    types the same way you'd build a template
//    string at runtime, but at the type level
// ─────────────────────────────────────────────
type Direction = "left" | "right" | "top" | "bottom";
type Margin = `margin-${Direction}`;

const validMargin: Margin = "margin-left";
// const invalidMargin: Margin = "margin-center"; // Error: not a Direction

// ─────────────────────────────────────────────
// 2. Combining unions inside a template literal
//    produces the cross product of every combination
// ─────────────────────────────────────────────
type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary";
type ButtonClass = `btn-${Size}-${Variant}`;

const buttonClass: ButtonClass = "btn-md-primary";

// ─────────────────────────────────────────────
// 3. Indexed access types - `T[K]` reads the type
//    of a specific property out of another type,
//    the same way `obj[key]` reads a value
// ─────────────────────────────────────────────
interface Order {
  id: number;
  items: { name: string; price: number }[];
  status: "pending" | "shipped" | "delivered";
}

type OrderStatus = Order["status"]; // "pending" | "shipped" | "delivered"
type OrderItem = Order["items"][number]; // { name: string; price: number }

const status: OrderStatus = "shipped";
const item: OrderItem = { name: "Keyboard", price: 49.99 };

// ─────────────────────────────────────────────
// 4. `keyof` + indexed access together - a generic
//    function that reads any property off an object,
//    with the return type narrowed to that property's type
// ─────────────────────────────────────────────
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const order: Order = { id: 1, items: [item], status };
const readStatus = getProperty(order, "status"); // typed as OrderStatus
const readItems = getProperty(order, "items"); // typed as Order["items"]

// ─────────────────────────────────────────────
// 5. `satisfies` - check a value against a type
//    without widening or losing its more specific
//    inferred type, unlike an `: Type` annotation
// ─────────────────────────────────────────────
const theme = {
  primary: "#007bff",
  secondary: "#6c757d",
} satisfies Record<string, string>;

// `theme.primary` keeps its literal key, so this still autocompletes/typechecks
console.log(theme.primary);

console.log(validMargin, buttonClass, status, item, readStatus, readItems.length);
