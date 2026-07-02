import type { AppState } from '../../state/AppState.js';
import type { AgentId } from '../../types/ids.js';
type SetAppStateFn = (updater: (prev: AppState) => AppState) => void;
export declare function killTask(taskId: string, setAppState: SetAppStateFn): void;
/**
 * Kill all running bash tasks spawned by a given agent.
 * Called from runAgent.ts finally block so background processes don't outlive
 * the agent that started them (prevents 10-day fake-logs.sh zombies).
 */
export declare function killShellTasksForAgent(agentId: AgentId, getAppState: () => AppState, setAppState: SetAppStateFn): void;
export {};
//# sourceMappingURL=killShellTasks.d.ts.map