import type { ElicitResult, JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';
import type { SDKMessage } from 'src/entrypoints/agentSdkTypes.js';
import type { SDKControlRequest, SDKControlResponse, StdinMessage, StdoutMessage } from 'src/entrypoints/sdk/controlTypes.js';
import type { CanUseToolFn } from 'src/hooks/useCanUseTool.js';
import { type HookCallback } from 'src/types/hooks.js';
import { type RequiresActionDetails, type SessionExternalMetadata } from '../utils/sessionState.js';
import { Stream } from '../utils/stream.js';
/**
 * Synthetic tool name used when forwarding sandbox network permission
 * requests via the can_use_tool control_request protocol. SDK hosts
 * see this as a normal tool permission prompt.
 */
export declare const SANDBOX_NETWORK_ACCESS_TOOL_NAME = "SandboxNetworkAccess";
export declare class StructuredIO {
    private readonly input;
    private readonly replayUserMessages?;
    readonly structuredInput: AsyncGenerator<StdinMessage | SDKMessage>;
    private readonly pendingRequests;
    restoredWorkerState: Promise<SessionExternalMetadata | null>;
    private inputClosed;
    private unexpectedResponseCallback?;
    private readonly resolvedToolUseIds;
    private prependedLines;
    private onControlRequestSent?;
    private onControlRequestResolved?;
    readonly outbound: Stream<StdoutMessage>;
    constructor(input: AsyncIterable<string>, replayUserMessages?: boolean | undefined);
    /**
     * Records a tool_use ID as resolved so that late/duplicate control_response
     * messages for the same tool are ignored by the orphan handler.
     */
    private trackResolvedToolUseId;
    /** Flush pending internal events. No-op for non-remote IO. Overridden by RemoteIO. */
    flushInternalEvents(): Promise<void>;
    /** Internal-event queue depth. Overridden by RemoteIO; zero otherwise. */
    get internalEventsPending(): number;
    /**
     * Queue a user turn to be yielded before the next message from this.input.
     * Works before iteration starts and mid-stream — read() re-checks
     * prependedLines between each yielded message.
     */
    prependUserMessage(content: string): void;
    private read;
    getPendingPermissionRequests(): SDKControlRequest[];
    setUnexpectedResponseCallback(callback: (response: SDKControlResponse) => Promise<void>): void;
    /**
     * Inject a control_response message to resolve a pending permission request.
     * Used by the bridge to feed permission responses from claude.ai into the
     * SDK permission flow.
     *
     * Also sends a control_cancel_request to the SDK consumer so its canUseTool
     * callback is aborted via the signal — otherwise the callback hangs.
     */
    injectControlResponse(response: SDKControlResponse): void;
    /**
     * Register a callback invoked whenever a can_use_tool control_request
     * is written to stdout. Used by the bridge to forward permission
     * requests to claude.ai.
     */
    setOnControlRequestSent(callback: ((request: SDKControlRequest) => void) | undefined): void;
    /**
     * Register a callback invoked when a can_use_tool control_response arrives
     * from the SDK consumer (via stdin). Used by the bridge to cancel the
     * stale permission prompt on claude.ai when the SDK consumer wins the race.
     */
    setOnControlRequestResolved(callback: ((requestId: string) => void) | undefined): void;
    private processLine;
    write(message: StdoutMessage): Promise<void>;
    private sendRequest;
    createCanUseTool(onPermissionPrompt?: (details: RequiresActionDetails) => void): CanUseToolFn;
    createHookCallback(callbackId: string, timeout?: number): HookCallback;
    /**
     * Sends an elicitation request to the SDK consumer and returns the response.
     */
    handleElicitation(serverName: string, message: string, requestedSchema?: Record<string, unknown>, signal?: AbortSignal, mode?: 'form' | 'url', url?: string, elicitationId?: string): Promise<ElicitResult>;
    /**
     * Creates a SandboxAskCallback that forwards sandbox network permission
     * requests to the SDK host as can_use_tool control_requests.
     *
     * This piggybacks on the existing can_use_tool protocol with a synthetic
     * tool name so that SDK hosts (VS Code, CCR, etc.) can prompt the user
     * for network access without requiring a new protocol subtype.
     */
    createSandboxAskCallback(): (hostPattern: {
        host: string;
        port?: number;
    }) => Promise<boolean>;
    /**
     * Sends an MCP message to an SDK server and waits for the response
     */
    sendMcpMessage(serverName: string, message: JSONRPCMessage): Promise<JSONRPCMessage>;
}
//# sourceMappingURL=structuredIO.d.ts.map