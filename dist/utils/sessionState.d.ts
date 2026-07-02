export type SessionState = 'idle' | 'running' | 'requires_action';
/**
 * Context carried with requires_action transitions so downstream
 * surfaces (CCR sidebar, push notifications) can show what the
 * session is blocked on, not just that it's blocked.
 *
 * Two delivery paths:
 * - tool_name + action_description → RequiresActionDetails proto
 *   (webhook payload, typed, logged in Datadog)
 * - full object → external_metadata.pending_action (queryable JSON
 *   on the Session, lets the frontend iterate on shape without
 *   proto round-trips)
 */
export type RequiresActionDetails = {
    tool_name: string;
    /** Human-readable summary, e.g. "Editing src/foo.ts", "Running npm test" */
    action_description: string;
    tool_use_id: string;
    request_id: string;
    /** Raw tool input — the frontend reads from external_metadata.pending_action.input
     * to parse question options / plan content without scanning the event stream. */
    input?: Record<string, unknown>;
};
import type { PermissionMode } from './permissions/PermissionMode.js';
export type SessionExternalMetadata = {
    permission_mode?: string | null;
    is_ultraplan_mode?: boolean | null;
    model?: string | null;
    pending_action?: RequiresActionDetails | null;
    post_turn_summary?: unknown;
    task_summary?: string | null;
};
type SessionStateChangedListener = (state: SessionState, details?: RequiresActionDetails) => void;
type SessionMetadataChangedListener = (metadata: SessionExternalMetadata) => void;
type PermissionModeChangedListener = (mode: PermissionMode) => void;
export declare function setSessionStateChangedListener(cb: SessionStateChangedListener | null): void;
export declare function setSessionMetadataChangedListener(cb: SessionMetadataChangedListener | null): void;
/**
 * Register a listener for permission-mode changes from onChangeAppState.
 * Wired by print.ts to emit an SDK system:status message so CCR/IDE clients
 * see mode transitions in real time — regardless of which code path mutated
 * toolPermissionContext.mode (Shift+Tab, ExitPlanMode dialog, slash command,
 * bridge set_permission_mode, etc.).
 */
export declare function setPermissionModeChangedListener(cb: PermissionModeChangedListener | null): void;
export declare function getSessionState(): SessionState;
export declare function notifySessionStateChanged(state: SessionState, details?: RequiresActionDetails): void;
export declare function notifySessionMetadataChanged(metadata: SessionExternalMetadata): void;
/**
 * Fired by onChangeAppState when toolPermissionContext.mode changes.
 * Downstream listeners (CCR external_metadata PUT, SDK status stream) are
 * both wired through this single choke point so no mode-mutation path can
 * silently bypass them.
 */
export declare function notifyPermissionModeChanged(mode: PermissionMode): void;
export {};
//# sourceMappingURL=sessionState.d.ts.map