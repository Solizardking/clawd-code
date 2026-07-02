import type { ToolUseConfirm } from '../../components/permissions/PermissionRequest.js';
import { type CompletionType } from '../../utils/unaryLogging.js';
export type UnaryEvent = {
    completion_type: CompletionType;
    language_name: string | Promise<string>;
};
/**
 * Logs permission request events using analytics and unary logging.
 * Handles both the analytics event and the unary event logging.
 */
export declare function usePermissionRequestLogging(toolUseConfirm: ToolUseConfirm, unaryEvent: UnaryEvent): void;
//# sourceMappingURL=hooks.d.ts.map