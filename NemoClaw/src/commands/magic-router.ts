// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import type { PluginLogger, NemoclawdConfig } from "../index.js";
import {
  buildOpenRouterRequest,
  selectMagicRoute,
  type MagicRouterBudget,
  type MagicRouterLatency,
  type MagicRouterRisk,
} from "../magic-router.js";

export interface MagicRouterOptions {
  task?: string;
  risk?: MagicRouterRisk;
  budget?: MagicRouterBudget;
  latency?: MagicRouterLatency;
  tools?: string;
  sessionId?: string;
  json: boolean;
  logger: PluginLogger;
  pluginConfig: NemoclawdConfig;
}

function splitTools(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean);
}

export async function cliMagicRouter(opts: MagicRouterOptions): Promise<void> {
  const { logger, pluginConfig } = opts;
  const task = opts.task ?? "Pick the best Solana-native model and tools for this request.";
  const selection = selectMagicRoute({
    task,
    risk: opts.risk,
    budget: opts.budget,
    latency: opts.latency,
    requestedTools: splitTools(opts.tools),
    sessionId: opts.sessionId,
  });
  const request = buildOpenRouterRequest(selection, task);

  if (opts.json) {
    logger.info(JSON.stringify({ selection, openRouterRequest: request }, null, 2));
    return;
  }

  logger.info("Nemo Clawd Magic Router");
  logger.info("=======================");
  logger.info("");
  logger.info(`Intent:     ${selection.intent}`);
  logger.info(`Provider:   ${selection.provider} (${selection.endpoint})`);
  logger.info(`Credential: $${selection.credentialEnv}`);
  logger.info(`Model:      ${selection.model}`);
  logger.info(`Fallbacks:  ${selection.models.join(", ")}`);
  logger.info(`Confidence: ${Math.round(selection.confidence * 100)}%`);
  logger.info(`Reason:     ${selection.reason}`);
  logger.info("");
  logger.info("Provider routing:");
  logger.info(JSON.stringify(selection.providerRouting, null, 2));
  logger.info("");
  logger.info("Tool set:");
  for (const tool of selection.toolSet) {
    logger.info(`  - ${tool.id} [${tool.risk}] ${tool.reason}`);
  }
  logger.info("");
  logger.info("Apply this route with OpenShell:");
  logger.info(`  openshell inference set --provider ${pluginConfig.inferenceProvider} --model ${selection.model}`);
  logger.info("");
  logger.info("OpenRouter request preview:");
  logger.info(JSON.stringify(request, null, 2));
}
