# Clawd Code Plugin

Build on Solana with Clawd Code. One plugin install gives you live blockchain
references, expert coding patterns, perpetuals workflows, x402 payments, and
autonomous agent commerce guidance.

This plugin targets the Clawd Code package root at `/Users/8bit/clawd-code`.
Z.AI (GLM-5.2) is the default provider everywhere Clawd Code runs — CLI, this
plugin's MCP server, the web client, and the Telegram relay. OpenRouter
Nemo/Fable routing is built into the CLI provider adapter at
`src/openrouter.ts` for when you switch providers explicitly.

## Install

### From a marketplace

```
/plugin marketplace add solizardking/clawd-plugins
/plugin install clawd-code@solizardking
```

### Local testing

```bash
clawd --plugin-dir ./clawd-code/clawd-plugin
```

## What's Included

**Helius MCP Server** — auto-starts with the plugin. 10 routed tools covering DAS API, RPC, webhooks, streaming, wallet analysis, and docs.

**Clawd Code MCP Server** — auto-starts the Clawd Code CLI as an MCP server for code generation, trading, research, images, and voice. Defaults to Z.AI (GLM-5.2) via `ZAI_API_KEY`.

**Phoenix Rise MCP Server** — auto-starts for real-time perpetuals orderbook and funding rate data.

**Imperial Router support** — Clawd Code can read Imperial funding/portfolio
state and route live perps through Imperial when `IMPERIAL_LIVE=true` and the
global live gates are armed. Phoenix is the default underwriter (`2`).

**DFlow MCP Server** — auto-starts for trading API details, response schemas, and code examples.

### Skills

| Skill | Invoke | What It Does |
|---|---|---|
| **Clawd Code** | `/clawd:code` | Makes your agent an expert at using the Clawd Code CLI — code, chain, chart, trade, research, image, voice, REPL, wallet ops, perps workflows |
| **Build** | `/clawd:build` | Makes your agent an expert Solana developer — Helius APIs, routing logic, SDK patterns |
| **DFlow** | `/clawd:dflow` | Makes your agent an expert at building Solana trading apps — DFlow swaps, prediction markets, KYC |
| **Phantom** | `/clawd:phantom` | Makes your agent an expert at building frontend dApps — Phantom Connect SDK, token gating, NFT minting |
| **Jupiter** | `/clawd:jupiter` | Makes your agent an expert at building DeFi apps — Jupiter swaps, lending, limit orders, DCA |
| **SVM** | `/clawd:svm` | Solana protocol expert — architecture, consensus, execution engine |

### Reference Files

Deep documentation bundled with each skill covering DAS API, Sender, Priority Fees, Webhooks, WebSockets, LaserStream, Wallet API, Enhanced Transactions, Onboarding, Clawd Code CLI usage, perps workflows, wallet operations, DFlow spot trading/prediction markets, Phantom SDKs, Jupiter APIs, and SVM architecture.

## API Key Setup

Set in `~/.clawd-code/.env`. `ZAI_API_KEY` is the only key required out of the
box — every mode, the MCP server in this plugin, and the Telegram relay
default to Z.AI (GLM-5.2):

```bash
# Default provider — required
ZAI_API_KEY=your-zai-key

# Other providers — optional, only needed if you switch CLAWD_PROVIDER
XAI_API_KEY=your-xai-key
OPENROUTER_API_KEY=your-openrouter-key
OPENROUTER_NEMO_MODEL1=nvidia/nemotron-3-ultra-550b-a55b:free
OPENROUTER_NEMO_MODEL2=nvidia/nemotron-3-ultra-550b-a55b
OPENROUTER_NEMO_MODEL3=nvidia/nemotron-3-super-120b-a12b:free
OPENROUTER_FABLE5=anthropic/claude-fable-5
OPENROUTER_FABLE_LATESY=~anthropic/claude-fable-latest
HELIUS_API_KEY=your-helius-key
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=your-helius-key

# Telegram relay — optional, only needed for `clawd-code telegram`
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_ALLOWED_CHAT_ID=your-chat-id
```

## Usage

Once installed, just ask questions in plain English:

- "Build a Jupiter swap bot in TypeScript"
- "What's the funding rate on SOL perps?"
- "Research the latest AI agent frameworks"
- "Generate an image of a cyberpunk Solana trading desk"
- "What NFTs does this wallet own?"
- "Create wallet and show me my balance"
- "Set up webhooks to monitor my wallet"
- "Parse this transaction: 5abc..."
- "Start the Telegram relay so I can chat with my agent from my phone"

Your agent picks the right tools and reads the right reference files automatically.

## License

MIT. See [LICENSE](./LICENSE).

## Links

- [Clawd Code on GitHub](https://github.com/Solizardking/solana-clawd/tree/main/clawd-code)
- [x402 Protocol](https://x402.wtf)
- [Helius Documentation](https://www.helius.dev/docs)
