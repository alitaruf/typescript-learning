// Fake stand-in for the real Anthropic API call in claudeapi.ts.
// Lets you test the response-handling logic for free, with no API key or credits.

const msg = {
  content: [
    { type: "text", text: "Hello! This is a fake reply for testing." },
  ],
};

for (const block of msg.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
