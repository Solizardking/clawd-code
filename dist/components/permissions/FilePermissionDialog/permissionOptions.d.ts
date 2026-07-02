import type { ToolPermissionContext } from '../../../Tool.js';
import type { OptionWithDescription } from '../../CustomSelect/select.js';
/**
 * Check if a path is within the project's .claude/ folder.
 * This is used to determine whether to show the special ".claude folder" permission option.
 */
export declare function isInClaudeFolder(filePath: string): boolean;
/**
 * Check if a path is within the global ~/.claude/ folder.
 * This is used to determine whether to show the special ".claude folder" permission option
 * for files in the user's home directory.
 */
export declare function isInGlobalClaudeFolder(filePath: string): boolean;
export type PermissionOption = {
    type: 'accept-once';
} | {
    type: 'accept-session';
    scope?: 'claude-folder' | 'global-claude-folder';
} | {
    type: 'reject';
};
export type PermissionOptionWithLabel = OptionWithDescription<string> & {
    option: PermissionOption;
};
export type FileOperationType = 'read' | 'write' | 'create';
export declare function getFilePermissionOptions({ filePath, toolPermissionContext, operationType, onRejectFeedbackChange, onAcceptFeedbackChange, yesInputMode, noInputMode }: {
    filePath: string;
    toolPermissionContext: ToolPermissionContext;
    operationType?: FileOperationType;
    onRejectFeedbackChange?: (value: string) => void;
    onAcceptFeedbackChange?: (value: string) => void;
    yesInputMode?: boolean;
    noInputMode?: boolean;
}): PermissionOptionWithLabel[];
//# sourceMappingURL=permissionOptions.d.ts.map