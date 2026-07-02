import type { Tool as ToolType, ToolUseContext } from '../../Tool.js';
import type { PermissionApprovalSource, PermissionRejectionSource } from './PermissionContext.js';
type PermissionLogContext = {
    tool: ToolType;
    input: unknown;
    toolUseContext: ToolUseContext;
    messageId: string;
    toolUseID: string;
};
type PermissionDecisionArgs = {
    decision: 'accept';
    source: PermissionApprovalSource | 'config';
} | {
    decision: 'reject';
    source: PermissionRejectionSource | 'config';
};
declare function isCodeEditingTool(toolName: string): boolean;
declare function buildCodeEditToolAttributes(tool: ToolType, input: unknown, decision: 'accept' | 'reject', source: string): Promise<Record<string, string>>;
declare function logPermissionDecision(ctx: PermissionLogContext, args: PermissionDecisionArgs, permissionPromptStartTimeMs?: number): void;
export { isCodeEditingTool, buildCodeEditToolAttributes, logPermissionDecision };
export type { PermissionLogContext, PermissionDecisionArgs };
//# sourceMappingURL=permissionLogging.d.ts.map