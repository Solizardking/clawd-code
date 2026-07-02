import * as React from 'react';
import { type AppState } from '../state/AppState.js';
import { type LocalAgentTaskState } from '../tasks/LocalAgentTask/LocalAgentTask.js';
/**
 * Which panel-managed tasks currently have a visible row.
 * Presence in AppState.tasks IS visibility — the 1s tick in
 * CoordinatorTaskPanel evicts tasks past their evictAfter deadline. The
 * evictAfter !== 0 check handles immediate dismiss (x key) without making
 * the filter time-dependent. Shared by panel render, useCoordinatorTaskCount,
 * and index resolvers so the math can't drift.
 */
export declare function getVisibleAgentTasks(tasks: AppState['tasks']): LocalAgentTaskState[];
export declare function CoordinatorTaskPanel(): React.ReactNode;
/**
 * Returns the number of visible coordinator tasks (for selection bounds).
 * The panel's 1s tick evicts expired tasks from prev.tasks, so this count
 * stays accurate without needing its own tick.
 */
export declare function useCoordinatorTaskCount(): number;
//# sourceMappingURL=CoordinatorAgentStatus.d.ts.map