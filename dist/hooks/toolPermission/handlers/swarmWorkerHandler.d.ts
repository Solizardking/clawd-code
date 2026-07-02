import type { PendingClassifierCheck } from '../../../types/permissions.js';
import type { PermissionDecision } from '../../../utils/permissions/PermissionResult.js';
import type { PermissionUpdate } from '../../../utils/permissions/PermissionUpdateSchema.js';
import type { PermissionContext } from '../PermissionContext.js';
type SwarmWorkerPermissionParams = {
    ctx: PermissionContext;
    description: string;
    pendingClassifierCheck?: PendingClassifierCheck | undefined;
    updatedInput: Record<string, unknown> | undefined;
    suggestions: PermissionUpdate[] | undefined;
};
/**
 * Handles the swarm worker permission flow.
 *
 * When running as a swarm worker:
 * 1. Tries classifier auto-approval for bash commands
 * 2. Forwards the permission request to the leader via mailbox
 * 3. Registers callbacks for when the leader responds
 * 4. Sets the pending indicator while waiting
 *
 * Returns a PermissionDecision if the classifier auto-approves,
 * or a Promise that resolves when the leader responds.
 * Returns null if swarms are not enabled or this is not a swarm worker,
 * so the caller can fall through to interactive handling.
 */
declare function handleSwarmWorkerPermission(params: SwarmWorkerPermissionParams): Promise<PermissionDecision | null>;
export { handleSwarmWorkerPermission };
export type { SwarmWorkerPermissionParams };
//# sourceMappingURL=swarmWorkerHandler.d.ts.map