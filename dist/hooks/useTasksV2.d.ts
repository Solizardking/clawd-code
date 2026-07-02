import type { Task } from '../utils/tasks.js';
/**
 * Hook to get the current task list for the persistent UI display.
 * Returns tasks when TodoV2 is enabled, otherwise returns undefined.
 * All hook instances share a single file watcher via TasksV2Store.
 * Hides the list after 5 seconds if there are no open tasks.
 */
export declare function useTasksV2(): Task[] | undefined;
/**
 * Same as useTasksV2, plus collapses the expanded task view when the list
 * becomes hidden. Call this from exactly one always-mounted component (REPL)
 * so the collapse effect runs once instead of N× per consumer.
 */
export declare function useTasksV2WithCollapseEffect(): Task[] | undefined;
//# sourceMappingURL=useTasksV2.d.ts.map