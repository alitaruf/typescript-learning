// ─────────────────────────────────────────────
// 1. A recursive type alias - a type that refers
//    to itself, useful for modelling nested data
//    of arbitrary depth like JSON
// ─────────────────────────────────────────────
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const payload: Json = {
  name: "Ali",
  active: true,
  tags: ["admin", "beta"],
  address: { city: "Berlin", zip: null },
};

// ─────────────────────────────────────────────
// 2. DeepReadonly - a mapped type that recurses
//    into nested objects instead of stopping at
//    the top level like the built-in `Readonly<T>`
// ─────────────────────────────────────────────
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface Settings {
  theme: { color: string; darkMode: boolean };
  notifications: { email: boolean };
}

const settings: DeepReadonly<Settings> = {
  theme: { color: "blue", darkMode: false },
  notifications: { email: true },
};

// settings.theme.darkMode = true; // Error: readonly, even though it's nested

// ─────────────────────────────────────────────
// 3. DeepPartial - same recursive idea, but every
//    property (at every depth) becomes optional,
//    useful for things like partial update payloads
// ─────────────────────────────────────────────
type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

function applySettingsUpdate(current: Settings, update: DeepPartial<Settings>): Settings {
  return {
    theme: { ...current.theme, ...update.theme },
    notifications: { ...current.notifications, ...update.notifications },
  };
}

const updated = applySettingsUpdate(
  { theme: { color: "blue", darkMode: false }, notifications: { email: true } },
  { theme: { darkMode: true } }, // only one nested field, the rest stay optional
);

// ─────────────────────────────────────────────
// 4. Variadic tuple types - spread one tuple type
//    into another, so helpers can transform a tuple
//    while keeping each element's specific type
// ─────────────────────────────────────────────
type Prepend<Head, Tail extends unknown[]> = [Head, ...Tail];

type WithId = Prepend<number, [string, boolean]>; // [number, string, boolean]

function makeRecord(...args: WithId): WithId {
  return args;
}

const record = makeRecord(1, "Ali", true);

console.log(payload, settings, updated, record);
