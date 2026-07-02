# Architecture

This repository currently contains two layers:

1. The active Clawd Code headless CLI, wired by `package.json` to `src/cli.ts`.
2. A large retained Claude Code/Ink codebase under `src/main.tsx`, `src/QueryEngine.ts`, `src/Tool.ts`, `src/tools/`, `src/commands/`, `src/bridge/`, and related subsystems.

The distinction matters. The npm scripts in this checkout run the headless Clawd CLI:

| Path | Role |
|------|------|
| `package.json` | `npm run dev` executes `tsx src/cli.ts`; `npm run build` runs `tsc`; bin output is `dist/cli.js`. |
| `src/cli.ts` | Active argv parser, provider/model selection, mode dispatch, and direct command map. |
| `src/commands.ts` | Active Clawd/Solana direct command implementations such as `cmdGoal`, `cmdArena`, `cmdWallet`, `cmdChain`, and `cmdChart`. |
| `src/commands copy.ts` | Retained upstream slash-command registry with `getCommands()` and `filterCommandsForRemoteMode()`. |
| `src/main.tsx` | Retained upstream Ink/Commander entrypoint. It imports `getCommands` from `./commands.js`, so it currently matches `src/commands copy.ts` better than the active `src/commands.ts`. |

## Active Runtime

The active CLI pipeline is:

```text
argv
  -> src/cli.ts
  -> src/env.ts
  -> src/grok-models.ts plus provider adapters
  -> direct command or mode class
  -> provider API, Solana RPC, local file output, or helper CLI
```

Important active files:

| File | Purpose |
|------|---------|
| `src/cli.ts` | Parses modes, global commands, provider flags, model flags, streaming flags, and output format. |
| `src/env.ts` | Loads `.env`, `~/.clawd-code/.env`, `~/.grok/config.toml`, `./.grok/config.toml`, then `process.env`. |
| `src/grok-models.ts` | Active model registry for Z.AI, xAI, Anthropic, DeepSeek, and OpenRouter. |
| `src/zai.ts` | Z.AI OpenAI-compatible chat, streaming, vision, image, and slide-agent helpers. |
| `src/xai.ts` | xAI chat completions, Responses API, streaming, and `/models` ping. |
| `src/anthropic.ts` | Native Anthropic Messages client with blocking and SSE streaming. |
| `src/openrouter.ts` | OpenRouter chat, streaming, auto-routing, Nemo routes, and Fable aliases. |
| `src/deepseek.ts` | DeepSeek OpenAI-compatible blocking chat client. |
| `src/telegram.ts` | Telegram Bot API long-poll relay into the Z.AI chat pipeline, restricted by allowlisted chat ID. |
| `src/solana-harness.ts` | Read-first Solana JSON-RPC wrapper with explicit mutation gates. |
| `src/wallet.ts` | Local Ed25519 wallet creation and listing under `~/.clawd-code/wallets`. |
| `src/arena.ts` | Cheshire Terminal Metaplex agent identity, registry, fetch, review, and health client. |
| `src/x402.ts` | Simple x402 request helper using `X-402-*` headers and optional bearer secret. |
| `src/verify.ts` | Environment preflight for Node, provider keys, Helius, Vulcan, safety gates, config, and workspace. |

## Active Modes

Modes live in `src/modes/` and are selected by the first CLI argument or by `/goal`.

| Mode | File | Summary |
|------|------|---------|
| `code` | `src/modes/code.ts` | Generates TypeScript/Solana code, supports streaming for Z.AI, xAI, Anthropic, and OpenRouter, then writes `outputs/clawd-code-*.ts`. |
| `chain` | `src/modes/chain.ts` | Solana RPC harness for status, balances, accounts, transactions, token accounts, fees, blockhash, simulation, gated send, raw RPC, and Z.AI-assisted planning. |
| `chart` | `src/modes/chart.ts` | GLM chart/report planner with GLM-5V image analysis and Z.AI slide/poster agent export. |
| `trade` | `src/modes/trade.ts` | Phoenix/Vulcan perps workflow in paper mode by default, with GLM-5V chart analysis and explicit live-trading gates. |
| `research` | `src/modes/research.ts` | Source-aware research using Z.AI by default, plus xAI Responses multi-agent, Anthropic, DeepSeek, and OpenRouter paths. |
| `image` | `src/modes/image.ts` | Z.AI GLM-Image or CogView image generation with DALL-E and Gemini placeholder fallbacks. |
| `voice` | `src/modes/voice.ts` | Local TTS through sherpa-onnx or `sag`, plus xAI voice-agent text REPL with Solana tools. |
| `repl` | `src/modes/repl.ts` | Readline multi-turn REPL with `.mode`, `.model`, `.provider`, `.thinking`, `.effort`, `.history`, `.clear`, and `.help`. |

## Model Registry

The active model registry is `src/grok-models.ts`.

| Provider | Active models and defaults |
|----------|----------------------------|
| Z.AI | Default provider. `glm-5.2` is the default for code, REPL, trade, and research. Also includes `glm-5-turbo`, `glm-5v-turbo`, `glm-4.6v-flashx`, `glm-image`, and `cogview-4`. |
| xAI | `grok-4.3`, `grok-4.3-fast`, `grok-4.20-non-reasoning`, `grok-4.20-multi-agent`, `grok-4.20-reasoning`, `grok-3-mini`, `grok-3`, `grok-code-fast-1`, `grok-imagine-image-quality`, and `grok-voice-think-fast-1.0`. |
| Anthropic | Active Clawd registry includes `claude-sonnet-4-6`, `claude-opus-4-8`, and `claude-haiku-4-5-20251001`. The retained upstream model utilities under `src/utils/model/` separately map Claude 3.5/3.7, Haiku 4.5, Sonnet 4/4.5/4.6, and Opus 4/4.1/4.5/4.6 across first-party, Bedrock, Vertex, and Foundry. |
| DeepSeek | `deepseek-v4-pro` and `deepseek-v4-flash`. |
| OpenRouter | `auto`, Nemo balanced/intelligent/fast routes, `anthropic/claude-fable-5`, and `~anthropic/claude-fable-latest`. |

Provider selection is normalized in `src/cli.ts`: `z`, `zai`, `z.ai`, and `glm` map to Z.AI; `or` maps to OpenRouter; `ds` maps to DeepSeek; `claude` and `ant` map to Anthropic.

## Retained Upstream Runtime

The upstream-style runtime is still present and is useful for reference or future reintegration:

```text
src/main.tsx
  -> src/entrypoints/init.ts
  -> src/replLauncher.tsx
  -> src/screens/REPL.tsx
  -> src/QueryEngine.ts
  -> src/services/api/claude.ts
  -> src/services/tools/toolOrchestration.ts
  -> src/tools.ts and src/tools/*
```

Key retained modules:

| Area | Paths |
|------|-------|
| Ink UI | `src/ink/`, `src/components/`, `src/screens/`, `src/hooks/`, `src/context/`, `src/state/` |
| Agent tool loop | `src/QueryEngine.ts`, `src/Tool.ts`, `src/tools.ts`, `src/tools/`, `src/services/tools/` |
| Slash commands | `src/commands/`, `src/commands copy.ts`, `src/types/command.ts` |
| Remote and bridge | `src/bridge/`, `src/remote/`, `src/server/`, `src/cli/transports/` |
| MCP | `src/services/mcp/`, `src/tools/MCPTool/`, `src/tools/ListMcpResourcesTool/`, `src/tools/ReadMcpResourceTool/`, `src/tools/ToolSearchTool/` |
| Plugins and skills | `src/plugins/`, `src/services/plugins/`, `src/skills/`, `src/outputStyles/` |
| Memory and compaction | `src/memdir/`, `src/services/compact/`, `src/services/extractMemories/`, `src/services/teamMemorySync/` |
| Tasks and agents | `src/tasks/`, `src/tools/AgentTool/`, `src/tools/Task*Tool/`, `src/coordinator/` |
| Permissions | `src/hooks/toolPermission/`, `src/components/permissions/`, `src/types/permissions.ts` |

## Source Directory Map

| Directory | Current role |
|-----------|--------------|
| `assistant/` | Retained Kairos/assistant session history code, feature-gated from `main.tsx`. |
| `bootstrap/` | Shared process/session state used by upstream runtime and tool loop. |
| `bridge/` | IDE/claude.ai bridge, remote-control loop, session spawning, JWT refresh, and bridge UI. |
| `buddy/` | Retained companion UI/prompt assets behind the `BUDDY` feature flag. |
| `cli/` | Remote IO, structured IO, transports, exit/print helpers, and update code for upstream CLI paths. |
| `commands/` | Retained upstream slash-command modules. |
| `components/` | Retained Ink React components, dialogs, permissions UI, MCP UI, settings UI, tasks UI, and diff views. |
| `constants/` | Shared constants for prompts, betas, products, tools, keys, files, system sections, and API limits. |
| `context/` | React contexts for overlays, notifications, stats, voice, mailbox, and queued messages. |
| `coordinator/` | Multi-agent coordinator mode state. |
| `entrypoints/` | Upstream CLI, MCP server, SDK, sandbox type, and init entrypoints. |
| `hooks/` | Upstream React hooks for input, tools, settings, IDE, voice, tasks, plugins, skills, history, permissions, and background sessions. |
| `ink/` | Vendored/custom Ink renderer, terminal events, layout, terminal IO, ANSI handling, hooks, and primitives. |
| `keybindings/` | Keybinding schemas, defaults, parsing, validation, matching, and provider setup. |
| `memdir/` | Memory path, scan, prompt, age, and relevance helpers. |
| `migrations/` | Settings/model migrations, including Sonnet 4.5 to 4.6 and bridge startup migrations. |
| `modes/` | Active Clawd headless modes. |
| `moreright/` | UI hook for horizontal overflow behavior. |
| `native-ts/` | TypeScript-native replacements for color diff, file index, and yoga layout pieces. |
| `outputStyles/` | Output style directory loader. |
| `plugins/` | Built-in and bundled plugin registration. |
| `query/` | Query dependency, config, stop hook, token budget, and transition helpers. |
| `remote/` | Remote CCR session manager, WebSocket, permission bridge, and SDK message adapter. |
| `schemas/` | Hook schemas. Most settings schemas live under `src/utils/settings/`. |
| `screens/` | Retained Ink screens for REPL, doctor, and resume conversation. |
| `server/` | Direct-connect session creation and web terminal/admin/auth server code. |
| `services/` | API clients, analytics, compacting, MCP, OAuth, LSP, settings sync, remote settings, x402 services, voice, tips, memory extraction, and more. |
| `shims/` | Bun bundle, macro, and preload shims. |
| `skills/` | Bundled skills, disk loading, and MCP skill builders. |
| `state/` | App state store, selectors, change observers, and teammate view helpers. |
| `tasks/` | Local shell, local agent, remote agent, in-process teammate, dream, and main-session tasks. |
| `tools/` | Retained upstream agent tool implementations. |
| `types/` | Shared TypeScript types for commands, messages, permissions, hooks, plugins, IDs, logs, and generated events. |
| `upstreamproxy/` | Upstream proxy/relay helpers. |
| `utils/` | Broad shared utility layer for auth, config, models, settings, permissions, hooks, git, shell parsing, sandboxing, plugins, telemetry, sessions, tasks, and more. |
| `vim/` | Vim motions, operators, transitions, text objects, and types. |
| `voice/` | Voice mode feature detection. Active voice mode is in `src/modes/voice.ts`. |

## Build And Runtime Notes

- Runtime target is Node >=18 for the package scripts, not Bun, although retained upstream code contains Bun-specific imports such as `bun:bundle`.
- The active CLI uses zero runtime dependencies in `package.json` and native `fetch`.
- The retained upstream runtime imports packages not declared in this package, such as React, Ink-related dependencies, Anthropic SDK types, MCP SDK types, lodash, chalk, and Commander.
- `src/tools.ts` also has retained upstream imports for tools that are not present in this checkout, including a static `TungstenTool` import. Restore those directories or remove/guard the imports before expecting the retained upstream tool registry to type-check.
- `webbuild/` was listed in the task request but is not present in the current worktree.

## See Also

- [Commands Reference](commands.md)
- [Tools Reference](tools.md)
- [Bridge Layer](bridge.md)
- [Subsystems Guide](subsystems.md)
- [Exploration Guide](exploration-guide.md)
