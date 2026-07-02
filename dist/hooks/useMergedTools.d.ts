import type { Tools, ToolPermissionContext } from '../Tool.js';
/**
 * React hook that assembles the full tool pool for the REPL.
 *
 * Uses assembleToolPool() (the shared pure function used by both REPL and runAgent)
 * to combine built-in tools with MCP tools, applying deny rules and deduplication.
 * Any extra initialTools are merged on top.
 *
 * @param initialTools - Extra tools to include (built-in + startup MCP from props).
 *   These are merged with the assembled pool and take precedence in deduplication.
 * @param mcpTools - MCP tools discovered dynamically (from mcp state)
 * @param toolPermissionContext - Permission context for filtering
 */
export declare function useMergedTools(initialTools: Tools, mcpTools: Tools, toolPermissionContext: ToolPermissionContext): Tools;
//# sourceMappingURL=useMergedTools.d.ts.map