# Exploration Guide

Use this guide to navigate the current source tree without confusing the active Clawd CLI with the retained upstream Claude Code app.

## Start Here

| Goal | Start with |
|------|------------|
| Understand the runnable package | `package.json`, then `src/cli.ts` |
| Understand active commands | `src/cli.ts`, then `src/commands.ts` |
| Understand active models | `src/grok-models.ts`, then provider adapters |
| Understand active Solana RPC | `src/solana-harness.ts`, then `src/modes/chain.ts` |
| Understand active trading mode | `src/modes/trade.ts` |
| Understand active chart/slides mode | `src/modes/chart.ts`, then `src/zai.ts` |
| Understand active research/code/repl | `src/modes/research.ts`, `src/modes/code.ts`, `src/modes/repl.ts` |
| Understand retained upstream tools | `src/tools.ts`, `src/Tool.ts`, `src/services/tools/` |
| Understand retained upstream UI | `src/main.tsx`, `src/replLauncher.tsx`, `src/screens/REPL.tsx`, `src/ink/`, `src/components/` |
| Understand retained bridge | `src/bridge/bridgeMain.ts`, then `docs/bridge.md` |

## Known Traps

| Trap | What to do |
|------|------------|
| `src/commands.ts` is not the upstream slash-command registry anymore. | Use it for active Clawd/Solana commands. Use `src/commands copy.ts` for the retained upstream registry shape. |
| `src/main.tsx` imports `getCommands` from `./commands.js`. | That import currently matches `src/commands copy.ts`, not the active `src/commands.ts`. |
| `src/tools.ts` describes retained upstream agent tools. | The active `src/cli.ts` modes do not route through the tool registry. |
| Some feature-gated imports reference files not present in this checkout. | Keep those flags off unless the missing directories are restored. |
| `webbuild/` was listed in the task request. | It is not present in the current worktree. |
| The retained upstream app uses Bun-specific `feature('...')` gates. | The active package scripts target Node/tsx/tsc. |

## Active CLI Study Path

1. Read `package.json` for scripts and bin mapping.
2. Read `src/cli.ts` for global commands, direct command aliases, flags, provider normalization, and mode dispatch.
3. Read `src/env.ts` for config precedence.
4. Read `src/grok-models.ts` for model IDs, aliases, defaults, streaming support, and provider grouping.
5. Read provider adapters:
   - `src/zai.ts`
   - `src/xai.ts`
   - `src/anthropic.ts`
   - `src/openrouter.ts`
   - `src/deepseek.ts`
6. Read the relevant mode in `src/modes/`.
7. Read support files such as `src/solana-harness.ts`, `src/wallet.ts`, `src/arena.ts`, `src/x402.ts`, `src/telegram.ts`, or `src/verify.ts`.

## Active Command Lookup

Use these searches:

```bash
rg "directCommands" src/cli.ts
rg "export async function cmd" src/commands.ts
rg "case '" src/modes/chain.ts
rg "handleCommand" src/modes/repl.ts
rg "normalizeProvider|defaultModelForProvider" src/cli.ts
rg "runTelegramRelay|TELEGRAM_ALLOWED_CHAT_ID" src/telegram.ts src/cli.ts
```

## Active Model Lookup

Use these searches:

```bash
rg "export const MODELS" src/grok-models.ts
rg "DEFAULT_MODEL|DEFAULT_PROVIDER|DEFAULT_VOICE_MODEL" src/grok-models.ts
rg "ZAI_DEFAULT_MODEL|ZAI_IMAGE_MODEL|ZAI_SLIDE_AGENT_ID" src/zai.ts
rg "OPENROUTER_NEMO|OPENROUTER_FABLE|OPENROUTER_AUTO" src/openrouter.ts
rg "ANTHROPIC_MODELS|DEFAULT_CLAUDE_MODEL" src/anthropic.ts
rg "deepseek-v4" src
```

## Retained Upstream Study Path

For the retained upstream app:

1. Read `src/main.tsx` for Commander setup, startup prefetch, settings, MCP, plugins, skills, remote, direct-connect, and REPL launch.
2. Compare command registry expectations with `src/commands copy.ts`.
3. Read `src/replLauncher.tsx` and `src/screens/REPL.tsx`.
4. Read `src/QueryEngine.ts` for the LLM/tool loop.
5. Read `src/Tool.ts`, `src/tools.ts`, and `src/services/tools/`.
6. Read `src/hooks/toolPermission/` and `src/components/permissions/`.
7. Read `src/services/mcp/` for MCP.
8. Read `src/bridge/` for remote-control bridge.

## Directory Map

| Directory | What to inspect there |
|-----------|-----------------------|
| `assistant/` | Kairos/assistant history and feature-gated assistant pieces. |
| `bootstrap/` | Shared startup/session mutable state. |
| `bridge/` | IDE/claude.ai bridge, polling, session spawning, permissions, JWT refresh. |
| `buddy/` | Feature-gated companion UI and prompts. |
| `cli/` | Retained upstream transport, IO, update, and print helpers. |
| `commands/` | Retained upstream slash-command modules. |
| `components/` | Retained Ink UI components, dialogs, permissions UI, settings, MCP, task UI. |
| `constants/` | Product, prompt, beta, tool, key, API, system, and message constants. |
| `context/` | React contexts. |
| `coordinator/` | Multi-agent coordinator mode. |
| `entrypoints/` | Upstream CLI, MCP server, SDK, init, and sandbox entrypoints. |
| `hooks/` | Retained React hooks for input, tools, IDE, settings, tasks, plugins, voice, permissions. |
| `ink/` | Custom/vendored Ink renderer and terminal primitives. |
| `keybindings/` | Keybinding schemas, defaults, parsing, matching, validation. |
| `memdir/` | Memory paths, scan, prompts, aging, relevance. |
| `migrations/` | Settings/model migrations. |
| `modes/` | Active Clawd headless modes. |
| `moreright/` | Horizontal overflow UI hook. |
| `native-ts/` | Native TypeScript utility replacements. |
| `outputStyles/` | Output style loading. |
| `plugins/` | Built-in and bundled plugins. |
| `query/` | Query dependencies, config, stop hooks, token budget, transitions. |
| `remote/` | CCR remote session manager and WebSocket handling. |
| `schemas/` | Hook schemas. |
| `screens/` | Retained Ink screens. |
| `server/` | Direct-connect and web terminal/admin/auth server. |
| `services/` | API, analytics, MCP, compacting, OAuth, LSP, settings, x402, voice, tips, memory, plugins. |
| `shims/` | Bun/preload/macro shims. |
| `skills/` | Bundled skills and skill loaders. |
| `state/` | App state store/selectors/change observers. |
| `tasks/` | Local shell, agent, remote, teammate, dream, and main session tasks. |
| `tools/` | Retained upstream agent tools. |
| `types/` | Shared TypeScript type definitions. |
| `upstreamproxy/` | Upstream proxy/relay helpers. |
| `utils/` | Large shared utility layer. Search before editing. |
| `vim/` | Vim input primitives. |
| `voice/` | Voice feature detection. |

## Top-Level Files

| File | Role |
|------|------|
| `anthropic.ts` | Active Anthropic client. |
| `arena.ts` | Active Cheshire Terminal agent identity client. |
| `cli.ts` | Active package entrypoint. |
| `commands.ts` | Active command implementations. |
| `commands copy.ts` | Retained upstream command registry. |
| `context.ts` | Retained upstream context assembly. |
| `cost-tracker.ts`, `costHook.ts` | Retained cost tracking pieces. |
| `deepseek.ts` | Active DeepSeek client. |
| `dialogLaunchers.tsx` | Retained upstream dialog launcher helpers. |
| `env.test.ts` | Tests for active environment loading. |
| `env.ts` | Active env and Grok config loading. |
| `grok-models.ts` | Active model registry. |
| `headless.ts` | Retained headless upstream path. |
| `history.ts` | Retained history helpers. |
| `ink.ts` | Retained Ink export surface. |
| `interactiveHelpers.tsx` | Retained interactive render helpers. |
| `main.tsx` | Retained upstream Commander/Ink entrypoint. |
| `model-defaults.test.ts` | Tests for active model defaults. |
| `openrouter.test.ts` | Tests for OpenRouter routing/helpers. |
| `openrouter.ts` | Active OpenRouter adapter. |
| `projectOnboardingState.ts` | Retained onboarding state. |
| `query.ts`, `QueryEngine.ts` | Retained query engine entrypoints. |
| `replLauncher.tsx` | Retained upstream REPL launcher. |
| `setup.ts` | Setup helpers. |
| `solana-harness.test.ts` | Tests for Solana harness behavior. |
| `solana-harness.ts` | Active Solana RPC harness. |
| `telegram.ts` | Active Telegram Bot API long-poll relay into Z.AI chat. |
| `Task.ts`, `tasks.ts` | Retained task framework helpers. |
| `Tool.ts`, `tools.ts` | Retained tool framework and registry. |
| `verify.test.ts` | Tests for environment verification. |
| `verify.ts` | Active environment verifier. |
| `voice-agent.ts` | Active voice-agent support. |
| `wallet.test.ts` | Tests for wallet behavior. |
| `wallet.ts` | Active wallet helper. |
| `x402.test.ts` | Tests for x402 helper behavior. |
| `x402.ts` | Active x402 helper. |
| `xai.ts` | Active xAI client. |
| `zai.test.ts` | Tests for Z.AI helper behavior. |
| `zai.ts` | Active Z.AI client. |

## Grep Patterns

```bash
# Active CLI
rg "directCommands|normalizeProvider|defaultModelForProvider" src/cli.ts
rg "cmdGoal|cmdArena|cmdWallet|cmdChain|cmdChart" src/commands.ts
rg "class .*Mode" src/modes

# Models and providers
rg "id: '" src/grok-models.ts
rg "OPENROUTER_|ZAI_|ANTHROPIC_|DeepSeek|XAI" src

# Retained upstream commands
rg "satisfies Command|name: '" src/commands -g '*.ts' -g '*.tsx' -g '*.js'
rg "getCommands|loadAllCommands" "src/commands copy.ts"

# Retained tools
rg "buildTool\\(" src/tools
rg "getAllBaseTools|getTools|assembleToolPool" src/tools.ts
rg "checkPermissions|isConcurrencySafe|isReadOnly" src/tools

# Feature gates
rg "feature\\('" src

# Solana and trading gates
rg "SOLANA_HARNESS|LIVE_TRADING|OPERATOR_CONFIRMED|PERPS_SIM_ONLY" src

# Bridge and remote
rg "runBridgeLoop|BRIDGE_MODE|DirectConnect|RemoteSessionManager" src
```

## Before Editing

1. Identify whether the change belongs to the active Clawd CLI or retained upstream runtime.
2. Prefer the active files for runnable product behavior: `src/cli.ts`, `src/commands.ts`, `src/modes/`, `src/grok-models.ts`, and provider adapters.
3. Prefer upstream files for UI/tool/bridge/MCP behavior.
4. Check tests next to active modules: `*.test.ts` files exist for env, model defaults, OpenRouter, Solana harness, wallet, x402, Z.AI, and verification.
5. Run focused searches before assuming old docs are accurate.

## See Also

- [Architecture](architecture.md)
- [Commands Reference](commands.md)
- [Tools Reference](tools.md)
- [Subsystems Guide](subsystems.md)
- [Bridge Layer](bridge.md)
