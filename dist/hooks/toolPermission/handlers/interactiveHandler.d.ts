import type { BridgePermissionCallbacks } from '../../../bridge/bridgePermissionCallbacks.js';
import type { ChannelPermissionCallbacks } from '../../../services/mcp/channelPermissions.js';
import type { PermissionDecision } from '../../../utils/permissions/PermissionResult.js';
import type { PermissionContext } from '../PermissionContext.js';
type InteractivePermissionParams = {
    ctx: PermissionContext;
    description: string;
    result: PermissionDecision & {
        behavior: 'ask';
    };
    awaitAutomatedChecksBeforeDialog: boolean | undefined;
    bridgeCallbacks?: BridgePermissionCallbacks;
    channelCallbacks?: ChannelPermissionCallbacks;
};
/**
 * Handles the interactive (main-agent) permission flow.
 *
 * Pushes a ToolUseConfirm entry to the confirm queue with callbacks:
 * onAbort, onAllow, onReject, recheckPermission, onUserInteraction.
 *
 * Runs permission hooks and bash classifier checks asynchronously in the
 * background, racing them against user interaction. Uses a resolve-once
 * guard and `userInteracted` flag to prevent multiple resolutions.
 *
 * This function does NOT return a Promise -- it sets up callbacks that
 * eventually call `resolve()` to resolve the outer promise owned by
 * the caller.
 */
declare function handleInteractivePermission(params: InteractivePermissionParams, resolve: (decision: PermissionDecision) => void): void;
export { handleInteractivePermission };
export type { InteractivePermissionParams };
//# sourceMappingURL=interactiveHandler.d.ts.map