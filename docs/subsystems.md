# Subsystems Guide

This guide maps the current `src/` tree. It separates the active Clawd headless CLI from retained upstream Claude Code subsystems.

## Active Clawd CLI

**Location:** `src/cli.ts`, `src/commands.ts`, `src/modes/`

The active package entrypoint is `src/cli.ts`. It loads config, normalizes provider/model choices, handles global commands, dispatches direct commands, and runs a mode class.

```text
src/cli.ts
  -> src/env.ts
  -> src/grok-models.ts
  -> provider adapter or Solana helper
  -> src/modes/*
```

Key active modes:

| Mode | Purpose |
|------|---------|
| `code` | Generate TypeScript/Solana code and write files to `outputs/`. |
| `chain` | Read-first Solana JSON-RPC harness with explicit mutation gates. |
| `chart` | Chart/report planner, image analysis, and slide/poster export. |
| `trade` | Paper-first Phoenix/Vulcan perps workflows and chart vision. |
| `research` | Multi-provider research, including xAI Responses multi-agent. |
| `image` | Z.AI image generation with fallbacks. |
| `voice` | TTS plus xAI voice-agent mode. |
| `repl` | Readline chat session with dot commands. |

## Provider And Model System

**Location:** `src/grok-models.ts`, `src/zai.ts`, `src/xai.ts`, `src/anthropic.ts`, `src/openrouter.ts`, `src/deepseek.ts`, `src/utils/model/`

The active registry is `src/grok-models.ts`; retained upstream Claude model resolution is in `src/utils/model/`.

| Provider | Active adapter | Notes |
|----------|----------------|-------|
| Z.AI | `src/zai.ts` | Default provider. Chat, streaming, vision, image, and slide-agent helpers. |
| xAI | `src/xai.ts` | Chat completions, Responses API, streaming, model ping, voice/research support. |
| Anthropic | `src/anthropic.ts` | Native Messages API client with blocking and SSE streaming. |
| OpenRouter | `src/openrouter.ts` | OpenAI-compatible chat, streaming, auto-routing, Nemo/Fable aliases. |
| DeepSeek | `src/deepseek.ts` | OpenAI-compatible blocking chat client. |

`src/utils/model/configs.ts` contains retained Claude configs for first-party, Bedrock, Vertex, and Foundry. It currently includes Claude 3.5/3.7, Haiku 4.5, Sonnet 4/4.5/4.6, and Opus 4/4.1/4.5/4.6. Active Clawd Anthropic models are separately listed in `src/grok-models.ts` and `src/anthropic.ts`.

## Environment And Verification

**Location:** `src/env.ts`, `src/verify.ts`

`loadClawdEnv()` merges config in this order:

1. `~/.clawd-code/.env`
2. `./.env`
3. `~/.grok/config.toml`
4. `./.grok/config.toml`
5. `process.env`

`EnvironmentVerifier` checks Node >=18, Z.AI key, optional xAI key and reachability, Helius/Solana RPC, Phoenix URL, Vulcan CLI, live-trading safety gates, config file, and workspace.

## Solana Harness

**Location:** `src/solana-harness.ts`, `src/modes/chain.ts`

The harness is a typed JSON-RPC wrapper with read-first defaults.

| Area | Behavior |
|------|----------|
| RPC resolution | `SOLANA_RPC_URL`, `HELIUS_RPC_URL`, `HELIUS_API_KEY`, or `https://api.mainnet-beta.solana.com`. |
| Cluster inference | Explicit `SOLANA_CLUSTER` or inferred from URL. |
| Commitment | `SOLANA_COMMITMENT`, default `confirmed`. |
| Mutation gate | Mutation RPC requires `SOLANA_HARNESS_READONLY=false`, `LIVE_TRADING=true`, and `OPERATOR_CONFIRMED=true`. |
| Methods | Health, version, slot, epoch, blockhash, balance, account, tx, signatures, program accounts, token supply/accounts, fees, airdrop, simulate, send raw. |

## Wallets

**Location:** `src/wallet.ts`

Wallets are local Ed25519 keypairs stored as JSON arrays under `~/.clawd-code/wallets` or `CLAWD_WALLET_DIR`. Directories are set to `0700`; wallet files are set to `0600`.

The wallet helper implements:

| Function | Behavior |
|----------|----------|
| `createWallet(name)` | Generate Ed25519 keypair, encode public key as base58, save secret key. |
| `listWallets()` | Read wallet files, reconstruct public keys, and return name/path/pubkey records. |

## Arena And Agent Identity

**Location:** `src/arena.ts`, `src/commands.ts`

The Arena client talks to `https://cheshireterminal.ai/api/metaplex-agents`.

| Operation | Endpoint behavior |
|-----------|-------------------|
| `mint` | Mint a Solana mainnet Metaplex agent identity. |
| `register` | Register capabilities, services, pricing, A2A/MCP/x402 endpoints. |
| `fetch` | Fetch agent profile by asset address. |
| `review` | Submit reputation review with proof of payment. |
| `health` | Check developer status endpoint. |

Stored identity is written to `~/.clawd-code/arena-identity.json`.

## x402

**Location:** `src/x402.ts`, `src/services/x402/`, `src/commands/x402/`

The active helper `src/x402.ts` builds x402-gated HTTP requests using:

| Header | Meaning |
|--------|---------|
| `X-402-Amount` | Requested payment amount. |
| `X-402-Gateway` | Gateway URL, default `https://x402.wtf`. |
| `X-402-Destination` | Optional destination wallet. |
| `Authorization` | Optional bearer value from `X402_PAYMENT_SECRET`. |

Retained upstream service code under `src/services/x402/` includes payment fetch, config, client, types, and tracker modules.

## Telegram Relay

**Location:** `src/telegram.ts`, `src/cli.ts`

The active `/telegram` command starts a Telegram Bot API long-poll relay. It is chat/CLI only and does not expose OS-level or computer-use control.

Required env:

| Variable | Purpose |
|----------|---------|
| `TELEGRAM_BOT_TOKEN` | Bot API token. |
| `TELEGRAM_ALLOWED_CHAT_ID` | Single allowlisted chat ID; all other chats are rejected. |
| `ZAI_API_KEY` | Required for Z.AI chat responses. |

The relay keeps up to 20 turns of per-chat history, supports `/reset` and `/clear`, and chunks outbound messages to Telegram's message-size limit.

## Retained Query And Tool Loop

**Location:** `src/QueryEngine.ts`, `src/Tool.ts`, `src/tools.ts`, `src/tools/`, `src/services/tools/`

The retained upstream agent loop contains:

| Layer | Role |
|-------|------|
| `QueryEngine.ts` | Main streaming LLM and tool-loop engine. |
| `Tool.ts` | Tool types, context, permission context, result/progress types, and `buildTool`. |
| `tools.ts` | Built-in tool registry and MCP merge helpers. |
| `services/tools/toolExecution.ts` | Validation, permission, hook, telemetry, execution, and result mapping. |
| `services/tools/toolOrchestration.ts` | Serial/concurrent tool batching. |
| `services/tools/StreamingToolExecutor.ts` | Streaming executor support. |

This layer is not called by the active `src/cli.ts` path.

## MCP

**Location:** `src/services/mcp/`, `src/tools/MCPTool/`, `src/tools/ListMcpResourcesTool/`, `src/tools/ReadMcpResourceTool/`, `src/tools/ToolSearchTool/`

Retained MCP support includes:

| Feature | Paths |
|---------|-------|
| Config parsing | `config.ts`, `envExpansion.ts`, `normalization.ts`, `mcpStringUtils.ts` |
| Clients and connections | `client.ts`, `MCPConnectionManager.tsx`, `useManageMCPConnections.ts`, transports |
| Auth | `auth.ts`, `oauthPort.ts`, `xaa.ts`, `xaaIdpLogin.ts`, `McpAuthTool` |
| Permissions/channels | `channelAllowlist.ts`, `channelPermissions.ts`, `channelNotification.ts` |
| Resources/tools | `ListMcpResourcesTool`, `ReadMcpResourceTool`, `MCPTool`, `ToolSearchTool` |
| Server mode | `src/entrypoints/mcp.ts` |

MCP tools are dynamically merged into the tool pool with built-ins.

## Permissions

**Location:** `src/hooks/toolPermission/`, `src/components/permissions/`, `src/types/permissions.ts`

Retained permission flow supports interactive prompts, coordinator workers, swarm workers, shell/file permission dialogs, rule management, sandbox requests, notebook/file edit diffs, ask-user-question prompts, and web fetch prompts.

Tool execution checks:

1. Tool input schema.
2. Tool-specific permission function.
3. Permission rules.
4. Hooks and classifier paths when enabled.
5. UI or remote permission prompt when required.

## Plugins, Skills, And Output Styles

**Locations:** `src/plugins/`, `src/services/plugins/`, `src/skills/`, `src/outputStyles/`

| Subsystem | Summary |
|-----------|---------|
| Plugins | Built-in/bundled plugins, marketplace/install commands, plugin cache, command loading, and plugin telemetry. |
| Skills | Bundled skill implementations, disk skill loading, MCP skill builders, and skill command integration. |
| Output styles | Loads output styles from configured directories and supports retained `/output-style`. |

Bundled skills include workflows such as batch, Claude API helpers, Chrome integration, debug, keybindings, loop, remember, schedule remote agents, simplify, skillify, stuck, config updates, and verification.

## Tasks And Agents

**Location:** `src/tasks/`, `src/tools/AgentTool/`, `src/tools/Task*Tool/`, `src/coordinator/`

Task types present:

| Task | Purpose |
|------|---------|
| `LocalShellTask` | Background shell execution. |
| `LocalAgentTask` | Local sub-agent task. |
| `RemoteAgentTask` | Remote agent task. |
| `InProcessTeammateTask` | Parallel in-process teammate. |
| `DreamTask` | Background auto-dream/consolidation task. |
| `LocalMainSessionTask` | Represents main session as a task. |

Coordinator mode is feature-gated and uses team create/delete plus send-message tools.

## Memory And Compaction

**Locations:** `src/memdir/`, `src/services/compact/`, `src/services/extractMemories/`, `src/services/teamMemorySync/`, `src/services/SessionMemory/`

Memory support includes project/user/team memory paths, memory scanning, relevance, prompts, age helpers, automatic extraction, team memory secret scanning, watcher support, session memory utilities, and context compaction.

## UI, Ink, State, And Hooks

**Locations:** `src/ink/`, `src/components/`, `src/screens/`, `src/context/`, `src/hooks/`, `src/state/`

The retained upstream UI is a custom Ink/React terminal app:

| Area | Paths |
|------|-------|
| Renderer/primitives | `src/ink/`, `src/ink/components/`, `src/ink/layout/`, `src/ink/events/`, `src/ink/termio/` |
| App components | `src/components/` |
| Screens | `src/screens/REPL.tsx`, `Doctor.tsx`, `ResumeConversation.tsx` |
| React contexts | `src/context/` |
| Hooks | `src/hooks/` |
| State store | `src/state/` |

## Bridge, Remote, And Direct Connect

**Locations:** `src/bridge/`, `src/remote/`, `src/server/`, `src/cli/transports/`

| Area | Summary |
|------|---------|
| Bridge | Retained IDE/claude.ai bridge, gated by `BRIDGE_MODE`. |
| Remote session | CCR WebSocket plus HTTP event posting through `RemoteSessionManager`. |
| Direct connect | Creates sessions on a direct-connect server and connects over WebSocket. |
| Web server | Terminal/admin/auth/session web server under `src/server/web/`. |
| CLI transports | SSE, WebSocket, hybrid transport, serial uploader, worker state uploader. |

See [Bridge Layer](bridge.md) for the detailed bridge map.

## Voice

**Locations:** `src/modes/voice.ts`, `src/voice-agent.ts`, `src/services/voice.ts`, `src/services/voiceStreamSTT.ts`, `src/hooks/useVoice*`, `src/voice/`

Active voice mode supports local TTS and xAI voice-agent text mode. Retained upstream voice code is gated by `VOICE_MODE` and includes STT, key terms, hooks, and UI integration.

## Build And Shims

**Locations:** `src/shims/`, `src/native-ts/`, `src/migrations/`

| Area | Summary |
|------|---------|
| Shims | Bun bundle/macro/preload compatibility. |
| Native TS | Color diff, file index, and yoga layout replacements. |
| Migrations | Settings/model/bridge migrations including Sonnet 4.5 to 4.6 and Opus migrations. |

## See Also

- [Architecture](architecture.md)
- [Commands Reference](commands.md)
- [Tools Reference](tools.md)
- [Bridge Layer](bridge.md)
- [Exploration Guide](exploration-guide.md)
