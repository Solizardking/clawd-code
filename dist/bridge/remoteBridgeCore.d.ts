/**
 * Env-less Remote Control bridge core.
 *
 * "Env-less" = no Environments API layer. Distinct from "CCR v2" (the
 * /worker/* transport protocol) — the env-based path (replBridge.ts) can also
 * use CCR v2 transport via CLAUDE_CODE_USE_CCR_V2. This file is about removing
 * the poll/dispatch layer, not about which transport protocol is underneath.
 *
 * Unlike initBridgeCore (env-based, ~2400 lines), this connects directly
 * to the session-ingress layer without the Environments API work-dispatch
 * layer:
 *
 *   1. POST /v1/code/sessions              (OAuth, no env_id)  → session.id
 *   2. POST /v1/code/sessions/{id}/bridge  (OAuth)             → {worker_jwt, expires_in, api_base_url, worker_epoch}
 *      Each /bridge call bumps epoch — it IS the register. No separate /worker/register.
 *   3. createV2ReplTransport(worker_jwt, worker_epoch)         → SSE + CCRClient
 *   4. createTokenRefreshScheduler                             → proactive /bridge re-call (new JWT + new epoch)
 *   5. 401 on SSE → rebuild transport with fresh /bridge credentials (same seq-num)
 *
 * No register/poll/ack/stop/heartbeat/deregister environment lifecycle.
 * The Environments API historically existed because CCR's /worker/*
 * endpoints required a session_id+role=worker JWT that only the work-dispatch
 * layer could mint. Server PR #292605 (renamed in #293280) adds the /bridge endpoint as a direct
 * OAuth→worker_jwt exchange, making the env layer optional for REPL sessions.
 *
 * Gated by `tengu_bridge_repl_v2` GrowthBook flag in initReplBridge.ts.
 * REPL-only — daemon/print stay on env-based.
 */
import type { ReplBridgeHandle, BridgeState } from './replBridge.js';
import type { Message } from '../types/message.js';
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
import type { SDKControlResponse } from '../entrypoints/sdk/controlTypes.js';
import type { PermissionMode } from '../utils/permissions/PermissionMode.js';
export type EnvLessBridgeParams = {
    baseUrl: string;
    orgUUID: string;
    title: string;
    getAccessToken: () => string | undefined;
    onAuth401?: (staleAccessToken: string) => Promise<boolean>;
    /**
     * Converts internal Message[] → SDKMessage[] for writeMessages() and the
     * initial-flush/drain paths. Injected rather than imported — mappers.ts
     * transitively pulls in src/commands.ts (entire command registry + React
     * tree) which would bloat bundles that don't already have it.
     */
    toSDKMessages: (messages: Message[]) => SDKMessage[];
    initialHistoryCap: number;
    initialMessages?: Message[];
    onInboundMessage?: (msg: SDKMessage) => void | Promise<void>;
    /**
     * Fired on each title-worthy user message seen in writeMessages() until
     * the callback returns true (done). Mirrors replBridge.ts's onUserMessage —
     * caller derives a title and PATCHes /v1/sessions/{id} so auto-started
     * sessions don't stay at the generic fallback. The caller owns the
     * derive-at-count-1-and-3 policy; the transport just keeps calling until
     * told to stop. sessionId is the raw cse_* — updateBridgeSessionTitle
     * retags internally.
     */
    onUserMessage?: (text: string, sessionId: string) => boolean;
    onPermissionResponse?: (response: SDKControlResponse) => void;
    onInterrupt?: () => void;
    onSetModel?: (model: string | undefined) => void;
    onSetMaxThinkingTokens?: (maxTokens: number | null) => void;
    onSetPermissionMode?: (mode: PermissionMode) => {
        ok: true;
    } | {
        ok: false;
        error: string;
    };
    onStateChange?: (state: BridgeState, detail?: string) => void;
    /**
     * When true, skip opening the SSE read stream — only the CCRClient write
     * path is activated. Threaded to createV2ReplTransport and
     * handleServerControlRequest.
     */
    outboundOnly?: boolean;
    /** Free-form tags for session categorization (e.g. ['ccr-mirror']). */
    tags?: string[];
};
/**
 * Create a session, fetch a worker JWT, connect the v2 transport.
 *
 * Returns null on any pre-flight failure (session create failed, /bridge
 * failed, transport setup failed). Caller (initReplBridge) surfaces this
 * as a generic "initialization failed" state.
 */
export declare function initEnvLessBridgeCore(params: EnvLessBridgeParams): Promise<ReplBridgeHandle | null>;
export { createCodeSession, type RemoteCredentials, } from './codeSessionApi.js';
import { type RemoteCredentials } from './codeSessionApi.js';
export declare function fetchRemoteCredentials(sessionId: string, baseUrl: string, accessToken: string, timeoutMs: number): Promise<RemoteCredentials | null>;
//# sourceMappingURL=remoteBridgeCore.d.ts.map