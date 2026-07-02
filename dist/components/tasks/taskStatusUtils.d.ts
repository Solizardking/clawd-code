/**
 * Shared utilities for displaying task status across different task types.
 */
import type { TaskStatus } from 'src/Task.js';
import type { InProcessTeammateTaskState } from 'src/tasks/InProcessTeammateTask/types.js';
import { type TaskState } from 'src/tasks/types.js';
import type { DeepImmutable } from 'src/types/utils.js';
/**
 * Returns true if the given task status represents a terminal (finished) state.
 */
export declare function isTerminalStatus(status: TaskStatus): boolean;
/**
 * Returns the appropriate icon for a task based on status and state flags.
 */
export declare function getTaskStatusIcon(status: TaskStatus, options?: {
    isIdle?: boolean;
    awaitingApproval?: boolean;
    hasError?: boolean;
    shutdownRequested?: boolean;
}): string;
/**
 * Returns the appropriate semantic color for a task based on status and state flags.
 */
export declare function getTaskStatusColor(status: TaskStatus, options?: {
    isIdle?: boolean;
    awaitingApproval?: boolean;
    hasError?: boolean;
    shutdownRequested?: boolean;
}): 'success' | 'error' | 'warning' | 'background';
/**
 * Derives a human-readable activity string for an in-process teammate,
 * accounting for shutdown/approval/idle states and falling back through
 * recent-activity summary → last activity description → 'working'.
 */
export declare function describeTeammateActivity(t: DeepImmutable<InProcessTeammateTaskState>): string;
/**
 * Returns true when BackgroundTaskStatus would render nothing because the
 * spinner tree is active and every visible background task is an in-process
 * teammate (teammates are shown in the spinner tree instead).
 *
 * Uses the same task filtering as BackgroundTaskStatus: `isBackgroundTask()`
 * plus exclusion of panel-managed agent tasks for ants (those are shown
 * by CoordinatorTaskPanel).
 */
export declare function shouldHideTasksFooter(tasks: {
    [taskId: string]: TaskState;
}, showSpinnerTree: boolean): boolean;
//# sourceMappingURL=taskStatusUtils.d.ts.map