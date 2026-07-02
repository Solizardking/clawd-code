# Commands Reference

This checkout has two command systems:

1. Active headless commands in `src/cli.ts` and `src/commands.ts`.
2. Retained upstream slash commands in `src/commands/`, with the old registry preserved as `src/commands copy.ts`.

Use `src/cli.ts` as the source of truth for the runnable `clawd-code` package.

## Active CLI Commands

`src/cli.ts` handles these top-level commands before mode dispatch:

| Command | Aliases | Source | Summary |
|---------|---------|--------|---------|
| `models` | `/models` | `src/cli.ts`, `src/grok-models.ts` | List available models or print the normalized model to persist in `CLAWD_MODEL`. |
| `provider` | `/provider` | `src/cli.ts` | Show provider/API-key status or switch to `zai`, `xai`, `anthropic`, `openrouter`, or `deepseek`. |
| `verify` | `/verify` | `src/verify.ts` | Run preflight checks for Node, Z.AI, xAI, Helius, Phoenix, Vulcan, safety gates, config, and workspace. |
| `inspect` | `/inspect` | `src/cli.ts` | Print config sources, active provider/model, key status, OpenRouter/Z.AI route config, xAI reachability, and per-mode defaults. |
| `telegram` | `/telegram` | `src/telegram.ts` | Start a Telegram Bot API long-poll relay into Z.AI chat. Requires `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALLOWED_CHAT_ID`, and `ZAI_API_KEY`. |
| `help` | `/help` | `src/commands.ts` | Print active Clawd command help. |

## Active Modes

| Mode | Source | Description |
|------|--------|-------------|
| `code` | `src/modes/code.ts` | Generates TypeScript/Solana code, supports streaming for Z.AI, xAI, Anthropic, and OpenRouter, then writes to `outputs/`. |
| `chain` | `src/modes/chain.ts` | Solana read-first RPC harness with gated mutation paths and Z.AI planning/explanation. |
| `chart` | `src/modes/chart.ts` | GLM chart/report planner with optional image analysis and slide/poster export. |
| `slides` | `src/commands.ts`, `src/modes/chart.ts` | Runs chart mode with `--slides`. |
| `poster` | `src/commands.ts`, `src/modes/chart.ts` | Runs chart mode with `--poster`. |
| `trade` | `src/modes/trade.ts` | Phoenix/Vulcan perps workflow, paper by default, GLM-5V chart analysis, explicit live-trading gates. |
| `research` | `src/modes/research.ts` | Multi-provider research with Z.AI default, xAI Responses multi-agent, Anthropic, DeepSeek, and OpenRouter routes. |
| `image` | `src/modes/image.ts` | Z.AI image generation with DALL-E and Gemini placeholder fallbacks. |
| `voice` | `src/modes/voice.ts` | TTS through sherpa-onnx or `sag`, plus xAI voice-agent mode with `--agent`. |
| `repl` | `src/modes/repl.ts` | Readline REPL with provider/model/mode switching and persistent in-memory history. |

## Active Direct Commands

These commands are registered in the `directCommands` map in `src/cli.ts` and implemented in `src/commands.ts`.

| Command | Slash alias | Implementation | Summary |
|---------|-------------|----------------|---------|
| `perps` | `/perps` | `cmdPerps` | Static Phoenix/Vulcan perps dashboard and quick action hints. |
| `wallet` | `/wallet` | `cmdWallet` | `create`, `list`, `import` hints, and balance-oriented wallet output. |
| `chain` | `/chain`, `/solana` | `cmdChain` | Delegates to `ChainMode`. |
| `chart` | `/chart`, `/charts` | `cmdChart` | Delegates to `ChartMode`. |
| `slides` | `/slides` | `cmdSlides` | Delegates to `ChartMode` with slide export. |
| `poster` | `/poster` | `cmdPoster` | Delegates to `ChartMode` with poster export. |
| `send` | `/send` | `cmdSend` | Prints send draft and safety guidance. |
| `price` | `/price` | `cmdPrice` | Static token price panel for SOL, BTC, ETH, BONK, WIF, USDC, and CLAWD. |
| `balance` | `/balance` | `cmdBalance` | Static wallet balance snapshot. |
| `positions` | `/positions` | `cmdPositions` | Static open positions panel. |
| `funding` | `/funding` | `cmdFunding` | Static perps funding-rate panel. |
| `signals` | `/signals` | `cmdSignals` | Static composite trading signal panel. |
| `strategies` | `/strategies` | `cmdStrategies` | Vulcan strategy command hints for TWAP, grid, and TA. |
| `arena` | `/arena` | `cmdArena` | Cheshire Terminal agent identity and registry workflows. |
| `agents` | `/agents` | `cmdAgents` | Static Clawd agent registry panel. |
| `goal` | `/goal` | `cmdGoal` | Natural-language router to trade, chain, chart, research, image, voice, or code mode. |
| `help` | `/help` | `cmdHelp` | Active command help. |

## Chain Subcommands

`ChainMode` supports:

| Subcommand | Aliases | Behavior |
|------------|---------|----------|
| `status` | `health`, `snapshot` | Shows RPC URL, cluster, commitment, read-only flag, mutation gate, health, version, slot, and blockhash. |
| `balance` | `bal` | Resolves a wallet/address and prints lamports/SOL. |
| `account` | `acct` | Prints account owner, lamports, executable status, rent epoch, space, and data summary. |
| `tx` | `transaction` | Fetches and prints a transaction. |
| `sigs` | `signatures` | Fetches recent signatures for an address. |
| `program` | none | Shows program account metadata and optionally program accounts with `--allow-large`. |
| `token` | none | Shows token supply and largest accounts. |
| `token-accounts` | `tokens` | Shows token accounts for an owner, with optional mint/program filters. |
| `fees` | none | Calls `getRecentPrioritizationFees`. |
| `blockhash` | none | Prints latest blockhash. |
| `airdrop` | `faucet` | Requests airdrop on non-mainnet clusters. |
| `simulate` | none | Simulates a base64 transaction. |
| `send-raw` | none | Sends a base64 transaction only when mutation gates allow it. |
| `rpc` | none | Raw JSON-RPC call path. |
| `ask` | `ai`, `plan`, `explain` | Uses Z.AI planning/explanation. |

Mutation RPC is blocked unless `SOLANA_HARNESS_READONLY=false`, `LIVE_TRADING=true`, and `OPERATOR_CONFIRMED=true`.

## Arena Subcommands

`cmdArena` supports:

| Subcommand | Behavior |
|------------|----------|
| `status`, `identity` | Show stored `~/.clawd-code/arena-identity.json`. |
| `mint` | Mint a Solana Metaplex agent NFT through Cheshire Terminal. Requires `--wallet`. |
| `register` | Register capabilities, services, x402/A2A/MCP endpoints, and pricing. |
| `fetch`, `profile` | Fetch any agent profile by asset address. |
| `review` | Submit a reputation review with proof of payment. |
| `health`, `ping` | Check Cheshire Terminal developer status endpoint. |

## REPL Dot Commands

`src/modes/repl.ts` supports:

| Command | Behavior |
|---------|----------|
| `.exit`, `.quit` | End the REPL. |
| `.clear` | Clear in-memory conversation history. |
| `.mode <code|research|trade|general>` | Switch system prompt mode. |
| `.model <id>` | Normalize and switch model, including provider inference for Claude, GLM, and OpenRouter/Nemo IDs. |
| `.provider <zai|xai|anthropic|openrouter|deepseek>` | Switch provider and reset to that provider's default model. |
| `.thinking [value]` | Show or set Z.AI thinking mode. |
| `.effort [value]` | Show or set Z.AI reasoning effort. |
| `.history` | Print recent history snippets. |
| `.help` | Print REPL help. |

## Provider And Model Flags

Active flags parsed in `src/cli.ts`:

| Flag | Behavior |
|------|----------|
| `--mode <mode>` | Set default mode from flags. |
| `--agents <4|16>` | Set research agent count. |
| `--live` | Enable live trading in config. |
| `--paper` | Force paper mode. |
| `--stream` | Enable streaming in supported modes. |
| `--model <model>` | Override model for this invocation. |
| `--provider <name>` | Override provider and provider default model. |
| `--thinking` | Enable Z.AI thinking for this invocation. |
| `--no-thinking` | Disable Z.AI thinking for this invocation. |
| `--reasoning-effort <value>` | Set Z.AI reasoning effort. |
| `--thinking-mode <value>` | Set Z.AI thinking mode by value. |
| `--format <text|json>` | Set `CLAWD_OUTPUT_FORMAT`. |

## Retained Upstream Slash Commands

The retained upstream command modules live under `src/commands/`. The old registry is `src/commands copy.ts`; the active top-level `src/commands.ts` no longer exports `getCommands()`.

Commands present on disk include:

| Category | Commands |
|----------|----------|
| Git and review | `commit`, `commit-push-pr`, `branch`, `diff`, `review`, `ultrareview`, `pr-comments`, `rewind`, `security-review`, `bughunter` |
| Session and context | `compact`, `context`, `resume`, `session`, `share`, `export`, `summary`, `clear`, `rename`, `tag`, `think-back`, `thinkback-play`, `passes` |
| Settings and UX | `config`, `permissions`, `theme`, `output-style`, `color`, `keybindings`, `vim`, `effort`, `model`, `privacy-settings`, `fast`, `brief`, `statusline` |
| Memory and files | `memory`, `add-dir`, `files`, `init`, `init-verifiers` |
| MCP, plugins, skills | `mcp`, `plugin`, `reload-plugins`, `skills`, `hooks` |
| Auth and account | `login`, `logout`, `oauth-refresh`, `usage`, `extra-usage`, `rate-limit-options`, `cost` |
| Agents and tasks | `tasks`, `agents`, `plan`, `ultraplan` |
| Diagnostics and setup | `doctor`, `status`, `stats`, `version`, `install`, `upgrade`, `terminal-setup`, `remote-env`, `web-setup`, `sandbox` |
| Integrations | `remote-control`, `bridge-kick`, `ide`, `desktop`, `mobile`, `teleport`, `chrome`, `install-github-app`, `install-slack-app`, `x402` |
| Internal/debug/stubs | `ant-trace`, `autofix-pr`, `backfill-sessions`, `break-cache`, `btw`, `ctx_viz`, `debug-tool-call`, `env`, `good-claude`, `heapdump`, `issue`, `mock-limits`, `onboarding`, `perf-issue`, `reset-limits`, `stickers` |

Several retained modules are stubs with `isEnabled: () => false`; verify `isEnabled()` before assuming a command is runnable in the upstream UI.

## See Also

- [Architecture](architecture.md)
- [Tools Reference](tools.md)
- [Exploration Guide](exploration-guide.md)
