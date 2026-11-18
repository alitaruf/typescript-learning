// Fake stand-in for the real Anthropic calls in claudeapiConversation.ts.
// Lets you see the multi-turn shape - resending history, picking out the
// text block, appending the assistant turn - with no API key or credits.

interface FakeMessage {
  content: { type: string; text?: string }[];
}

function fakeReply(userText: string): FakeMessage {
  if (userText.includes("my name")) {
    return { content: [{ type: "text", text: "Your name is Ali!" }] };
  }
  return {
    content: [
      { type: "text", text: "Fun fact: octopuses have three hearts and blue blood!" },
    ],
  };
}

const messages: { role: string; content: unknown }[] = [
  { role: "user", content: "My name is Ali. What's a fun fact about octopuses?" },
];

const first = fakeReply("fun fact about octopuses");
const firstReply = first.content.find((block) => block.type === "text");
if (firstReply?.text) {
  console.log(`Claude: ${firstReply.text}`);
  messages.push({ role: "assistant", content: first.content });
}

messages.push({ role: "user", content: "What's my name?" });

const second = fakeReply("what's my name");
const secondReply = second.content.find((block) => block.type === "text");
if (secondReply?.text) {
  console.log(`Claude: ${secondReply.text}`);
}
