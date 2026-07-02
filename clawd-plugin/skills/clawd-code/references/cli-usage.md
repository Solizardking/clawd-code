# Clawd Code CLI Usage

## Mode Reference

### CODE MODE
Generates TypeScript, Anchor, Rust Solana code.

```bash
clawd-code code "Build a Jupiter swap bot in TypeScript"
clawd-code code "Create an Anchor program for token staking"
```

### TRADE MODE
Perpetuals trading with Phoenix Rise + Vulcan MCP.

```bash
clawd-code trade "SOL funding rate?"
clawd-code trade "short SOL $100"
clawd-code trade "long ETH $50"
```

**Preflight checks (all required for live):**
- SOL in allowlist
- Notional ≤ cap
- Leverage ≤ max
- Spread ≤ max bps

**Execution modes:**
- PAPER (default) — simulated execution
- LIVE — requires `LIVE_TRADING=true`, `OPERATOR_CONFIRMED=true`, `PERPS_SIM_ONLY=false`

### RESEARCH MODE
Multi-agent deep research with the configured provider. The default provider is
Z.AI GLM-5.2; OpenRouter can route through Nemo or explicit Fable aliases.

```bash
clawd-code research --agents 4 "Solana perps funding arb"
clawd-code research --agents 16 "AI agent frameworks 2025"
```

### IMAGE MODE
Image generation via Z.AI GLM-Image by default.

```bash
clawd-code image "cyberpunk Solana trading desk"
clawd-code image "neon clawd logo" --model glm-image
```

### VOICE MODE
Text-to-speech via sherpa-onnx or ElevenLabs.

```bash
clawd-code voice "Clawd Code is operational"
```

## Solana CLI Commands

| Command | Description |
|---------|-------------|
| `clawd-code wallet create [name]` | Create local Solana keypair |
| `clawd-code wallet list` | List local wallet public keys |
| `clawd-code chain status` | Show Solana RPC harness status |
| `clawd-code chain balance [wallet]` | Wallet balance snapshot |
| `clawd-code chain account ADDRESS` | Inspect an account |
| `clawd-code perps` | Perpetuals dashboard |
| `clawd-code funding` | Funding rate dashboard |
| `clawd-code trade "<intent>"` | Trade/funding/position workflow |
| `clawd-code research "<prompt>"` | Research mode |
| `clawd-code image "<prompt>"` | Image mode |
| `clawd-code repl` | Interactive model/provider session |
| `clawd-code models` | List available models |
| `clawd-code provider` | Show/switch AI provider |
| `clawd-code goal <text>` | Natural language intent router |
| `clawd-code verify` | Preflight environment checks |

## Output Format

- Default: text (rich terminal output with box-drawing)
- JSONL: `--format json` for machine-parseable output

## Providers

| Provider | Key | Default Model |
|----------|-----|---------------|
| zai | `ZAI_API_KEY` | glm-5.2 |
| xai | `XAI_API_KEY` | grok-4.3 |
| anthropic | `ANTHROPIC_API_KEY` | claude-sonnet-4-6 |
| openrouter | `OPENROUTER_API_KEY` | auto Nemo routing, fable5, fable-latest |
| deepseek | `DEEPSEEK_API_KEY` | deepseek-v4-pro |

Switch: `clawd-code /provider <zai|xai|anthropic|openrouter|deepseek>`
