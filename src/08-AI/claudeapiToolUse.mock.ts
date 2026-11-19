// Fake stand-in for the real Anthropic calls in claudeapiToolUse.ts.
// Simulates the two-round trip - Claude asks for a tool, we run it and
// hand back the result, then Claude answers - with no API key or credits.

function getWeather(city: string): string {
  return `${city}: 18°C, partly cloudy`;
}

// Round 1: Claude's (fake) response asking to call get_weather("Berlin")
const toolRequest = {
  stopReason: "tool_use" as const,
  toolUseId: "toolu_fake_1",
  toolName: "get_weather",
  input: { city: "Berlin" },
};

console.log(`Claude wants to call ${toolRequest.toolName}(${JSON.stringify(toolRequest.input)})`);

const toolResult = getWeather(toolRequest.input.city);
console.log(`Tool result: ${toolResult}`);

// Round 2: Claude's (fake) final answer, now that it has the tool result
const finalReply = `The weather in ${toolRequest.input.city} is ${toolResult}.`;
console.log(`Claude: ${finalReply}`);
