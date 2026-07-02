import type { PendingClassifierCheck } from '../../../types/permissions.js';
import type { PermissionDecision } from '../../../utils/permissions/PermissionResult.js';
import type { PermissionUpdate } from '../../../utils/permissions/PermissionUpdateSchema.js';
import type { PermissionContext } from '../PermissionContext.js';
type CoordinatorPermissionParams = {
    ctx: PermissionContext;
    pendingClassifierCheck?: PendingClassifierCheck | undefined;
    updatedInput: Record<string, unknown> | undefined;
    suggestions: PermissionUpdate[] | undefined;
    permissionMode: string | undefined;
};
/**
 * Handles the coordinator worker permission flow.
 *
 * For coordinator workers, automated checks (hooks and classifier) are
 * awaited sequentially before falling through to the interactive dialog.
 *
 * Returns a PermissionDecision if the automated checks resolved the
 * permission, or null if the caller should fall through to the
 * interactive dialog.
 */
declare function handleCoordinatorPermission(params: CoordinatorPermissionParams): Promise<PermissionDecision | null>;
export { handleCoordinatorPermission };
export type { CoordinatorPermissionParams };
//# sourceMappingURL=coordinatorHandler.d.ts.map