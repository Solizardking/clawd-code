/**
 * REPL-specific wrapper around initBridgeCore. Owns the parts that read
 * bootstrap state — gates, cwd, session ID, git context, OAuth, title
 * derivation — then delegates to the bootstrap-free core.
 *
 * Split out of replBridge.ts because the sessionStorage import
 * (getCurrentSessionTitle) transitively pulls in src/commands.ts → the
 * entire slash command + React component tree (~1300 modules). Keeping
 * initBridgeCore in a file that doesn't touch sessionStorage lets
 * daemonBridge.ts import the core without bloating the Agent SDK bundle.
 *
 * Called via dynamic import by useReplBridge (auto-start) and print.ts
 * (SDK -p mode via query.enableRemoteControl).
 */
import type { SDKMessage } from '../entrypoints/agentSdkTypes.js';
import type { SDKControlResponse } from '../entrypoints/sdk/controlTypes.js';
import type { Message } from '../types/message.js';
import type { PermissionMode } from '../utils/permissions/PermissionMode.js';
import type { BridgeState, ReplBridgeHandle } from './replBridge.js';
export type InitBridgeOptions = {
    onInboundMessage?: (msg: SDKMessage) => void | Promise<void>;
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
    initialMessages?: Message[];
    initialName?: string;
    getMessages?: () => Message[];
    previouslyFlushedUUIDs?: Set<string>;
    /** See BridgeCoreParams.perpetual. */
    perpetual?: boolean;
    /**
     * When true, the bridge only forwards events outbound (no SSE inbound
     * stream). Used by CCR mirror mode — local sessions visible on claude.ai
     * without enabling inbound control.
     */
    outboundOnly?: boolean;
    tags?: string[];
};
export declare function initReplBridge(options?: InitBridgeOptions): Promise<ReplBridgeHandle | null>;
//# sourceMappingURL=initReplBridge.d.ts.map