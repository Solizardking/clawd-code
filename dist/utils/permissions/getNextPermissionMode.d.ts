import type { ToolPermissionContext } from '../../Tool.js';
import type { PermissionMode } from './PermissionMode.js';
/**
 * Determines the next permission mode when cycling through modes with Shift+Tab.
 */
export declare function getNextPermissionMode(toolPermissionContext: ToolPermissionContext, _teamContext?: {
    leadAgentId: string;
}): PermissionMode;
/**
 * Computes the next permission mode and prepares the context for it.
 * Handles any context cleanup needed for the target mode (e.g., stripping
 * dangerous permissions when entering auto mode).
 *
 * @returns The next mode and the context to use (with dangerous permissions stripped if needed)
 */
export declare function cyclePermissionMode(toolPermissionContext: ToolPermissionContext, teamContext?: {
    leadAgentId: string;
}): {
    nextMode: PermissionMode;
    context: ToolPermissionContext;
};
//# sourceMappingURL=getNextPermissionMode.d.ts.map