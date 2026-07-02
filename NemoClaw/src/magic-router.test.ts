// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import assert from "node:assert/strict";
import test from "node:test";

import {
  buildOpenRouterRequest,
  buildProviderRequest,
  selectMagicRoute,
  ZAI_DEFAULT_MODEL,
} from "./magic-router.js";

test("defaults general tasks to Z.AI GLM-5.2", () => {
  const selection = selectMagicRoute({ task: "Summarize this Solana launch plan" });

  assert.equal(selection.provider, "zai");
  assert.equal(selection.credentialEnv, "ZAI_API_KEY");
  assert.equal(selection.model, ZAI_DEFAULT_MODEL);
  assert.equal(selection.endpoint, "https://api.z.ai/api/paas/v4");
  assert.ok(selection.openRouterModels.includes("openrouter/auto"));
});

test("adds a private OpenShell wallet for the NVIDIA GLM agent route", () => {
  const selection = selectMagicRoute({
    task: "Create the NVIDIA agent with a private OpenShell wallet",
  });

  assert.equal(selection.provider, "zai");
  assert.equal(selection.model, "glm-5.2");
  assert.equal(selection.agentWallet?.provider, "openshell");
  assert.equal(selection.agentWallet?.scope, "agent-private");
  assert.equal(selection.agentWallet?.exportPrivateKey, false);
  assert.ok(selection.toolSet.some((tool) => tool.id === "openshell_wallet_private_status"));
});

test("keeps live trading tools behind explicit live_trading risk", () => {
  const approvalRoute = selectMagicRoute({ task: "buy a Solana token", risk: "approval_required" });
  const liveRoute = selectMagicRoute({ task: "buy a Solana token", risk: "live_trading" });

  assert.equal(approvalRoute.toolSet.some((tool) => tool.risk === "live_trading"), false);
  assert.equal(liveRoute.toolSet.some((tool) => tool.risk === "live_trading"), true);
  assert.equal(liveRoute.providerRouting.data_collection, "deny");
  assert.equal(liveRoute.providerRouting.zdr, true);
});

test("builds provider and OpenRouter assist requests separately", () => {
  const selection = selectMagicRoute({ task: "debug an Anchor program" });
  const providerRequest = buildProviderRequest(selection, "debug an Anchor program");
  const openRouterRequest = buildOpenRouterRequest(selection, "debug an Anchor program");

  assert.equal(providerRequest.model, "glm-5.2");
  assert.deepEqual(providerRequest.thinking, { type: "enabled" });
  assert.equal(openRouterRequest.model, "openrouter/auto");
  assert.ok(Array.isArray(openRouterRequest.messages));
});
