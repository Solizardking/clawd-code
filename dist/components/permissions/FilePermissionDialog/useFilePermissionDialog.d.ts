import type { CompletionType } from '../../../utils/unaryLogging.js';
import type { ToolUseConfirm } from '../PermissionRequest.js';
import { type FileOperationType, type PermissionOption, type PermissionOptionWithLabel } from './permissionOptions.js';
export interface ToolInput {
    [key: string]: unknown;
}
export type UseFilePermissionDialogProps<T extends ToolInput> = {
    filePath: string;
    completionType: CompletionType;
    languageName: string | Promise<string>;
    toolUseConfirm: ToolUseConfirm;
    onDone: () => void;
    onReject: () => void;
    parseInput: (input: unknown) => T;
    operationType?: FileOperationType;
};
export type UseFilePermissionDialogResult<T> = {
    options: PermissionOptionWithLabel[];
    onChange: (option: PermissionOption, input: T, feedback?: string) => void;
    acceptFeedback: string;
    rejectFeedback: string;
    focusedOption: string;
    setFocusedOption: (option: string) => void;
    handleInputModeToggle: (value: string) => void;
    yesInputMode: boolean;
    noInputMode: boolean;
};
/**
 * Hook for handling file permission dialogs with common logic
 */
export declare function useFilePermissionDialog<T extends ToolInput>({ filePath, completionType, languageName, toolUseConfirm, onDone, onReject, parseInput, operationType, }: UseFilePermissionDialogProps<T>): UseFilePermissionDialogResult<T>;
//# sourceMappingURL=useFilePermissionDialog.d.ts.map