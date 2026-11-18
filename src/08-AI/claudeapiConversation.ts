import AnthropicSDK = require("@anthropic-ai/sdk");

const client = new AnthropicSDK.Anthropic();

// A multi-turn conversation with a system prompt and typed error handling -
// the API is stateless, so each call resends the full message history.
async function main() {
  const messages: AnthropicSDK.Anthropic.MessageParam[] = [
    { role: "user", content: "My name is Ali. What's a fun fact about octopuses?" },
  ];

  try {
    const first = await client.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      system: "You are a friendly, concise marine biology assistant.",
      messages,
    });

    const firstReply = first.content.find((block) => block.type === "text");
    if (firstReply?.type === "text") {
      console.log(`Claude: ${firstReply.text}`);
      messages.push({ role: "assistant", content: first.content });
    }

    messages.push({ role: "user", content: "What's my name?" });

    const second = await client.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      system: "You are a friendly, concise marine biology assistant.",
      messages,
    });

    const secondReply = second.content.find((block) => block.type === "text");
    if (secondReply?.type === "text") {
      console.log(`Claude: ${secondReply.text}`);
    }
  } catch (error) {
    if (error instanceof AnthropicSDK.Anthropic.AuthenticationError) {
      console.error("Invalid or missing API key.");
    } else if (error instanceof AnthropicSDK.Anthropic.RateLimitError) {
      console.error("Rate limited - retry later.");
    } else if (error instanceof AnthropicSDK.Anthropic.APIError) {
      console.error(`API error ${error.status}: ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
