import type { ToolPermissionContext } from '../../../Tool.js';
import { type CompletionType } from '../../../utils/unaryLogging.js';
import type { ToolUseConfirm } from '../PermissionRequest.js';
import type { FileOperationType, PermissionOption } from './permissionOptions.js';
export type PermissionHandlerParams = {
    messageId: string;
    path: string | null;
    toolUseConfirm: ToolUseConfirm;
    toolPermissionContext: ToolPermissionContext;
    onDone: () => void;
    onReject: () => void;
    completionType: CompletionType;
    languageName: string | Promise<string>;
    operationType: FileOperationType;
};
export type PermissionHandlerOptions = {
    hasFeedback?: boolean;
    feedback?: string;
    enteredFeedbackMode?: boolean;
    scope?: 'claude-folder' | 'global-claude-folder';
};
export declare const PERMISSION_HANDLERS: Record<PermissionOption['type'], (params: PermissionHandlerParams, options?: PermissionHandlerOptions) => void>;
//# sourceMappingURL=usePermissionHandler.d.ts.map