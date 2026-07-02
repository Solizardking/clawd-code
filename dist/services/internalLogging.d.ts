import type { ToolPermissionContext } from '../Tool.js';
/**
 * Get the OCI container ID from within a running container
 */
export declare const getContainerId: any;
/**
 * Logs an event with the current namespace and tool permission context
 */
export declare function logPermissionContextForAnts(toolPermissionContext: ToolPermissionContext | null, moment: 'summary' | 'initialization'): Promise<void>;
//# sourceMappingURL=internalLogging.d.ts.map