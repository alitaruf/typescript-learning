// ─────────────────────────────────────────────
// 1. Object destructuring - pull specific
//    properties out of an object into variables
// ─────────────────────────────────────────────
type Book = {
  title: string;
  author: string;
  year: number;
};

const book: Book = { title: "Clean Code", author: "Robert C. Martin", year: 2008 };

const { title, author } = book;
console.log(`${title} by ${author}`);

// Rename while destructuring, and give a default for a missing property
type Settings = { theme?: string; fontSize: number };
const settings: Settings = { fontSize: 14 };
const { theme: colorTheme = "light", fontSize } = settings;
console.log(`Theme: ${colorTheme}, Font size: ${fontSize}`);

// ─────────────────────────────────────────────
// 2. Array destructuring - pull items out of an
//    array by position
// ─────────────────────────────────────────────
const coordinates: [number, number] = [10, 20];
const [x, y] = coordinates;
console.log(`x: ${x}, y: ${y}`);

const scores = [95, 82, 77, 60];
const [first, second, ...rest] = scores; // ...rest collects everything else
console.log(`First: ${first}, Second: ${second}, Rest: ${rest.join(", ")}`);

// ─────────────────────────────────────────────
// 3. Destructuring function parameters - avoids
//    repeating `params.` for every field
// ─────────────────────────────────────────────
function printBook({ title, year }: Book): void {
  console.log(`"${title}" was published in ${year}`);
}

printBook(book);

// ─────────────────────────────────────────────
// 4. Spread operator (`...`) - expand an array or
//    object into a new one, optionally overriding
//    or adding fields
// ─────────────────────────────────────────────
const original = [1, 2, 3];
const withMore = [...original, 4, 5];
console.log(`Original: ${original.join(", ")}`);
console.log(`Extended: ${withMore.join(", ")}`);

const updatedBook: Book = { ...book, year: 2024 }; // copy book, override year
console.log(`Updated year: ${updatedBook.year} (original untouched: ${book.year})`);

// ─────────────────────────────────────────────
// 5. Merging objects with spread - later spreads
//    override earlier ones for matching keys
// ─────────────────────────────────────────────
const defaults = { retries: 3, timeoutMs: 1000 };
const overrides = { timeoutMs: 5000 };
const finalConfig = { ...defaults, ...overrides };
console.log(`Retries: ${finalConfig.retries}, Timeout: ${finalConfig.timeoutMs}ms`);
