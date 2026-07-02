import type { ToolPermissionContext, Tools } from '../Tool.js';
export declare function isPrActivitySubscriptionTool(name: string): boolean;
/**
 * Filters a tool array to the set allowed in coordinator mode.
 * Shared between the REPL path (mergeAndFilterTools) and the headless
 * path (main.tsx) so both stay in sync.
 *
 * PR activity subscription tools are always allowed since subscription
 * management is orchestration.
 */
export declare function applyCoordinatorToolFilter(tools: Tools): Tools;
/**
 * Pure function that merges tool pools and applies coordinator mode filtering.
 *
 * Lives in a React-free file so print.ts can import it without pulling
 * react/ink into the SDK module graph. The useMergedTools hook delegates
 * to this function inside useMemo.
 *
 * @param initialTools - Extra tools to include (built-in + startup MCP from props).
 * @param assembled - Tools from assembleToolPool (built-in + MCP, deduped).
 * @param mode - The permission context mode.
 * @returns Merged, deduplicated, and coordinator-filtered tool array.
 */
export declare function mergeAndFilterTools(initialTools: Tools, assembled: Tools, mode: ToolPermissionContext['mode']): Tools;
//# sourceMappingURL=toolPool.d.ts.map