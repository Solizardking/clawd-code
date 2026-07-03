<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=26&duration=2600&pause=900&color=14F195&center=true&vCenter=true&width=700&lines=Clawd+Code;Solana-Native+AI+Coding+CLI;Paper-Gated+Perpetuals+Workflows;Wallets+%C2%B7+Charts+%C2%B7+Voice+%C2%B7+Research" alt="Clawd Code" />

[![npm](https://img.shields.io/badge/npm-clawd--code-14F195?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@solana-clawd/clawd-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-9945FF?style=for-the-badge)](./LICENSE)
[![Node](https://img.shields.io/badge/Node-18%2B-14F195?style=for-the-badge&logo=nodedotjs&logoColor=white)](#install)
[![Solana](https://img.shields.io/badge/Solana-mainnet--beta-9945FF?style=for-the-badge&logo=solana&logoColor=white)](#solana-blockchain-harness)

</div>

Curl-installable Solana-native AI coding CLI with local wallet creation and
paper-gated perpetuals workflows.

`clawd-code` is a headless command-line agent for generating TypeScript/Solana
code, checking perps market workflows, creating local Solana keypairs, and
running research/image/voice modes from one binary.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/Solizardking/solana-clawd/main/clawd-code/install.sh | sh
```

The installer checks for Node.js 18+, installs the `clawd-code` binary, and
creates `~/.clawd-code/.env` if one does not already exist.

> **Note:** The xAI Voice Agent (`clawd-code voice --agent`) requires Node.js 22+ for native WebSocket support.

Smoke-test a local checkout without linking a global binary:

```bash
CLAWD_CODE_SOURCE_DIR=/Users/8bit/clawd-code \
CLAWD_CODE_CONFIG_DIR=/tmp/clawd-code-smoke-home/.clawd-code \
CLAWD_CODE_SMOKE_TEST=true \
sh /Users/8bit/clawd-code/install.sh
```

Manual install:

```bash
git clone https://github.com/Solizardking/solana-clawd.git
cd solana-clawd/clawd-code
cp .env.example ~/.clawd-code/.env
npm install
npm run build
npm link
```

## Repository Layout

Canonical local root: `/Users/8bit/clawd-code`.

There is no `NemoClaw/` sidecar package in this checkout — OpenRouter Nemo
auto routing and explicit Fable aliases are built directly into
`src/openrouter.ts`. `src/`'s `tsconfig.json` `include` is intentionally
scoped to the CLI's real 15-file import closure plus `src/modes/`; it does
not build the entire directory tree.

| Path | Status in this checkout | Purpose |
| --- | --- | --- |
| `clawd-plugin/` | present | Plugin manifest, MCP config, bundled skills/reference docs — see [Clawd Code Plugin](#clawd-code-plugin) |
| `docs/` | present | Install/smoke-test notes (`docs/INSTALL.md`) |
| `quantitative-signal-discovery-agent/` | present | Independent Python research/analysis project (own `.git`, not wired into the CLI build) |
| `son_of_anton_program/` | present | Independent Anchor/Solana program project (own `.git`, not wired into the CLI build) |
| `src/` | present | CLI runtime, provider adapters, modes, tests — see [CLI source layout](#cli-source-layout) |
| `web/` | present | Next.js web client — see [Web Client](#web-client) |
| `dist/` | git-ignored | Build output from `npm run build`; not committed |
| `.gitattributes` | present | Git attributes |
| `agent.md` | present | Agent-facing summary |
| `CLAUDE.md` | present | Compatibility shim pointing agent runtimes at `CLAWD.md` |
| `clawd.json` | present | Agent metadata and system profile |
| `CLAWD.md` | present | Canonical operator/agent harness instructions |
| `IDENTITY.md` | present | Identity and operating profile |
| `install.sh` | present | Installer and config bootstrap |
| `LICENSE` | present | MIT license |
| `package-lock.json` | present | npm lockfile |
| `package.json` | present | npm package manifest |
| `README.md` | present | Primary project documentation |
| `Skill.md` | present | Skill/package map |
| `SOUL.md` | present | Agent persona notes |
| `tsconfig.json` | present | TypeScript project configuration, scoped `include` (see above) |

`.github/`, `docker/`, `scripts/`, `prompts/`, `outputs/`, `NemoClaw/`, and
`gitpretty-apply.sh` are **not present** in this checkout — they were removed
as unused scaffolding with no inbound references from the build, `install.sh`,
or CI. If you re-add any of them, wire them into `package.json`/`CLAWD.md`
explicitly or they'll drift back to dead weight.

### CLI source layout

`src/` builds exactly this closure — `tsc`'s `include` list in
[tsconfig.json](./tsconfig.json) matches it on purpose:

```text
src/
├── cli.ts            # entry point, arg parsing, mode dispatch
├── commands.ts        # /wallet /perps /chain /chart /arena /goal ... slash commands
├── env.ts              # .env + ~/.grok/config.toml loading and precedence
├── zai.ts               # Z.AI client — chat, streaming, vision, image, slide agent
├── xai.ts                # xAI/Grok client
├── deepseek.ts             # DeepSeek client
├── openrouter.ts            # OpenRouter Nemo/Fable routing (NemoClaw-equivalent)
├── grok-models.ts            # model catalog, provider defaults (zai first)
├── wallet.ts                   # local Solana keypair create/list
├── arena.ts                     # Agent Arena — on-chain identity via Metaplex Core
├── solana-harness.ts             # read-first Solana RPC harness
├── x402.ts                        # x402 payment client
├── verify.ts                       # environment preflight checks
├── voice-agent.ts                   # xAI Voice Agent client
├── telegram.ts                       # Telegram relay — chat/CLI only, Z.AI by default
├── modes/                              # code, trade, research, image, voice, repl, chain, chart
└── *.test.ts                            # node:test suites (see npm test)
```

Current OpenRouter routes:

```bash
OPENROUTER_NEMO_MODEL1=nvidia/nemotron-3-ultra-550b-a55b:free
OPENROUTER_NEMO_MODEL2=nvidia/nemotron-3-ultra-550b-a55b
OPENROUTER_NEMO_MODEL3=nvidia/nemotron-3-super-120b-a12b:free
OPENROUTER_FABLE5=anthropic/claude-fable-5
OPENROUTER_FABLE_LATESY=~anthropic/claude-fable-latest
```

### Web Client

`web/` is a standalone Next.js chat UI for Clawd Code. It's a separate npm
package (its own `package.json`, `node_modules`, `tsconfig.json`) — it does
not build or run as part of `npm run build` at the repo root.

```bash
cd web
npm install
cp .env.example .env.local   # set ZAI_API_KEY (default) and/or other provider keys
npm run dev                  # http://localhost:3000
npm run build                # production build
npm run type-check           # tsc --noEmit
```

- **Provider** — Settings → Provider mirrors the CLI's provider list
  (`zai` default, `xai`, `anthropic`, `openrouter`, `deepseek`); each
  provider's key is stored locally and sent to `/api/chat`, which forwards to
  `NEXT_PUBLIC_API_URL` using that key (or the matching server-side env var
  as a fallback — `ZAI_API_KEY` by default).
- **Telegram** — Settings → Telegram lets you fill in `TELEGRAM_BOT_TOKEN` /
  `TELEGRAM_ALLOWED_CHAT_ID` and shows the exact `clawd-code telegram`
  invocation to start the relay. The web app itself never runs the relay or
  touches the bot token server-side — it's CLI-only, chat/CLI relay only, no
  computer-use.
- `web/.env.example` documents every provider key plus the Telegram vars.

### Clawd Code Plugin

`clawd-plugin/` bundles the Clawd Code skill set and auto-starts MCP servers
for live Solana tooling:

```bash
clawd --plugin-dir ./clawd-plugin
```

MCP servers configured in [clawd-plugin/.mcp.json](./clawd-plugin/.mcp.json):

| Server | Purpose |
| --- | --- |
| `helius` | Solana blockchain access — DAS API, RPC, webhooks, streaming |
| `clawd-code` | Clawd Code CLI as an MCP server; `ZAI_API_KEY`/`CLAWD_PROVIDER=zai` wired by default |
| `pump-mcp` | Pump.fun — token creation, AMM swaps, analytics, wallet ops |
| `phoenix-rise` | Real-time perpetuals orderbook and funding rate data |
| `DFlow` | Trading API details, schemas, and code examples |
| `zkcompression` | ZK compressed token and account tools |

Skills in `clawd-plugin/skills/`:

| Skill | Invoke | Covers |
| --- | --- | --- |
| `clawd-code` | `/clawd:code` | Clawd Code CLI — code, chain, chart, trade, research, image, voice, REPL, telegram, wallet ops, perps |
| `build` | `/clawd:build` | Solana development with Helius infrastructure |
| `dflow` | `/clawd:dflow` | Trading apps combining DFlow with Helius |
| `phantom` | `/clawd:phantom` | Frontend Solana apps with Phantom wallet |
| `jupiter` | `/clawd:jupiter` | DeFi apps — Jupiter swaps, lending, limit orders, DCA |
| `okx` | `/clawd:okx` | OKX DEX integration patterns |
| `agent-arena` | `/clawd:agent-arena` | Registering/discovering agents on Cheshire Terminal, ATOM reputation |
| `svm` | `/clawd:svm` | Solana protocol internals — accounts, execution, consensus |

Full details: [clawd-plugin/README.md](./clawd-plugin/README.md).

## Quick Start

```bash
clawd-code code "Build a Jupiter swap bot in TypeScript"
clawd-code wallet create
clawd-code wallet list
clawd-code chain status
clawd-code chain balance default
clawd-code chain ask "what should I inspect before touching this program?"
clawd-code perps
clawd-code funding
clawd-code trade "funding rate on SOL perps"
clawd-code trade "analyze chart" --chart ./chart.png
clawd-code chart "analyze this SOL chart" --image ./chart.png
clawd-code slides "weekly Solana market report" --pages 6
clawd-code poster "launch poster for a new charting model"
clawd-code research --agents 16 "Solana perps funding arb"
clawd-code image "cyberpunk Solana trading desk"
clawd-code repl
clawd-code arena status
TELEGRAM_BOT_TOKEN=... TELEGRAM_ALLOWED_CHAT_ID=... clawd-code telegram
```

## Commands

| Command | Purpose |
| --- | --- |
| `clawd-code code "<prompt>"` | Generate TypeScript/Solana code (streaming with `--stream`) |
| `clawd-code trade "<intent>"` | Run perps market, paper trade, and position workflows |
| `clawd-code chain <subcommand>` | Solana blockchain RPC harness with Z.AI planning |
| `clawd-code chart "<prompt>"` | GLM-5.2 chart/report agent with optional GLM-5V image reads |
| `clawd-code slides "<prompt>"` | Generate slide decks through Z.ai `slides_glm_agent` |
| `clawd-code poster "<prompt>"` | Generate posters through Z.ai `slides_glm_agent` |
| `clawd-code wallet create [name]` | Create a local Solana keypair |
| `clawd-code wallet list` | List local wallet public keys |
| `clawd-code perps` | Show perps dashboard |
| `clawd-code funding` | Show funding-rate dashboard |
| `clawd-code research "<prompt>"` | Run multi-agent research (streaming with `--stream`) |
| `clawd-code image "<prompt>"` | Generate images with GLM-Image when configured |
| `clawd-code voice "<text>"` | Generate voice via local TTS or xAI Voice Agent API |
| `clawd-code voice --agent` | Real-time Solana voice agent (requires `XAI_API_KEY`, Node 22+) |
| `clawd-code repl` | Interactive multi-turn conversation REPL |
| `clawd-code arena <subcommand>` | Agent Arena — on-chain identity, discovery, reputation |
| `clawd-code verify` | Run environment checks |
| `clawd-code telegram` | Start the Telegram relay — chat/CLI only, Z.AI by default, no computer-use |

Slash aliases such as `clawd-code /wallet create` and `clawd-code /perps` still
work for compatibility.

## Configuration

Runtime configuration lives in `~/.clawd-code/.env`. Start from
[.env.example](./.env.example).

| Variable | Description | Default |
| --- | --- | --- |
| `CLAWD_PROVIDER` | AI provider: `zai`, `xai`, `anthropic`, `openrouter`, or `deepseek` | `zai` |
| `CLAWD_MODEL` | Model used by the selected provider | `glm-5.2` |
| `ZAI_API_KEY` | Z.AI API key for GLM-5.2, GLM-5V, and GLM-Image | empty |
| `ZAI_BASE_URL` | Z.AI OpenAI-compatible base URL | `https://api.z.ai/api/paas/v4` |
| `ZAI_AGENT_BASE_URL` | Z.AI Agent API base URL for slide/poster generation | `https://api.z.ai/api/v1` |
| `ZAI_CHART_MODEL` | Chart/report planning model | `glm-5.2` |
| `ZAI_VISION_MODEL` | Default screenshot/chart vision model | `glm-5v-turbo` |
| `ZAI_TRADE_VISION_MODEL` | Trade/chart analysis vision model | `glm-5v-turbo` |
| `ZAI_CHART_VISION_MODEL` | Chart mode vision model | `glm-5v-turbo` |
| `ZAI_IMAGE_MODEL` | Image generation model | `glm-image` |
| `ZAI_THINKING` | Z.AI thinking mode | `enabled` |
| `ZAI_REASONING_EFFORT` | GLM reasoning effort | `max` |
| `XAI_API_KEY` | xAI API key for Grok models + Voice Agent API | empty |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude models (streaming) | empty |
| `DEEPSEEK_API_KEY` | DeepSeek API key | empty |
| `OPENROUTER_API_KEY` | OpenRouter API key (free models supported) | empty |
| `OPENROUTER_NEMO_MODEL1` | Balanced/free OpenRouter Nemo route | `nvidia/nemotron-3-ultra-550b-a55b:free` |
| `OPENROUTER_NEMO_MODEL2` | Most-intelligent OpenRouter Nemo route | `nvidia/nemotron-3-ultra-550b-a55b` |
| `OPENROUTER_NEMO_MODEL3` | Fast/free OpenRouter Nemo route | `nvidia/nemotron-3-super-120b-a12b:free` |
| `OPENROUTER_FABLE5` | OpenRouter Claude Fable 5 route | `anthropic/claude-fable-5` |
| `OPENROUTER_FABLE_LATESY` | OpenRouter Claude Fable latest route | `~anthropic/claude-fable-latest` |
| `CLAWD_STREAM` | Enable streaming output by default | `false` |
| `SOLANA_RPC_URL` | Solana RPC endpoint | mainnet-beta |
| `SOLANA_CLUSTER` | Solana cluster label for the harness | inferred |
| `SOLANA_COMMITMENT` | RPC commitment for harness reads | `confirmed` |
| `SOLANA_HARNESS_READONLY` | Blocks mutation RPC when true | `true` |
| `HELIUS_API_KEY` | Optional Helius key for RPC/DAS workflows | empty |
| `VULCAN_MCP_URL` | Vulcan MCP server URL | `http://localhost:3001` |
| `LIVE_TRADING` | Enables live trading path when true | `false` |
| `OPERATOR_CONFIRMED` | Required operator acknowledgement for live trading | `false` |
| `PERPS_SIM_ONLY` | Keeps perps execution simulated | `true` |

### Default Models Per Mode

| Mode | Default model | Notes |
| --- | --- | --- |
| `code` / `repl` / `trade` | `glm-5.2` | Z.AI flagship coding model, 1M context, thinking mode, SSE streaming |
| `research` | `glm-5.2` | Deep synthesis with `thinking` and `reasoning_effort` |
| `chart` | `glm-5.2` + `glm-5v-turbo` | Chart/report planning, screenshot analysis, and slide/poster export |
| `slides` / `poster` | `slides_glm_agent` | Z.ai Agent API exports decks/posters with optional PDF URLs |
| `trade` chart vision | `glm-5v-turbo` | `--chart`, `--image`, screenshots, and real-time visual analysis |
| `image` | `glm-image` | Z.AI text-to-image via `/images/generations`; falls back to DALL-E / Gemini |
| `voice --agent` | `grok-voice-think-fast-1.0` | xAI realtime voice agent API with Solana tools |

Override per-session with `--model <id>` or `--provider <name>`, or globally
with `CLAWD_MODEL=` / `CLAWD_PROVIDER=` in `~/.clawd-code/.env`. Use
`CLAWD_PROVIDER=openrouter` with `CLAWD_MODEL=auto` to route each prompt across
the configured OpenRouter Nemo models. Use `--thinking`, `--no-thinking`, or
`--reasoning-effort high` to adjust GLM thinking for one run.

### Optional Grok-style config (`~/.grok/config.toml`)

Clawd Code also reads the standard xAI Grok config locations:

- `~/.grok/config.toml` (user)
- `./.grok/config.toml` (project, overrides user)

Supported subset of TOML (see `parseGrokConfigToml()` in `src/env.ts`):

```toml
# ~/.grok/config.toml
[models]
default = "glm-5.2"

[model.grok-fast]
model = "grok-4.3-fast"
base_url = "https://api.x.ai/v1"
name = "Grok Fast"
env_key = "XAI_API_KEY"

[ui]
permission_mode = "ask"
```

When this file sets `[models] default = "..."`, Clawd Code uses it as the
default model (unless `CLAWD_MODEL` is set explicitly). `[model.<name>]`
blocks populate `~/.grok/inspected-models` for `/inspect` discovery.

Precedence (low → high): `~/.clawd-code/.env` < `./.env` < `~/.grok/config.toml`
< `./.grok/config.toml` < `process.env`.

### `/inspect` command (Grok `inspect` equivalent)

```bash
clawd-code /inspect
# or
clawd-code inspect
```

Prints: config sources, active provider/model, API key health, optional xAI
`/v1/models` reachability, per-mode defaults, and the model catalog grouped by
provider.

Never commit `.env`, wallet files, API keys, private keys, or generated outputs.
The repository ignore rules exclude `.env`, `.clawd/`, `node_modules/`,
`dist/`, and `outputs/`.

## Wallets

```bash
clawd-code wallet create
clawd-code wallet create trader-1
clawd-code wallet list
```

Wallets are stored as Solana CLI-compatible keypair JSON files under
`~/.clawd-code/wallets` with `0600` permissions. Treat those files like private
keys.

## Solana Blockchain Harness

```bash
clawd-code chain status
clawd-code chain balance default
clawd-code chain account <ADDRESS>
clawd-code chain tx <SIGNATURE>
clawd-code chain signatures <ADDRESS> --limit 20
clawd-code chain token <MINT>
clawd-code chain token-accounts <OWNER> --mint <MINT>
clawd-code chain fees
clawd-code chain blockhash
clawd-code chain simulate <BASE64_TRANSACTION>
clawd-code chain ask "inspect this program safely before upgrade"
```

The harness uses `SOLANA_RPC_URL` or `HELIUS_RPC_URL`, with `HELIUS_API_KEY`
as the mainnet fallback. It is read-only by default. `send-raw` is blocked
unless `SOLANA_HARNESS_READONLY=false`, `LIVE_TRADING=true`, and
`OPERATOR_CONFIRMED=true` are all set. `airdrop` only works on devnet, testnet,
or localnet.

`chain ask` uses `ZAI_API_KEY` with GLM-5.2 to turn natural-language Solana
intents into safe harness commands and explanations using a live RPC snapshot.

## Perps Safety

Perps workflows default to paper mode. Live trading requires all of these:

```bash
LIVE_TRADING=true
OPERATOR_CONFIRMED=true
PERPS_SIM_ONLY=false
```

The trade mode also applies local preflight constraints such as allowed symbols,
maximum notional, maximum leverage, and maximum spread. Review the code and your
configuration before enabling live execution.

## AI Providers

Clawd Code supports five AI providers with unified streaming:

| Provider | Alias | Models | Streaming |
| --- | --- | --- | --- |
| `zai` | *(default)* | `glm-5.2`, `glm-5-turbo`, `glm-5v-turbo`, `glm-image`, `cogview-4` | native SSE / image API |
| `xai` | `grok` | `grok-4.3`, `grok-4.3-fast`, `grok-4.20-multi-agent`, `grok-voice-think-fast-1.0`, `grok-imagine-image-quality`, … | native SSE |
| `anthropic` | `claude`, `ant` | `claude-sonnet-4-6`, `claude-opus-4-8`, `claude-haiku-4-5-20251001` | native SSE |
| `openrouter` | `or` | Nemo auto routing (`OPENROUTER_NEMO_MODEL1/2/3`), Fable routes (`OPENROUTER_FABLE5`, `OPENROUTER_FABLE_LATESY`) + any OR model | native SSE |
| `deepseek` | `ds` | `deepseek-v4-pro`, `deepseek-v4-flash` | blocking |

```bash
# Stream code generation with Claude
clawd-code code --provider anthropic --stream "Build an Anchor staking program"

# Use the default GLM-5.2 thinking path
clawd-code code --stream "Review this Solana program"

# Use prompt-based OpenRouter Nemo routing
clawd-code code --provider openrouter --model auto "Review this TypeScript"

# Analyze a chart screenshot with GLM-5V
clawd-code trade "analyze SOL chart for paper setup" --chart ./chart.png

# Switch provider for session
clawd-code /provider anthropic

# List all models
clawd-code /models
```

OpenRouter auto routing is deterministic and local. Short/simple prompts route
to `OPENROUTER_NEMO_MODEL3`, complex coding/research prompts route to
`OPENROUTER_NEMO_MODEL2`, and balanced prompts route to
`OPENROUTER_NEMO_MODEL1`. Passing an explicit OpenRouter model ID bypasses the
router. Fable aliases are available as `fable5` and `fable-latest`, backed by
`OPENROUTER_FABLE5` and `OPENROUTER_FABLE_LATESY`.

## Interactive REPL

```bash
clawd-code repl
```

An interactive multi-turn conversation session. Dot commands:

| Command | Action |
| --- | --- |
| `.mode code\|research\|trade\|general` | Switch conversation mode |
| `.provider zai\|xai\|anthropic\|openrouter\|deepseek` | Switch AI provider |
| `.model <id>` | Switch model mid-session |
| `.thinking on\|off` | Toggle Z.AI thinking mode |
| `.effort max\|xhigh\|high\|medium\|low\|minimal\|none` | Set Z.AI reasoning effort |
| `.clear` | Clear message history |
| `.history` | Print conversation history |
| `.help` | Show all dot commands |
| `.exit` / `.quit` | End session |

## xAI Voice Agent

Real-time Solana voice interactions powered by `grok-voice-think-fast-1.0` via the xAI Voice Agent API. Requires `XAI_API_KEY` and Node.js 22+.

```bash
# Start voice agent REPL (text I/O over WebSocket)
clawd-code voice --agent

# Choose a voice persona (eve, ara, rex, sal, leo)
clawd-code voice --agent --voice ara

# Pin to a specific model
clawd-code voice --agent --model grok-voice-think-fast-1.0
```

Built-in Solana function tools:

| Tool | Description |
| --- | --- |
| `check_sol_balance` | Get SOL balance for any wallet address |
| `get_token_price` | Current price of any Solana token in USD |
| `get_funding_rate` | Phoenix DEX perps funding rate for a symbol |
| `check_positions` | Open perpetuals positions |
| `paper_trade` | Paper trade on Phoenix (no real funds) |
| `send_sol` | Send SOL — paper mode unless `LIVE_TRADING=true` |
| `get_market_overview` | SOL price, trending tokens, 24h change |

For ephemeral token generation (browser/mobile clients):

```typescript
import { VoiceAgentClient } from '@solana-clawd/clawd-code/voice-agent';
const token = await VoiceAgentClient.fetchEphemeralToken(process.env.XAI_API_KEY, 300);
```

## Telegram Relay

Long-polls the Telegram Bot API and routes messages from a single allowlisted
chat into the Z.AI GLM chat pipeline. **Chat/CLI relay only** — there is no
computer-use, mouse/keyboard, or OS-level control exposed. Unauthorized chats
are rejected and logged.

```bash
TELEGRAM_BOT_TOKEN=... TELEGRAM_ALLOWED_CHAT_ID=... clawd-code telegram
```

| Variable | Required | Description |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | Yes | From [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_ALLOWED_CHAT_ID` | Yes | Only this chat id may reach the bot. Message the bot once, then check `https://api.telegram.org/bot<token>/getUpdates` to find it |
| `CLAWD_MODEL` | No | Model used for replies (default `glm-5.2`) |

Send `/reset` or `/clear` in the chat to clear the relay's in-memory
conversation history.

## Agent Arena

Clawd Code integrates the [Cheshire Terminal](https://cheshireterminal.ai) Agent Arena — on-chain AI agent identity via Metaplex Core NFTs on Solana with ATOM reputation, Google A2A + Anthropic MCP discovery cards, and $CLAWD payment verification.

```bash
# Check API health
clawd-code arena health

# Mint your agent NFT (costs ~0.01 SOL in tx fees)
clawd-code arena mint --wallet <YOUR_SOLANA_PUBKEY> --name "My Agent"

# Register capabilities, A2A and MCP cards
clawd-code arena register \
  --wallet <YOUR_PUBKEY> \
  --a2a https://my-agent.com/a2a \
  --mcp https://my-agent.com/mcp \
  --capabilities trading,research,solana

# Fetch any agent's profile
clawd-code arena fetch <assetAddress>

# Submit a verified review (requires $CLAWD payment proof)
clawd-code arena review <assetAddress> \
  --tx <txSignature> \
  --from <yourWallet> \
  --score 95

# View stored on-chain identity
clawd-code arena status
```

| Subcommand | Description |
| --- | --- |
| `arena health` / `arena ping` | Check Cheshire Terminal API health |
| `arena mint` | Mint agent NFT on Solana mainnet |
| `arena register` | Register capabilities + A2A/MCP discovery cards |
| `arena fetch <addr>` | Fetch any agent's on-chain profile |
| `arena review <addr>` | Submit a verified ATOM reputation review |
| `arena status` / `arena identity` | Show your stored on-chain identity |

After minting, identity is saved to `~/.clawd-code/arena-identity.json` with `0600`
permissions. Identity scheme: `svm://solana-mainnet/<metaplex-core-asset-address>`.

$CLAWD mint: `8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump`

## Development

```bash
npm install
npm run build
npm test
npm audit
npm pack --dry-run
```

Project layout:

```text
clawd-code/
├── clawd-plugin/                  # plugin manifest, MCP config, skills
├── docs/                          # install/layout notes
├── src/                           # CLI runtime and provider adapters
│   ├── openrouter.ts              # Nemo/Fable OpenRouter routing
│   ├── grok-models.ts             # model/provider registry
│   └── modes/
├── web/                           # web client package
├── quantitative-signal-discovery-agent/
├── son_of_anton_program/
├── install.sh                     # installer and .env bootstrap
├── clawd.json                     # agent metadata
├── Skill.md
├── CLAWD.md
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Release Contents

The npm package allowlist includes only:

- `dist/`
- `install.sh`
- `README.md`
- `LICENSE`
- `.env.example`
- `clawd.json`

Local runtime files and secrets are intentionally excluded.

## License

MIT. See [LICENSE](./LICENSE).

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&duration=3200&pause=1200&color=9945FF&center=true&vCenter=true&width=560&lines=Built+for+Solana+%C2%B7+Paper-Gated+by+Default;%24CLAWD+%C2%B7+8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump" alt="footer" />

</div>
