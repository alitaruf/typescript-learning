# TypeScript Learning

A structured collection of TypeScript concepts and runnable example snippets, organized by topic.

## Structure

| Topic | Covers |
|---|---|
| [01-basics](src/01-basics) | Variables, functions, basic types |
| [02-types](src/02-types) | Interfaces, type aliases, unions & intersections |
| [03-generics](src/03-generics) | Generic functions and classes |
| [04-oop](src/04-oop) | Classes, inheritance, access modifiers |
| [05-advanced-types](src/05-advanced-types) | Mapped types, conditional types, utility types |
| [06-async](src/06-async) | Promises, async/await |
| [07-design-patterns](src/07-design-patterns) | Common design patterns in TypeScript |

Each topic folder has its own README describing what it covers and how to run its examples.

## Getting started

```bash
npm install
```

## Running a snippet

Snippets run directly via [tsx](https://github.com/privatenumber/tsx) — no build step needed:

```bash
npm run run -- src/01-basics/variables.ts
```

## Type-checking everything

Validates every snippet compiles cleanly, without emitting output:

```bash
npm run typecheck
```

## Building

Compiles every snippet to `dist/`, mirroring the `src/` folder structure:

```bash
npm run build
```

## Adding a new topic

1. Create a new numbered folder under `src/` (next sequential number).
2. Add a `README.md` describing what it covers.
3. Add one file per concept — kebab-case, focused, short (aim for under ~60 lines).
