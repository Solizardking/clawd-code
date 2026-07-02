/**
 * Shared transport-layer helpers for bridge message handling.
 *
 * Extracted from replBridge.ts so both the env-based core (initBridgeCore)
 * and the env-less core (initEnvLessBridgeCore) can use the same ingress
 * parsing, control-request handling, and echo-dedup machinery.
 *
 * Everything here is pure — no closure over bridge-specific state. All
 * collaborators (transport, sessionId, UUID sets, callbacks) are passed
 * as params.
 */
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
import type { SDKControlRequest, SDKControlResponse } from '../entrypoints/sdk/controlTypes.js';
import type { SDKResultSuccess } from '../entrypoints/sdk/coreTypes.js';
import type { Message } from '../types/message.js';
import type { PermissionMode } from '../utils/permissions/PermissionMode.js';
import type { ReplBridgeTransport } from './replBridgeTransport.js';
/** Type predicate for parsed WebSocket messages. SDKMessage is a
 *  discriminated union on `type` — validating the discriminant is
 *  sufficient for the predicate; callers narrow further via the union. */
export declare function isSDKMessage(value: unknown): value is SDKMessage;
/** Type predicate for control_response messages from the server. */
export declare function isSDKControlResponse(value: unknown): value is SDKControlResponse;
/** Type predicate for control_request messages from the server. */
export declare function isSDKControlRequest(value: unknown): value is SDKControlRequest;
/**
 * True for message types that should be forwarded to the bridge transport.
 * The server only wants user/assistant turns and slash-command system events;
 * everything else (tool_result, progress, etc.) is internal REPL chatter.
 */
export declare function isEligibleBridgeMessage(m: Message): boolean;
/**
 * Extract title-worthy text from a Message for onUserMessage. Returns
 * undefined for messages that shouldn't title the session: non-user, meta
 * (nudges), tool results, compact summaries, non-human origins (task
 * notifications, channel messages), or pure display-tag content
 * (<ide_opened_file>, <session-start-hook>, etc.).
 *
 * Synthetic interrupts ([Request interrupted by user]) are NOT filtered here —
 * isSyntheticMessage lives in messages.ts (heavy import, pulls command
 * registry). The initialMessages path in initReplBridge checks it; the
 * writeMessages path reaching an interrupt as the *first* message is
 * implausible (an interrupt implies a prior prompt already flowed through).
 */
export declare function extractTitleText(m: Message): string | undefined;
/**
 * Parse an ingress WebSocket message and route it to the appropriate handler.
 * Ignores messages whose UUID is in recentPostedUUIDs (echoes of what we sent)
 * or in recentInboundUUIDs (re-deliveries we've already forwarded — e.g.
 * server replayed history after a transport swap lost the seq-num cursor).
 */
export declare function handleIngressMessage(data: string, recentPostedUUIDs: BoundedUUIDSet, recentInboundUUIDs: BoundedUUIDSet, onInboundMessage: ((msg: SDKMessage) => void | Promise<void>) | undefined, onPermissionResponse?: ((response: SDKControlResponse) => void) | undefined, onControlRequest?: ((request: SDKControlRequest) => void) | undefined): void;
export type ServerControlRequestHandlers = {
    transport: ReplBridgeTransport | null;
    sessionId: string;
    /**
     * When true, all mutable requests (interrupt, set_model, set_permission_mode,
     * set_max_thinking_tokens) reply with an error instead of false-success.
     * initialize still replies success — the server kills the connection otherwise.
     * Used by the outbound-only bridge mode and the SDK's /bridge subpath so claude.ai sees a
     * proper error instead of "action succeeded but nothing happened locally".
     */
    outboundOnly?: boolean;
    onInterrupt?: () => void;
    onSetModel?: (model: string | undefined) => void;
    onSetMaxThinkingTokens?: (maxTokens: number | null) => void;
    onSetPermissionMode?: (mode: PermissionMode) => {
        ok: true;
    } | {
        ok: false;
        error: string;
    };
};
/**
 * Respond to inbound control_request messages from the server. The server
 * sends these for session lifecycle events (initialize, set_model) and
 * for turn-level coordination (interrupt, set_max_thinking_tokens). If we
 * don't respond, the server hangs and kills the WS after ~10-14s.
 *
 * Previously a closure inside initBridgeCore's onWorkReceived; now takes
 * collaborators as params so both cores can use it.
 */
export declare function handleServerControlRequest(request: SDKControlRequest, handlers: ServerControlRequestHandlers): void;
/**
 * Build a minimal `SDKResultSuccess` message for session archival.
 * The server needs this event before a WS close to trigger archival.
 */
export declare function makeResultMessage(sessionId: string): SDKResultSuccess;
/**
 * FIFO-bounded set backed by a circular buffer. Evicts the oldest entry
 * when capacity is reached, keeping memory usage constant at O(capacity).
 *
 * Messages are added in chronological order, so evicted entries are always
 * the oldest. The caller relies on external ordering (the hook's
 * lastWrittenIndexRef) as the primary dedup — this set is a secondary
 * safety net for echo filtering and race-condition dedup.
 */
export declare class BoundedUUIDSet {
    private readonly capacity;
    private readonly ring;
    private readonly set;
    private writeIdx;
    constructor(capacity: number);
    add(uuid: string): void;
    has(uuid: string): boolean;
    clear(): void;
}
//# sourceMappingURL=bridgeMessaging.d.ts.map