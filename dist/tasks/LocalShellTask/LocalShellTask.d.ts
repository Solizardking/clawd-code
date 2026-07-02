import type { AppState } from '../../state/AppState.js';
import type { LocalShellSpawnInput, SetAppState, Task, TaskContext, TaskHandle } from '../../Task.js';
import type { ShellCommand } from '../../utils/ShellCommand.js';
/** Prefix that identifies a LocalShellTask summary to the UI collapse transform. */
export declare const BACKGROUND_BASH_SUMMARY_PREFIX = "Background command ";
export declare function looksLikePrompt(tail: string): boolean;
export declare const LocalShellTask: Task;
export declare function spawnShellTask(input: LocalShellSpawnInput & {
    shellCommand: ShellCommand;
}, context: TaskContext): Promise<TaskHandle>;
/**
 * Register a foreground task that could be backgrounded later.
 * Called when a bash command has been running long enough to show the BackgroundHint.
 * @returns taskId for the registered task
 */
export declare function registerForeground(input: LocalShellSpawnInput & {
    shellCommand: ShellCommand;
}, setAppState: SetAppState, toolUseId?: string): string;
/**
 * Background ALL foreground tasks (bash commands and agents).
 * Called when user presses Ctrl+B to background all running tasks.
 */
/**
 * Check if there are any foreground tasks (bash or agent) that can be backgrounded.
 * Used to determine whether Ctrl+B should background existing tasks vs. background the session.
 */
export declare function hasForegroundTasks(state: AppState): boolean;
export declare function backgroundAll(getAppState: () => AppState, setAppState: SetAppState): void;
/**
 * Background an already-registered foreground task in-place.
 * Unlike spawn(), this does NOT re-register the task — it flips isBackgrounded
 * on the existing registration and sets up a completion handler.
 * Used when the auto-background timer fires after registerForeground() has
 * already registered the task (avoiding duplicate task_started SDK events
 * and leaked cleanup callbacks).
 */
export declare function backgroundExistingForegroundTask(taskId: string, shellCommand: ShellCommand, description: string, setAppState: SetAppState, toolUseId?: string): boolean;
/**
 * Mark a task as notified to suppress a pending enqueueShellNotification.
 * Used when backgrounding raced with completion — the tool result already
 * carries the full output, so the <task_notification> would be redundant.
 */
export declare function markTaskNotified(taskId: string, setAppState: SetAppState): void;
/**
 * Unregister a foreground task when the command completes without being backgrounded.
 */
export declare function unregisterForeground(taskId: string, setAppState: SetAppState): void;
//# sourceMappingURL=LocalShellTask.d.ts.map