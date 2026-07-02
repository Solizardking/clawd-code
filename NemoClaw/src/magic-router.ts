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
export type MagicRouterProvider = "zai" | "openrouter";

export const ZAI_BASE_URL = "https://api.z.ai/api/paas/v4";
export const ZAI_DEFAULT_MODEL = "glm-5.2";
export const ZAI_FAST_MODEL = "glm-5-turbo";
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
export const OPENROUTER_AUTO_MODEL = "openrouter/auto";

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

export interface MagicRouterAgentWallet {
  provider: "openshell";
  scope: "agent-private";
  name: string;
  statePath: string;
  exportPrivateKey: false;
  requireHumanApprovalForSigning: boolean;
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
  provider: MagicRouterProvider;
  endpoint: string;
  credentialEnv: "ZAI_API_KEY" | "OPENROUTER_API_KEY";
  intent: MagicRouterIntent;
  model: string;
  models: string[];
  openRouterModels: string[];
  providerRouting: MagicRouterProviderRouting;
  toolSet: MagicRouterTool[];
  confidence: number;
  reason: string;
  agentWallet?: MagicRouterAgentWallet;
  sessionId?: string;
}

interface IntentProfile {
  intent: MagicRouterIntent;
  keywords: string[];
  provider?: MagicRouterProvider;
  model: string;
  models: string[];
  openRouterModels: string[];
  tools: MagicRouterTool[];
  reason: string;
  agentWallet?: MagicRouterAgentWallet;
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
  openshellWallet: [
    {
      id: "openshell_wallet_private_status",
      reason: "Confirm the agent-scoped OpenShell wallet exists without exporting key material.",
      risk: "read_only",
    },
    {
      id: "openshell_wallet_sign_request",
      reason: "Prepare a wallet signing request that still requires explicit human approval.",
      risk: "approval_required",
    },
  ],
} satisfies Record<string, MagicRouterTool[]>;

const INTENT_PROFILES: IntentProfile[] = [
  {
    intent: "code",
    keywords: ["code", "debug", "typescript", "python", "anchor", "program", "sdk", "test"],
    provider: "zai",
    model: ZAI_DEFAULT_MODEL,
    models: [ZAI_DEFAULT_MODEL, ZAI_FAST_MODEL],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "anthropic/claude-sonnet-4.5", "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.code, ...TOOL_SETS.research],
    reason: "Code tasks default to Z.AI GLM-5.2 for 1M-context engineering work, with OpenRouter kept as an assist route.",
  },
  {
    intent: "deep-reasoning",
    keywords: ["deep", "reason", "plan", "architecture", "thesis", "strategy", "audit"],
    provider: "zai",
    model: ZAI_DEFAULT_MODEL,
    models: [ZAI_DEFAULT_MODEL, ZAI_FAST_MODEL],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "anthropic/claude-sonnet-4.5", "openai/gpt-5"],
    tools: [...TOOL_SETS.market, ...TOOL_SETS.research],
    reason: "Deep reasoning defaults to GLM-5.2 thinking mode and uses OpenRouter as a model-routing advisor.",
  },
  {
    intent: "general",
    keywords: ["nvidia", "nim", "nemotron", "private", "openshell", "open shell", "agent wallet"],
    provider: "zai",
    model: ZAI_DEFAULT_MODEL,
    models: [ZAI_DEFAULT_MODEL, ZAI_FAST_MODEL],
    openRouterModels: [
      OPENROUTER_AUTO_MODEL,
      "nvidia/nemotron-3-ultra-550b-a55b",
      "nvidia/nemotron-3-super-120b-a12b:free",
    ],
    tools: [...TOOL_SETS.code, ...TOOL_SETS.openshellWallet, ...TOOL_SETS.wallet],
    reason: "The NVIDIA GLM agent uses GLM-5.2 as the private default and keeps NVIDIA Nemotron routes available through OpenRouter assist.",
    agentWallet: {
      provider: "openshell",
      scope: "agent-private",
      name: "nvidia-glm-5-2",
      statePath: "~/.nemoclawd/openshell-wallets/nvidia-glm-5-2",
      exportPrivateKey: false,
      requireHumanApprovalForSigning: true,
    },
  },
  {
    intent: "solana-trading",
    keywords: ["trade", "buy", "sell", "snipe", "pump", "quote", "position", "exit", "entry"],
    provider: "zai",
    model: ZAI_DEFAULT_MODEL,
    models: [ZAI_DEFAULT_MODEL, ZAI_FAST_MODEL],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "anthropic/claude-sonnet-4.5", "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.market, ...TOOL_SETS.wallet, ...TOOL_SETS.execution],
    reason: "Trading uses GLM-5.2 for planning, Solana read tools, wallet context, and approval-gated execution.",
  },
  {
    intent: "solana-research",
    keywords: ["research", "scan", "trend", "token", "market", "alpha", "narrative", "rank"],
    provider: "zai",
    model: ZAI_DEFAULT_MODEL,
    models: [ZAI_DEFAULT_MODEL, ZAI_FAST_MODEL],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "anthropic/claude-sonnet-4.5", "google/gemini-3-flash-preview"],
    tools: [...TOOL_SETS.market, ...TOOL_SETS.research],
    reason: "Research defaults to GLM-5.2 and uses OpenRouter prompt-aware model choice as a second opinion.",
  },
  {
    intent: "wallet-risk",
    keywords: ["wallet", "pnl", "risk", "exposure", "balance", "drawdown", "holder"],
    provider: "zai",
    model: ZAI_DEFAULT_MODEL,
    models: [ZAI_DEFAULT_MODEL, ZAI_FAST_MODEL],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "openai/gpt-5-mini", "anthropic/claude-sonnet-4.5"],
    tools: [...TOOL_SETS.wallet, ...TOOL_SETS.market],
    reason: "Wallet risk needs deterministic read-only wallet and transaction inspection tools.",
  },
  {
    intent: "vision",
    keywords: ["image", "vision", "screenshot", "chart", "meme", "avatar"],
    provider: "openrouter",
    model: OPENROUTER_AUTO_MODEL,
    models: [OPENROUTER_AUTO_MODEL, "google/gemini-3-flash-preview", "openai/gpt-5-mini"],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "google/gemini-3-flash-preview", "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.research],
    reason: "Vision tasks should allow OpenRouter to pick a multimodal model.",
  },
  {
    intent: "voice",
    keywords: ["voice", "speech", "audio", "talk", "tts", "transcribe"],
    provider: "openrouter",
    model: OPENROUTER_AUTO_MODEL,
    models: [OPENROUTER_AUTO_MODEL, "openai/gpt-5-mini"],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "openai/gpt-5-mini"],
    tools: [...TOOL_SETS.research],
    reason: "Voice tasks need low-latency model selection and minimal read-only tools.",
  },
  {
    intent: "fast-chat",
    keywords: ["quick", "fast", "short", "latency", "now"],
    provider: "zai",
    model: ZAI_FAST_MODEL,
    models: [ZAI_FAST_MODEL, ZAI_DEFAULT_MODEL],
    openRouterModels: [OPENROUTER_AUTO_MODEL, "openai/gpt-5-mini:nitro", "google/gemini-3-flash-preview:nitro"],
    tools: [...TOOL_SETS.market],
    reason: "Fast chat uses GLM-5 Turbo by default while OpenRouter keeps low-latency fallbacks available.",
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
        provider: "zai",
        model: ZAI_DEFAULT_MODEL,
        models: [ZAI_DEFAULT_MODEL, ZAI_FAST_MODEL],
        openRouterModels: [OPENROUTER_AUTO_MODEL, "openai/gpt-5-mini", "anthropic/claude-sonnet-4.5"],
        tools: [...TOOL_SETS.market],
        reason: "General task: use Z.AI GLM-5.2 by default, with OpenRouter Auto Router available as an assist route.",
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
  const provider = profile.provider ?? "zai";
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
    provider,
    endpoint: provider === "zai" ? ZAI_BASE_URL : OPENROUTER_BASE_URL,
    credentialEnv: provider === "zai" ? "ZAI_API_KEY" : "OPENROUTER_API_KEY",
    intent: profile.intent,
    model: profile.model,
    models: profile.models,
    openRouterModels: profile.openRouterModels,
    providerRouting,
    toolSet,
    confidence,
    reason: profile.reason,
    agentWallet: profile.agentWallet,
    sessionId: input.sessionId,
  };
}

export function buildProviderRequest(selection: MagicRouterSelection, prompt: string): Record<string, unknown> {
  const tools = selection.toolSet.map((tool) => ({
    type: "function",
    function: {
      name: tool.id,
      description: tool.reason,
    },
  }));

  if (selection.provider === "openrouter") {
    return buildOpenRouterRequest(selection, prompt);
  }

  return {
    model: selection.model,
    messages: [{ role: "user", content: prompt }],
    thinking: { type: "enabled" },
    reasoning_effort: "max",
    tools,
  };
}

export function buildOpenRouterRequest(selection: MagicRouterSelection, prompt: string): Record<string, unknown> {
  const models = selection.openRouterModels.length > 0
    ? selection.openRouterModels
    : [OPENROUTER_AUTO_MODEL];

  return {
    model: models[0],
    models,
    messages: [
      {
        role: "system",
        content: "You are the Nemo Clawd Magic Router. Recommend the best OpenRouter fallback model and tool posture for this Solana-native task.",
      },
      { role: "user", content: prompt },
    ],
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
