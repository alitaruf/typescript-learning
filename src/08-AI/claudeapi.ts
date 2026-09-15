import AnthropicSDK = require("@anthropic-ai/sdk");

const client = new AnthropicSDK.Anthropic();

async function main() {
  const msg = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: "Hello, Claude"
    }],
  });
  for (const block of msg.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }
}

main();
