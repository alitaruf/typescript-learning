import AnthropicSDK = require("@anthropic-ai/sdk");

const client = new AnthropicSDK.Anthropic();

// A custom tool - Claude decides when to call it and with what arguments,
// but the actual function always runs in your own code, not Anthropic's.
const tools: AnthropicSDK.Anthropic.Tool[] = [
  {
    name: "get_weather",
    description: "Get the current weather for a city",
    input_schema: {
      type: "object",
      properties: {
        city: { type: "string", description: "The city name" },
      },
      required: ["city"],
    },
  },
];

function getWeather(city: string): string {
  // a real implementation would call a weather API here
  return `${city}: 18°C, partly cloudy`;
}

// The agentic loop - keep sending the conversation back until Claude
// stops asking for tools and returns a final text answer.
async function main() {
  const messages: AnthropicSDK.Anthropic.MessageParam[] = [
    { role: "user", content: "What's the weather like in Berlin?" },
  ];

  while (true) {
    const response = await client.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      tools,
      messages,
    });

    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason !== "tool_use") {
      const finalText = response.content.find((block) => block.type === "text");
      if (finalText?.type === "text") {
        console.log(`Claude: ${finalText.text}`);
      }
      break;
    }

    // Run every requested tool call and return all results in one message -
    // splitting them across multiple messages discourages parallel tool use.
    const toolResults: AnthropicSDK.Anthropic.ToolResultBlockParam[] = [];
    for (const block of response.content) {
      if (block.type === "tool_use" && block.name === "get_weather") {
        const input = block.input as { city: string };
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: getWeather(input.city),
        });
      }
    }
    messages.push({ role: "user", content: toolResults });
  }
}

main();
