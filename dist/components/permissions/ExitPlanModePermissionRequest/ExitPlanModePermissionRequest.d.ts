import React from 'react';
import type { AppState } from '../../../state/AppStateStore.js';
import type { AllowedPrompt } from '../../../tools/ExitPlanModeTool/ExitPlanModeV2Tool.js';
import { type PermissionMode } from '../../../utils/permissions/PermissionMode.js';
import type { PermissionUpdate } from '../../../utils/permissions/PermissionUpdateSchema.js';
import { type OptionWithDescription } from '../../CustomSelect/index.js';
import type { PermissionRequestProps } from '../PermissionRequest.js';
type ResponseValue = 'yes-bypass-permissions' | 'yes-accept-edits' | 'yes-accept-edits-keep-context' | 'yes-default-keep-context' | 'yes-resume-auto-mode' | 'yes-auto-clear-context' | 'ultraplan' | 'no';
/**
 * Build permission updates for plan approval, including prompt-based rules if provided.
 * Prompt-based rules are only added when classifier permissions are enabled (Ant-only).
 */
export declare function buildPermissionUpdates(mode: PermissionMode, allowedPrompts?: AllowedPrompt[]): PermissionUpdate[];
/**
 * Auto-name the session from the plan content when the user accepts a plan,
 * if they haven't already named it via /rename or --name. Fire-and-forget.
 * Mirrors /rename: kebab-case name, updates the prompt-border badge.
 */
export declare function autoNameSessionFromPlan(plan: string, setAppState: (updater: (prev: AppState) => AppState) => void, isClearContext: boolean): void;
export declare function ExitPlanModePermissionRequest({ toolUseConfirm, onDone, onReject, workerBadge, setStickyFooter }: PermissionRequestProps): React.ReactNode;
/** @internal Exported for testing. */
export declare function buildPlanApprovalOptions({ showClearContext, showUltraplan, usedPercent, isAutoModeAvailable, isBypassPermissionsModeAvailable, onFeedbackChange }: {
    showClearContext: boolean;
    showUltraplan: boolean;
    usedPercent: number | null;
    isAutoModeAvailable: boolean | undefined;
    isBypassPermissionsModeAvailable: boolean | undefined;
    onFeedbackChange: (v: string) => void;
}): OptionWithDescription<ResponseValue>[];
export {};
//# sourceMappingURL=ExitPlanModePermissionRequest.d.ts.map