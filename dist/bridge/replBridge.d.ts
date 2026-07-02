import { BridgeFatalError } from './bridgeApi.js';
import type { BridgeApiClient } from './types.js';
import type { Message } from '../types/message.js';
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
import type { PermissionMode } from '../utils/permissions/PermissionMode.js';
import type { SDKControlRequest, SDKControlResponse } from '../entrypoints/sdk/controlTypes.js';
import { type CapacitySignal } from './capacityWake.js';
import { type PollIntervalConfig } from './pollConfigDefaults.js';
export type ReplBridgeHandle = {
    bridgeSessionId: string;
    environmentId: string;
    sessionIngressUrl: string;
    writeMessages(messages: Message[]): void;
    writeSdkMessages(messages: SDKMessage[]): void;
    sendControlRequest(request: SDKControlRequest): void;
    sendControlResponse(response: SDKControlResponse): void;
    sendControlCancelRequest(requestId: string): void;
    sendResult(): void;
    teardown(): Promise<void>;
};
export type BridgeState = 'ready' | 'connected' | 'reconnecting' | 'failed';
/**
 * Explicit-param input to initBridgeCore. Everything initReplBridge reads
 * from bootstrap state (cwd, session ID, git, OAuth) becomes a field here.
 * A daemon caller (Agent SDK, PR 4) that never runs main.tsx fills these
 * in itself.
 */
export type BridgeCoreParams = {
    dir: string;
    machineName: string;
    branch: string;
    gitRepoUrl: string | null;
    title: string;
    baseUrl: string;
    sessionIngressUrl: string;
    /**
     * Opaque string sent as metadata.worker_type. Use BridgeWorkerType for
     * the two CLI-originated values; daemon callers may send any string the
     * backend recognizes (it's just a filter key on the web side).
     */
    workerType: string;
    getAccessToken: () => string | undefined;
    /**
     * POST /v1/sessions. Injected because `createSession.ts` lazy-loads
     * `auth.ts`/`model.ts`/`oauth/client.ts` and `bun --outfile` inlines
     * dynamic imports — the lazy-load doesn't help, the whole REPL tree ends
     * up in the Agent SDK bundle.
     *
     * REPL wrapper passes `createBridgeSession` from `createSession.ts`.
     * Daemon wrapper passes `createBridgeSessionLean` from `sessionApi.ts`
     * (HTTP-only, orgUUID+model supplied by the daemon caller).
     *
     * Receives `gitRepoUrl`+`branch` so the REPL wrapper can build the git
     * source/outcome for claude.ai's session card. Daemon ignores them.
     */
    createSession: (opts: {
        environmentId: string;
        title: string;
        gitRepoUrl: string | null;
        branch: string;
        signal: AbortSignal;
    }) => Promise<string | null>;
    /**
     * POST /v1/sessions/{id}/archive. Same injection rationale. Best-effort;
     * the callback MUST NOT throw.
     */
    archiveSession: (sessionId: string) => Promise<void>;
    /**
     * Invoked on reconnect-after-env-lost to refresh the title. REPL wrapper
     * reads session storage (picks up /rename); daemon returns the static
     * title. Defaults to () => title.
     */
    getCurrentTitle?: () => string;
    /**
     * Converts internal Message[] → SDKMessage[] for writeMessages() and the
     * initial-flush/drain paths. REPL wrapper passes the real toSDKMessages
     * from utils/messages/mappers.ts. Daemon callers that only use
     * writeSdkMessages() and pass no initialMessages can omit this — those
     * code paths are unreachable.
     *
     * Injected rather than imported because mappers.ts transitively pulls in
     * src/commands.ts via messages.ts → api.ts → prompts.ts, dragging the
     * entire command registry + React tree into the Agent SDK bundle.
     */
    toSDKMessages?: (messages: Message[]) => SDKMessage[];
    /**
     * OAuth 401 refresh handler passed to createBridgeApiClient. REPL wrapper
     * passes handleOAuth401Error; daemon passes its AuthManager's handler.
     * Injected because utils/auth.ts transitively pulls in the command
     * registry via config.ts → file.ts → permissions/filesystem.ts →
     * sessionStorage.ts → commands.ts.
     */
    onAuth401?: (staleAccessToken: string) => Promise<boolean>;
    /**
     * Poll interval config getter for the work-poll heartbeat loop. REPL
     * wrapper passes the GrowthBook-backed getPollIntervalConfig (allows ops
     * to live-tune poll rates fleet-wide). Daemon passes a static config
     * with a 60s heartbeat (5× headroom under the 300s work-lease TTL).
     * Injected because growthbook.ts transitively pulls in the command
     * registry via the same config.ts chain.
     */
    getPollIntervalConfig?: () => PollIntervalConfig;
    /**
     * Max initial messages to replay on connect. REPL wrapper reads from the
     * tengu_bridge_initial_history_cap GrowthBook flag. Daemon passes no
     * initialMessages so this is never read. Default 200 matches the flag
     * default.
     */
    initialHistoryCap?: number;
    initialMessages?: Message[];
    previouslyFlushedUUIDs?: Set<string>;
    onInboundMessage?: (msg: SDKMessage) => void;
    onPermissionResponse?: (response: SDKControlResponse) => void;
    onInterrupt?: () => void;
    onSetModel?: (model: string | undefined) => void;
    onSetMaxThinkingTokens?: (maxTokens: number | null) => void;
    /**
     * Returns a policy verdict so this module can emit an error control_response
     * without importing the policy checks itself (bootstrap-isolation constraint).
     * The callback must guard `auto` (isAutoModeGateEnabled) and
     * `bypassPermissions` (isBypassPermissionsModeDisabled AND
     * isBypassPermissionsModeAvailable) BEFORE calling transitionPermissionMode —
     * that function's internal auto-gate check is a defensive throw, not a
     * graceful guard, and its side-effect order is setAutoModeActive(true) then
     * throw, which corrupts the 3-way invariant documented in src/CLAUDE.md if
     * the callback lets the throw escape here.
     */
    onSetPermissionMode?: (mode: PermissionMode) => {
        ok: true;
    } | {
        ok: false;
        error: string;
    };
    onStateChange?: (state: BridgeState, detail?: string) => void;
    /**
     * Fires on each real user message to flow through writeMessages() until
     * the callback returns true (done). Mirrors remoteBridgeCore.ts's
     * onUserMessage so the REPL bridge can derive a session title from early
     * prompts when none was set at init time (e.g. user runs /remote-control
     * on an empty conversation, then types). Tool-result wrappers, meta
     * messages, and display-tag-only messages are skipped. Receives
     * currentSessionId so the wrapper can PATCH the title without a closure
     * dance to reach the not-yet-returned handle. The caller owns the
     * derive-at-count-1-and-3 policy; the transport just keeps calling until
     * told to stop. Not fired for the writeSdkMessages daemon path (daemon
     * sets its own title at init). Distinct from SessionSpawnOpts's
     * onFirstUserMessage (spawn-bridge, PR #21250), which stays fire-once.
     */
    onUserMessage?: (text: string, sessionId: string) => boolean;
    /** See InitBridgeOptions.perpetual. */
    perpetual?: boolean;
    /**
     * Seeds lastTransportSequenceNum — the SSE event-stream high-water mark
     * that's carried across transport swaps within one process. Daemon callers
     * pass the value they persisted at shutdown so the FIRST SSE connect of a
     * fresh process sends from_sequence_num and the server doesn't replay full
     * history. REPL callers omit (fresh session each run → 0 is correct).
     */
    initialSSESequenceNum?: number;
};
/**
 * Superset of ReplBridgeHandle. Adds getSSESequenceNum for daemon callers
 * that persist the SSE seq-num across process restarts and pass it back as
 * initialSSESequenceNum on the next start.
 */
export type BridgeCoreHandle = ReplBridgeHandle & {
    /**
     * Current SSE sequence-number high-water mark. Updates as transports
     * swap. Daemon callers persist this on shutdown and pass it back as
     * initialSSESequenceNum on next start.
     */
    getSSESequenceNum(): number;
};
/**
 * Poll error recovery constants. When the work poll starts failing (e.g.
 * server 500s), we use exponential backoff and give up after this timeout.
 * This is deliberately long — the server is the authority on when a session
 * is truly dead. As long as the server accepts our poll, we keep waiting
 * for it to re-dispatch the work item.
 */
declare const POLL_ERROR_INITIAL_DELAY_MS = 2000;
declare const POLL_ERROR_MAX_DELAY_MS = 60000;
declare const POLL_ERROR_GIVE_UP_MS: number;
/**
 * Bootstrap-free core: env registration → session creation → poll loop →
 * ingress WS → teardown. Reads nothing from bootstrap/state or
 * sessionStorage — all context comes from params. Caller (initReplBridge
 * below, or a daemon in PR 4) has already passed entitlement gates and
 * gathered git/auth/title.
 *
 * Returns null on registration or session-creation failure.
 */
export declare function initBridgeCore(params: BridgeCoreParams): Promise<BridgeCoreHandle | null>;
/**
 * Persistent poll loop for work items. Runs in the background for the
 * lifetime of the bridge connection.
 *
 * When a work item arrives, acknowledges it and calls onWorkReceived
 * with the session ID and ingress token (which connects the ingress
 * WebSocket). Then continues polling — the server will dispatch a new
 * work item if the ingress WebSocket drops, allowing automatic
 * reconnection without tearing down the bridge.
 */
declare function startWorkPollLoop({ api, getCredentials, signal, onStateChange, onWorkReceived, onEnvironmentLost, getWsState, isAtCapacity, capacitySignal, onFatalError, getPollIntervalConfig, getHeartbeatInfo, onHeartbeatFatal, }: {
    api: BridgeApiClient;
    getCredentials: () => {
        environmentId: string;
        environmentSecret: string;
    };
    signal: AbortSignal;
    onStateChange?: (state: BridgeState, detail?: string) => void;
    onWorkReceived: (sessionId: string, ingressToken: string, workId: string, useCodeSessions: boolean) => void;
    /** Called when the environment has been deleted. Returns new credentials or null. */
    onEnvironmentLost?: () => Promise<{
        environmentId: string;
        environmentSecret: string;
    } | null>;
    /** Returns the current WebSocket readyState label for diagnostic logging. */
    getWsState?: () => string;
    /**
     * Returns true when the caller cannot accept new work (transport already
     * connected). When true, the loop polls at the configured at-capacity
     * interval as a heartbeat only. Server-side BRIDGE_LAST_POLL_TTL is
     * 4 hours — anything shorter than that is sufficient for liveness.
     */
    isAtCapacity?: () => boolean;
    /**
     * Produces a signal that aborts when capacity frees up (transport lost),
     * merged with the loop signal. Used to interrupt the at-capacity sleep
     * so recovery polling starts immediately.
     */
    capacitySignal?: () => CapacitySignal;
    /** Called on unrecoverable errors (e.g. server-side expiry) to trigger full teardown. */
    onFatalError?: () => void;
    /** Poll interval config getter — defaults to DEFAULT_POLL_CONFIG. */
    getPollIntervalConfig?: () => PollIntervalConfig;
    /**
     * Returns the current work ID and session ingress token for heartbeat.
     * When null, heartbeat is not possible (no active work item).
     */
    getHeartbeatInfo?: () => {
        environmentId: string;
        workId: string;
        sessionToken: string;
    } | null;
    /**
     * Called when heartbeatWork throws BridgeFatalError (401/403/404/410 —
     * JWT expired or work item gone). Caller should tear down the transport
     * + work state so isAtCapacity() flips to false and the loop fast-polls
     * for the server's re-dispatched work item. When provided, the loop
     * SKIPS the at-capacity backoff sleep (which would otherwise cause a
     * ~10-minute dead window before recovery). When omitted, falls back to
     * the backoff sleep to avoid a tight poll+heartbeat loop.
     */
    onHeartbeatFatal?: (err: BridgeFatalError) => void;
}): Promise<void>;
export { startWorkPollLoop as _startWorkPollLoopForTesting, POLL_ERROR_INITIAL_DELAY_MS as _POLL_ERROR_INITIAL_DELAY_MS_ForTesting, POLL_ERROR_MAX_DELAY_MS as _POLL_ERROR_MAX_DELAY_MS_ForTesting, POLL_ERROR_GIVE_UP_MS as _POLL_ERROR_GIVE_UP_MS_ForTesting, };
//# sourceMappingURL=replBridge.d.ts.map