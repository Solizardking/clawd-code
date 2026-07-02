import type { AppState } from '../state/AppState.js';
export declare class StopTaskError extends Error {
    readonly code: 'not_found' | 'not_running' | 'unsupported_type';
    constructor(message: string, code: 'not_found' | 'not_running' | 'unsupported_type');
}
type StopTaskContext = {
    getAppState: () => AppState;
    setAppState: (f: (prev: AppState) => AppState) => void;
};
type StopTaskResult = {
    taskId: string;
    taskType: string;
    command: string | undefined;
};
/**
 * Look up a task by ID, validate it is running, kill it, and mark it as notified.
 *
 * Throws {@link StopTaskError} when the task cannot be stopped (not found,
 * not running, or unsupported type). Callers can inspect `error.code` to
 * distinguish the failure reason.
 */
export declare function stopTask(taskId: string, context: StopTaskContext): Promise<StopTaskResult>;
export {};
//# sourceMappingURL=stopTask.d.ts.map