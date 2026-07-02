import type { SDKControlPermissionRequest } from '../entrypoints/sdk/controlTypes.js';
import type { Tool } from '../Tool.js';
import type { AssistantMessage } from '../types/message.js';
/**
 * Create a synthetic AssistantMessage for remote permission requests.
 * The ToolUseConfirm type requires an AssistantMessage, but in remote mode
 * we don't have a real one — the tool use runs on the CCR container.
 */
export declare function createSyntheticAssistantMessage(request: SDKControlPermissionRequest, requestId: string): AssistantMessage;
/**
 * Create a minimal Tool stub for tools that aren't loaded locally.
 * This happens when the remote CCR has tools (e.g., MCP tools) that the
 * local CLI doesn't know about. The stub routes to FallbackPermissionRequest.
 */
export declare function createToolStub(toolName: string): Tool;
//# sourceMappingURL=remotePermissionBridge.d.ts.map