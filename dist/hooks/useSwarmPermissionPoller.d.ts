/**
 * Swarm Permission Poller Hook
 *
 * This hook polls for permission responses from the team leader when running
 * as a worker agent in a swarm. When a response is received, it calls the
 * appropriate callback (onAllow/onReject) to continue execution.
 *
 * This hook should be used in conjunction with the worker-side integration
 * in useCanUseTool.ts, which creates pending requests that this hook monitors.
 */
import { type PermissionUpdate } from '../utils/permissions/PermissionUpdateSchema.js';
/**
 * Callback signature for handling permission responses
 */
export type PermissionResponseCallback = {
    requestId: string;
    toolUseId: string;
    onAllow: (updatedInput: Record<string, unknown> | undefined, permissionUpdates: PermissionUpdate[], feedback?: string) => void;
    onReject: (feedback?: string) => void;
};
/**
 * Register a callback for a pending permission request
 * Called by useCanUseTool when a worker submits a permission request
 */
export declare function registerPermissionCallback(callback: PermissionResponseCallback): void;
/**
 * Unregister a callback (e.g., when the request is resolved locally or times out)
 */
export declare function unregisterPermissionCallback(requestId: string): void;
/**
 * Check if a request has a registered callback
 */
export declare function hasPermissionCallback(requestId: string): boolean;
/**
 * Clear all pending callbacks (both permission and sandbox).
 * Called from clearSessionCaches() on /clear to reset stale state,
 * and also used in tests for isolation.
 */
export declare function clearAllPendingCallbacks(): void;
/**
 * Process a permission response from a mailbox message.
 * This is called by the inbox poller when it detects a permission_response message.
 *
 * @returns true if the response was processed, false if no callback was registered
 */
export declare function processMailboxPermissionResponse(params: {
    requestId: string;
    decision: 'approved' | 'rejected';
    feedback?: string;
    updatedInput?: Record<string, unknown>;
    permissionUpdates?: unknown;
}): boolean;
/**
 * Callback signature for handling sandbox permission responses
 */
export type SandboxPermissionResponseCallback = {
    requestId: string;
    host: string;
    resolve: (allow: boolean) => void;
};
/**
 * Register a callback for a pending sandbox permission request
 * Called when a worker sends a sandbox permission request to the leader
 */
export declare function registerSandboxPermissionCallback(callback: SandboxPermissionResponseCallback): void;
/**
 * Check if a sandbox request has a registered callback
 */
export declare function hasSandboxPermissionCallback(requestId: string): boolean;
/**
 * Process a sandbox permission response from a mailbox message.
 * Called by the inbox poller when it detects a sandbox_permission_response message.
 *
 * @returns true if the response was processed, false if no callback was registered
 */
export declare function processSandboxPermissionResponse(params: {
    requestId: string;
    host: string;
    allow: boolean;
}): boolean;
/**
 * Hook that polls for permission responses when running as a swarm worker.
 *
 * This hook:
 * 1. Only activates when isSwarmWorker() returns true
 * 2. Polls every 500ms for responses
 * 3. When a response is found, invokes the registered callback
 * 4. Cleans up the response file after processing
 */
export declare function useSwarmPermissionPoller(): void;
//# sourceMappingURL=useSwarmPermissionPoller.d.ts.map