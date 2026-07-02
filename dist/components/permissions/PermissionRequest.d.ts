import * as React from 'react';
import type { AnyObject, Tool, ToolUseContext } from '../../Tool.js';
import type { AssistantMessage } from '../../types/message.js';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import type { z } from 'zod/v4';
import type { PermissionUpdate } from '../../utils/permissions/PermissionUpdateSchema.js';
import type { WorkerBadgeProps } from './WorkerBadge.js';
export type PermissionRequestProps<Input extends AnyObject = AnyObject> = {
    toolUseConfirm: ToolUseConfirm<Input>;
    toolUseContext: ToolUseContext;
    onDone(): void;
    onReject(): void;
    verbose: boolean;
    workerBadge: WorkerBadgeProps | undefined;
    /**
     * Register JSX to render in a sticky footer below the scrollable area.
     * Fullscreen mode only (non-fullscreen has no sticky area — terminal
     * scrollback moves everything together). Call with null to clear.
     *
     * Used by ExitPlanModePermissionRequest to keep response options visible
     * while the user scrolls through a long plan. The callback is stable —
     * JSX passed should use refs for callbacks that close over component state
     * to avoid stale closures (React reconciles the JSX, preserving Select's
     * internal focus/input state).
     */
    setStickyFooter?: (jsx: React.ReactNode | null) => void;
};
export type ToolUseConfirm<Input extends AnyObject = AnyObject> = {
    assistantMessage: AssistantMessage;
    tool: Tool<Input>;
    description: string;
    input: z.infer<Input>;
    toolUseContext: ToolUseContext;
    toolUseID: string;
    permissionResult: PermissionDecision;
    permissionPromptStartTimeMs: number;
    /**
     * Called when user interacts with the permission dialog (e.g., arrow keys, tab, typing).
     * This prevents async auto-approval mechanisms (like the bash classifier) from
     * dismissing the dialog while the user is actively engaging with it.
     */
    classifierCheckInProgress?: boolean;
    classifierAutoApproved?: boolean;
    classifierMatchedRule?: string;
    workerBadge?: WorkerBadgeProps;
    onUserInteraction(): void;
    onAbort(): void;
    onDismissCheckmark?(): void;
    onAllow(updatedInput: z.infer<Input>, permissionUpdates: PermissionUpdate[], feedback?: string, contentBlocks?: ContentBlockParam[]): void;
    onReject(feedback?: string, contentBlocks?: ContentBlockParam[]): void;
    recheckPermission(): Promise<void>;
};
export declare function PermissionRequest(t0: any): any;
//# sourceMappingURL=PermissionRequest.d.ts.map