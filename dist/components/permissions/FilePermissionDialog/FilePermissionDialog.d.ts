import React from 'react';
import type { ToolUseContext } from '../../../Tool.js';
import type { CompletionType } from '../../../utils/unaryLogging.js';
import type { ToolUseConfirm } from '../PermissionRequest.js';
import type { WorkerBadgeProps } from '../WorkerBadge.js';
import type { IDEDiffSupport } from './ideDiffConfig.js';
import type { FileOperationType } from './permissionOptions.js';
import { type ToolInput } from './useFilePermissionDialog.js';
export type FilePermissionDialogProps<T extends ToolInput = ToolInput> = {
    toolUseConfirm: ToolUseConfirm;
    toolUseContext: ToolUseContext;
    onDone: () => void;
    onReject: () => void;
    title: string;
    subtitle?: React.ReactNode;
    question?: string | React.ReactNode;
    content?: React.ReactNode;
    completionType?: CompletionType;
    languageName?: string;
    path: string | null;
    parseInput: (input: unknown) => T;
    operationType?: FileOperationType;
    ideDiffSupport?: IDEDiffSupport<T>;
    workerBadge: WorkerBadgeProps | undefined;
};
export declare function FilePermissionDialog<T extends ToolInput = ToolInput>({ toolUseConfirm, toolUseContext, onDone, onReject, title, subtitle, question, content, completionType, path, parseInput, operationType, ideDiffSupport, workerBadge, languageName: languageNameOverride }: FilePermissionDialogProps<T>): React.ReactNode;
//# sourceMappingURL=FilePermissionDialog.d.ts.map