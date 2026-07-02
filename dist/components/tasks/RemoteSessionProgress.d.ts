import type { RemoteAgentTaskState } from 'src/tasks/RemoteAgentTask/RemoteAgentTask.js';
type ReviewStage = NonNullable<NonNullable<RemoteAgentTaskState['reviewProgress']>['stage']>;
/**
 * Stage-appropriate counts line for a running review. Shared between the
 * one-line pill (below) and RemoteSessionDetailDialog's reviewCountsLine so
 * the two can't drift — they have historically disagreed on whether to show
 * refuted counts and what to call the synthesizing stage.
 *
 * Canonical behavior: word labels (not ✓/✗), hide refuted when 0, "deduping"
 * for the synthesizing stage (matches STAGE_LABELS in the detail dialog).
 */
export declare function formatReviewStageCounts(stage: ReviewStage | undefined, found: number, verified: number, refuted: number): string;
export declare function RemoteSessionProgress(t0: any): any;
export {};
//# sourceMappingURL=RemoteSessionProgress.d.ts.map