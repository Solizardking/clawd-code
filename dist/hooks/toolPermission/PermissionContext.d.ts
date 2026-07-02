import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import type { ToolUseConfirm } from '../../components/permissions/PermissionRequest.js';
import type { ToolPermissionContext, Tool as ToolType, ToolUseContext } from '../../Tool.js';
import type { AssistantMessage } from '../../types/message.js';
import type { PendingClassifierCheck, PermissionAllowDecision, PermissionDecisionReason, PermissionDenyDecision } from '../../types/permissions.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import type { PermissionUpdate } from '../../utils/permissions/PermissionUpdateSchema.js';
import { type PermissionDecisionArgs } from './permissionLogging.js';
type PermissionApprovalSource = {
    type: 'hook';
    permanent?: boolean;
} | {
    type: 'user';
    permanent: boolean;
} | {
    type: 'classifier';
};
type PermissionRejectionSource = {
    type: 'hook';
} | {
    type: 'user_abort';
} | {
    type: 'user_reject';
    hasFeedback: boolean;
};
type PermissionQueueOps = {
    push(item: ToolUseConfirm): void;
    remove(toolUseID: string): void;
    update(toolUseID: string, patch: Partial<ToolUseConfirm>): void;
};
type ResolveOnce<T> = {
    resolve(value: T): void;
    isResolved(): boolean;
    /**
     * Atomically check-and-mark as resolved. Returns true if this caller
     * won the race (nobody else has resolved yet), false otherwise.
     * Use this in async callbacks BEFORE awaiting, to close the window
     * between the `isResolved()` check and the actual `resolve()` call.
     */
    claim(): boolean;
};
declare function createResolveOnce<T>(resolve: (value: T) => void): ResolveOnce<T>;
declare function createPermissionContext(tool: ToolType, input: Record<string, unknown>, toolUseContext: ToolUseContext, assistantMessage: AssistantMessage, toolUseID: string, setToolPermissionContext: (context: ToolPermissionContext) => void, queueOps?: PermissionQueueOps): Readonly<{
    runHooks(permissionMode: string | undefined, suggestions: PermissionUpdate[] | undefined, updatedInput?: Record<string, unknown>, permissionPromptStartTimeMs?: number): Promise<PermissionDecision | null>;
    buildAllow(updatedInput: Record<string, unknown>, opts?: {
        userModified?: boolean;
        decisionReason?: PermissionDecisionReason;
        acceptFeedback?: string;
        contentBlocks?: ContentBlockParam[];
    }): PermissionAllowDecision;
    buildDeny(message: string, decisionReason: PermissionDecisionReason): PermissionDenyDecision;
    handleUserAllow(updatedInput: Record<string, unknown>, permissionUpdates: PermissionUpdate[], feedback?: string, permissionPromptStartTimeMs?: number, contentBlocks?: ContentBlockParam[], decisionReason?: PermissionDecisionReason): Promise<PermissionAllowDecision>;
    handleHookAllow(finalInput: Record<string, unknown>, permissionUpdates: PermissionUpdate[], permissionPromptStartTimeMs?: number): Promise<PermissionAllowDecision>;
    pushToQueue(item: ToolUseConfirm): void;
    removeFromQueue(): void;
    updateQueueItem(patch: Partial<ToolUseConfirm>): void;
    tryClassifier?: ((pendingClassifierCheck: PendingClassifierCheck | undefined, updatedInput: Record<string, unknown> | undefined) => Promise<PermissionDecision | null>) | undefined;
    tool: ToolType;
    input: Record<string, unknown>;
    toolUseContext: ToolUseContext;
    assistantMessage: AssistantMessage;
    messageId: any;
    toolUseID: string;
    logDecision(args: PermissionDecisionArgs, opts?: {
        input?: Record<string, unknown>;
        permissionPromptStartTimeMs?: number;
    }): void;
    logCancelled(): void;
    persistPermissions(updates: PermissionUpdate[]): Promise<boolean>;
    resolveIfAborted(resolve: (decision: PermissionDecision) => void): boolean;
    cancelAndAbort(feedback?: string, isAbort?: boolean, contentBlocks?: ContentBlockParam[]): PermissionDecision;
}>;
type PermissionContext = ReturnType<typeof createPermissionContext>;
/**
 * Create a PermissionQueueOps backed by a React state setter.
 * This is the bridge between React's `setToolUseConfirmQueue` and the
 * generic queue interface used by PermissionContext.
 */
declare function createPermissionQueueOps(setToolUseConfirmQueue: React.Dispatch<React.SetStateAction<ToolUseConfirm[]>>): PermissionQueueOps;
export { createPermissionContext, createPermissionQueueOps, createResolveOnce };
export type { PermissionContext, PermissionApprovalSource, PermissionQueueOps, PermissionRejectionSource, ResolveOnce, };
//# sourceMappingURL=PermissionContext.d.ts.map