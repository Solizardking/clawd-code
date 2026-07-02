// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

export type MagicRouterIntent =
  | "solana-trading"
  | "solana-research"
  | "wallet-risk"
  | "code"
  | "vision"
  | "voice"
  | "fast-chat"
  | "deep-reasoning"
  | "general";

export type MagicRouterRisk = "read_only" | "approval_required" | "live_trading";
export type MagicRouterBudget = "low" | "balanced" | "quality";
export type MagicRouterLatency = "low" | "balanced" | "deep";

export interface MagicRouterInput {
  task?: string;
  risk?: MagicRouterRisk;
  budget?: MagicRouterBudget;
  latency?: MagicRouterLatency;
  requestedTools?: string[];
  sessionId?: string;
}

export interface MagicRouterTool {
  id: string;
  reason: string;
  risk: MagicRouterRisk;
}

export interface MagicRouterProviderRouting {
  allow_fallbacks: boolean;
  require_parameters: boolean;
  data_collection: "allow" | "deny";
  sort:
    | "price"
    | "throughput"
    | "latency"
    | {
        by: "price" | "throughput" | "latency";
        partition: "model" | "none";
      };
  preferred_max_latency?: number | { p90: number };
  preferred_min_throughput?: number | { p50: number };
  zdr?: boolean;
}

export interface MagicRouterSelection {
  router: "magic-router";
  provider: "openrouter";
  endpoint: "https://openrouter.ai/api/v1";
  credentialEnv: "OPENROUTER_API_KEY";
  intent: MagicRouterIntent;
  model: string;
  models: string[];
  providerRouting: MagicRouterProviderRouting;
  toolSet: MagicRouterTool[];
  confidence: number;
  reason: string;
  sessionId?: string;
}

interface IntentProfile {
  intent: MagicRouterIntent;
  keywords: string[];
  model: string;
  models: string[];
  tools: MagicRouterTool[];
  reason: string;
}

const TOOL_SETS = {
  market: [
    { id: "solana_price", reason: "Fetch live token price before analysis.", risk: "read_only" },
    { id: "solana_trending", reason: "Find current Solana market momentum.", risk: "read_only" },
    { id: "solana_token_info", reason: "Inspect token metadata and basic safety signals.", risk: "read_only" },
  ],
  wallet: [
    { id: "solana_wallet_pnl", reason: "Measure wallet PnL and exposure.", risk: "read_only" },
    { id: "solana_wallet_tokens", reason: "Inspect wallet token balances.", risk: "read_only" },
    { id: "helius_transactions", reason: "Trace recent on-chain wallet activity.", risk: "read_only" },
  ],
  execution: [
    { id: "pump_buy_quote", reason: "Quote a Pump.fun buy without submitting a trade.", risk: "approval_required" },
    { id: "pump_sell_quote", reason: "Quote a Pump.fun sell without submitting a trade.", risk: "approval_required" },
    { id: "trade_execute", reason: "Submit a trade only after explicit human approval.", risk: "live_trading" },
  ],
  research: [
    { id: "agent_spawn", reason: "Fan out deep market or protocol research.", risk: "read_only" },
    { id: "memory_recall", reason: "Reuse learned market context.", risk: "read_only" },
    { id: "memory_write", reason: "Persist vetted observations.", risk: "read_only" },
  ],
  code: [
    { id: "helius_account_info", reason: "Inspect account data while debugging Solana code.", risk: "read_only" },
    { id: "helius_das_asset", reason: "Read NFT or compressed asset state.", risk: "read_only" },
  ],
} satisfies Record<string, MagicRouterTool[]>;

const INTENT_PROFILES: IntentProfile[] = [
  {
    intent: "solana-trading",
    keywords: ["trade", "buy", "sell", "snipe", "pump", "quote", "position", "exit", "entry"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "anthropic/claude-sonnet-4.5", "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.market, ...TOOL_SETS.wallet, ...TOOL_SETS.execution],
    reason: "Trading needs market data, wallet context, quote tools, and approval-gated execution.",
  },
  {
    intent: "solana-research",
    keywords: ["research", "scan", "trend", "token", "market", "alpha", "narrative", "rank"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "anthropic/claude-sonnet-4.5", "google/gemini-3-flash-preview"],
    tools: [...TOOL_SETS.market, ...TOOL_SETS.research],
    reason: "Research benefits from OpenRouter prompt-aware model choice plus read-only market tools.",
  },
  {
    intent: "wallet-risk",
    keywords: ["wallet", "pnl", "risk", "exposure", "balance", "drawdown", "holder"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "openai/gpt-5-mini", "anthropic/claude-sonnet-4.5"],
    tools: [...TOOL_SETS.wallet, ...TOOL_SETS.market],
    reason: "Wallet risk needs deterministic read-only wallet and transaction inspection tools.",
  },
  {
    intent: "code",
    keywords: ["code", "debug", "typescript", "python", "anchor", "program", "sdk", "test"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "anthropic/claude-sonnet-4.5", "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.code, ...TOOL_SETS.research],
    reason: "Code tasks need stronger reasoning and chain/account inspection tools.",
  },
  {
    intent: "vision",
    keywords: ["image", "vision", "screenshot", "chart", "meme", "avatar"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "google/gemini-3-flash-preview", "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.research],
    reason: "Vision tasks should allow OpenRouter to pick a multimodal model.",
  },
  {
    intent: "voice",
    keywords: ["voice", "speech", "audio", "talk", "tts", "transcribe"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.research],
    reason: "Voice tasks need low-latency model selection and minimal read-only tools.",
  },
  {
    intent: "fast-chat",
    keywords: ["quick", "fast", "short", "latency", "now"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "openai/gpt-5-mini:nitro", "google/gemini-3-flash-preview:nitro"],
    tools: [...TOOL_SETS.market],
    reason: "Fast chat prioritizes throughput and a compact read-only tool set.",
  },
  {
    intent: "deep-reasoning",
    keywords: ["deep", "reason", "plan", "architecture", "thesis", "strategy", "audit"],
    model: "openrouter/auto",
    models: ["openrouter/auto", "anthropic/claude-sonnet-4.5", "openai/gpt-5"],
    tools: [...TOOL_SETS.market, ...TOOL_SETS.research],
    reason: "Deep reasoning should let OpenRouter choose from stronger models with fallbacks.",
  },
];

function normalizeTask(task: string | undefined): string {
  return (task ?? "").toLowerCase().replace(/[^a-z0-9\s_-]+/g, " ");
}

function profileScore(profile: IntentProfile, task: string): number {
  return profile.keywords.reduce((score, keyword) => {
    return task.includes(keyword) ? score + 1 : score;
  }, 0);
}

function chooseProfile(task: string): { profile: IntentProfile; score: number } {
  let best = INTENT_PROFILES[0];
  let bestScore = -1;
  for (const profile of INTENT_PROFILES) {
    const score = profileScore(profile, task);
    if (score > bestScore) {
      best = profile;
      bestScore = score;
    }
  }
  if (!best || bestScore <= 0) {
    return {
      profile: {
        intent: "general",
        keywords: [],
        model: "openrouter/auto",
        models: ["openrouter/auto", "openai/gpt-5-mini", "anthropic/claude-sonnet-4.5"],
        tools: [...TOOL_SETS.market],
        reason: "General task: use OpenRouter Auto Router and keep tools read-only by default.",
      },
      score: 0,
    };
  }
  return { profile: best, score: bestScore };
}

function routeSort(input: MagicRouterInput, intent: MagicRouterIntent): MagicRouterProviderRouting["sort"] {
  if (input.budget === "low") return "price";
  if (input.latency === "low" || intent === "fast-chat") return "latency";
  if (input.latency === "deep" || input.budget === "quality") {
    return { by: "throughput", partition: "none" };
  }
  return { by: "price", partition: "model" };
}

function routeTools(profile: IntentProfile, input: MagicRouterInput): MagicRouterTool[] {
  const requested = new Set((input.requestedTools ?? []).map((tool) => tool.trim()).filter(Boolean));
  const tools = [...profile.tools];
  for (const tool of requested) {
    if (!tools.some((entry) => entry.id === tool)) {
      tools.push({ id: tool, reason: "Explicitly requested by the caller.", risk: input.risk ?? "read_only" });
    }
  }
  if (input.risk !== "live_trading") {
    return tools.filter((tool) => tool.risk !== "live_trading");
  }
  return tools;
}

export function selectMagicRoute(input: MagicRouterInput = {}): MagicRouterSelection {
  const task = normalizeTask(input.task);
  const risk = input.risk ?? "approval_required";
  const { profile, score } = chooseProfile(task);
  const toolSet = routeTools(profile, { ...input, risk });
  const requireParameters = toolSet.length > 0;
  const providerRouting: MagicRouterProviderRouting = {
    allow_fallbacks: true,
    require_parameters: requireParameters,
    data_collection: risk === "live_trading" ? "deny" : "allow",
    sort: routeSort(input, profile.intent),
  };

  if (risk !== "live_trading" && input.latency === "low") {
    providerRouting.preferred_max_latency = { p90: 2 };
  }
  if (input.budget === "quality") {
    providerRouting.preferred_min_throughput = { p50: 40 };
  }
  if (risk === "live_trading") {
    providerRouting.zdr = true;
  }

  const confidence = Math.min(0.95, 0.55 + score * 0.1 + toolSet.length * 0.02);

  return {
    router: "magic-router",
    provider: "openrouter",
    endpoint: "https://openrouter.ai/api/v1",
    credentialEnv: "OPENROUTER_API_KEY",
    intent: profile.intent,
    model: profile.model,
    models: profile.models,
    providerRouting,
    toolSet,
    confidence,
    reason: profile.reason,
    sessionId: input.sessionId,
  };
}

export function buildOpenRouterRequest(selection: MagicRouterSelection, prompt: string): Record<string, unknown> {
  return {
    model: selection.model,
    models: selection.models,
    messages: [{ role: "user", content: prompt }],
    provider: selection.providerRouting,
    tools: selection.toolSet.map((tool) => ({
      type: "function",
      function: {
        name: tool.id,
        description: tool.reason,
      },
    })),
    ...(selection.sessionId ? { session_id: selection.sessionId } : {}),
  };
}
