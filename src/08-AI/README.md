# 08 — AI

Calling the Claude API from TypeScript with the official `@anthropic-ai/sdk`.

Each real example has a `.mock.ts` counterpart that fakes the API response, so you can see the response-handling shape without an API key or spending credits. Running the real files requires `ANTHROPIC_API_KEY` to be set and will use API credits.

## Files

- `claudeapi.ts` / `claudeapi.mock.ts` — the smallest possible request: one user message, reading the `text` block out of the response
- `claudeapiConversation.ts` / `claudeapiConversation.mock.ts` — a multi-turn conversation with a system prompt, resending history on each call, and typed error handling (`AuthenticationError`, `RateLimitError`, `APIError`)
- `claudeapiToolUse.ts` / `claudeapiToolUse.mock.ts` — defining a custom tool, the agentic loop that keeps resending the conversation while `stop_reason` is `"tool_use"`, and returning the tool's result to Claude

## Run

```bash
# Mocked - safe, no API key or credits needed
npm run run -- src/08-AI/claudeapi.mock.ts
npm run run -- src/08-AI/claudeapiConversation.mock.ts
npm run run -- src/08-AI/claudeapiToolUse.mock.ts

# Real - needs ANTHROPIC_API_KEY and uses credits
npm run run -- src/08-AI/claudeapi.ts
npm run run -- src/08-AI/claudeapiConversation.ts
npm run run -- src/08-AI/claudeapiToolUse.ts
```
