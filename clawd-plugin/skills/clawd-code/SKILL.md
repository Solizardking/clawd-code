# Clawd Code Skill

> Makes your AI agent an expert at using the Clawd Code CLI — Solana-native coding agent with code, chain, chart, trade, research, image, voice, REPL, and Telegram relay modes. Z.AI (GLM-5.2) is the default provider everywhere — CLI, MCP server, web client, and the Telegram relay.

## When to Use This Skill

- User asks to generate Solana code (TypeScript, Anchor, Rust)
- User asks about perpetuals trading, funding rates, or positions
- User wants multi-agent deep research
- User asks to generate images or synthesize voice
- User wants to create/manage Solana wallets locally
- User wants to check token prices, balances, or funding rates
- User wants to run trading strategies (TWAP, grid, TA)

## Mode Routing

Clawd Code operates across the package root CLI modes. Route user requests accordingly:

| Mode | Trigger Keywords | Command |
|------|-----------------|---------|
| CODE | "write code", "build", "deploy program", "create bot" | `clawd-code code "<prompt>"` |
| CHAIN | "balance", "account", "transaction", "token accounts", "rpc" | `clawd-code chain <subcommand>` |
| CHART | "chart", "screenshot", "slides", "poster", "report" | `clawd-code chart "<prompt>" --image <path>` |
| TRADE | "short", "long", "funding", "perp", "position", "trade" | `clawd-code trade "<intent>"` |
| RESEARCH | "research", "analyze", "compare", "deep dive" | `clawd-code research --agents <4|16> "<prompt>"` |
| IMAGE | "generate image", "create image", "draw" | `clawd-code image "<prompt>"` |
| VOICE | "speak", "say", "tts", "voice" | `clawd-code voice "<text>"` |
| REPL | "interactive", "chat", "session" | `clawd-code repl` |
| TELEGRAM | "telegram", "telegram bot", "relay from my phone" | `clawd-code telegram` |

## Quick Commands

| Command | Description |
|---------|-------------|
| `clawd-code wallet create [name]` | Create local Solana keypair |
| `clawd-code wallet list` | List local wallets |
| `clawd-code chain status` | Solana RPC harness status |
| `clawd-code chain balance [wallet]` | Wallet balance snapshot |
| `clawd-code perps` | Perpetuals dashboard |
| `clawd-code funding` | Funding rate dashboard |
| `clawd-code trade "<intent>"` | Trade/funding/position workflow |
| `clawd-code research "<prompt>"` | Multi-agent research |
| `clawd-code image "<prompt>"` | Image generation |
| `clawd-code repl` | Interactive provider/model switching session |
| `clawd-code verify` | Preflight environment checks |
| `clawd-code telegram` | Start the Telegram relay (chat/CLI only, Z.AI by default, no computer-use) |

## Environment Variables

Required in `~/.clawd-code/.env`:

| Variable | Required | Default |
|----------|----------|---------|
| `ZAI_API_KEY` | Yes for default GLM provider | — |
| `XAI_API_KEY` | Yes for Grok/voice mode | — |
| `OPENROUTER_API_KEY` | Yes for OpenRouter Nemo/Fable routing | — |
| `HELIUS_API_KEY` | Optional | — |
| `SOLANA_RPC_URL` | No | Helius mainnet |
| `CLAWD_PROVIDER` | No | `zai` |
| `CLAWD_MODEL` | No | `glm-5.2` |
| `OPENROUTER_NEMO_MODEL1` | No | `nvidia/nemotron-3-ultra-550b-a55b:free` |
| `OPENROUTER_NEMO_MODEL2` | No | `nvidia/nemotron-3-ultra-550b-a55b` |
| `OPENROUTER_NEMO_MODEL3` | No | `nvidia/nemotron-3-super-120b-a12b:free` |
| `OPENROUTER_FABLE5` | No | `anthropic/claude-fable-5` |
| `OPENROUTER_FABLE_LATESY` | No | `~anthropic/claude-fable-latest` |
| `LIVE_TRADING` | No | `false` |
| `PERPS_SIM_ONLY` | No | `true` |
| `TELEGRAM_BOT_TOKEN` | Yes for `clawd-code telegram` | — |
| `TELEGRAM_ALLOWED_CHAT_ID` | Yes for `clawd-code telegram` | — |

## Safety Rules

1. **Default to PAPER mode** — never execute live trading without confirmation
2. **Preflight required** — always run clawd-code verify before any trading operation
3. **Live mode gates** — requires all three: `LIVE_TRADING=true`, `OPERATOR_CONFIRMED=true`, `PERPS_SIM_ONLY=false`
4. **Never share private keys** — wallet files are `0600` permissions
5. **Always use <clawd-think>Probe the numinous, then execute the work.</clawd-think>** on first turn
6. **Signal confidence must be explicit** — label confidence scores for every trading signal
7. **Never invent signatures, prices, or addresses** — say "not available" when data isn't in hand

## Reference Files

- `references/` — Deep reference docs for Clawd Code CLI usage, wallet operations, perps workflows, and integration patterns
- Package root: `/Users/8bit/clawd-code`
- Plugin root: `/Users/8bit/clawd-code/clawd-plugin`
- OpenRouter Nemo/Fable routing is built into `src/openrouter.ts`; there is no separate `NemoClaw/` sidecar package in the current checkout.
