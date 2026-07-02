import type { Task, TaskType } from './Task.js';
/**
 * Get all tasks.
 * Mirrors the pattern from tools.ts
 * Note: Returns array inline to avoid circular dependency issues with top-level const
 */
export declare function getAllTasks(): Task[];
/**
 * Get a task by its type.
 */
export declare function getTaskByType(type: TaskType): Task | undefined;
//# sourceMappingURL=tasks.d.ts.map