import type { Tool as ToolType, ToolUseContext } from '../Tool.js';
import type { AssistantMessage } from '../types/message.js';
import type { PermissionDecision } from '../utils/permissions/PermissionResult.js';
export type CanUseToolFn<Input extends Record<string, unknown> = Record<string, unknown>> = (tool: ToolType, input: Input, toolUseContext: ToolUseContext, assistantMessage: AssistantMessage, toolUseID: string, forceDecision?: PermissionDecision<Input>) => Promise<PermissionDecision<Input>>;
declare function useCanUseTool(setToolUseConfirmQueue: any, setToolPermissionContext: any): any;
export default useCanUseTool;
//# sourceMappingURL=useCanUseTool.d.ts.map