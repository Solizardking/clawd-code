import type { Tool } from '../../Tool.js';
export { TOOL_SEARCH_TOOL_NAME } from './constants.js';
/**
 * Check if a tool should be deferred (requires ToolSearch to load).
 * A tool is deferred if:
 * - It's an MCP tool (always deferred - workflow-specific)
 * - It has shouldDefer: true
 *
 * A tool is NEVER deferred if it has alwaysLoad: true (MCP tools set this via
 * _meta['anthropic/alwaysLoad']). This check runs first, before any other rule.
 */
export declare function isDeferredTool(tool: Tool): boolean;
/**
 * Format one deferred-tool line for the <available-deferred-tools> user
 * message. Search hints (tool.searchHint) are not rendered — the
 * hints A/B (exp_xenhnnmn0smrx4, stopped Mar 21) showed no benefit.
 */
export declare function formatDeferredToolLine(tool: Tool): string;
export declare function getPrompt(): string;
//# sourceMappingURL=prompt.d.ts.map