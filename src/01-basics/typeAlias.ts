type UserInputSanitizedString = string;

function sanitize(str: string): string {
  return str.trim();
}

function getInput(): string {
  return "  raw user input  ";
}

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());
console.log(`Sanitized: "${userInput}"`);

// Can still be re-assigned with a plain string though —
// `UserInputSanitizedString` is only an alias for `string`,
// so TypeScript doesn't stop an un-sanitized value from being put back in.
userInput = "new input";
console.log(`Reassigned: "${userInput}"`);
