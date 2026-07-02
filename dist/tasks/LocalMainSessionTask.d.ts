/**
 * LocalMainSessionTask - Handles backgrounding the main session query.
 *
 * When user presses Ctrl+B twice during a query, the session is "backgrounded":
 * - The query continues running in the background
 * - The UI clears to a fresh prompt
 * - A notification is sent when the query completes
 *
 * This reuses the LocalAgentTask state structure since the behavior is similar.
 */
import { type QueryParams } from '../query.js';
import type { SetAppState } from '../Task.js';
import type { AgentDefinition } from '../tools/AgentTool/loadAgentsDir.js';
import type { Message } from '../types/message.js';
import type { LocalAgentTaskState } from './LocalAgentTask/LocalAgentTask.js';
export type LocalMainSessionTaskState = LocalAgentTaskState & {
    agentType: 'main-session';
};
/**
 * Register a backgrounded main session task.
 * Called when the user backgrounds the current session query.
 *
 * @param description - Description of the task
 * @param setAppState - State setter function
 * @param mainThreadAgentDefinition - Optional agent definition if running with --agent
 * @param existingAbortController - Optional abort controller to reuse (for backgrounding an active query)
 * @returns Object with task ID and abort signal for stopping the background query
 */
export declare function registerMainSessionTask(description: string, setAppState: SetAppState, mainThreadAgentDefinition?: AgentDefinition, existingAbortController?: AbortController): {
    taskId: string;
    abortSignal: AbortSignal;
};
/**
 * Complete the main session task and send notification.
 * Called when the backgrounded query finishes.
 */
export declare function completeMainSessionTask(taskId: string, success: boolean, setAppState: SetAppState): void;
/**
 * Foreground a main session task - mark it as foregrounded so its output
 * appears in the main view. The background query keeps running.
 * Returns the task's accumulated messages, or undefined if task not found.
 */
export declare function foregroundMainSessionTask(taskId: string, setAppState: SetAppState): Message[] | undefined;
/**
 * Check if a task is a main session task (vs a regular agent task).
 */
export declare function isMainSessionTask(task: unknown): task is LocalMainSessionTaskState;
/**
 * Start a fresh background session with the given messages.
 *
 * Spawns an independent query() call with the current messages and registers it
 * as a background task. The caller's foreground query continues running normally.
 */
export declare function startBackgroundSession({ messages, queryParams, description, setAppState, agentDefinition, }: {
    messages: Message[];
    queryParams: Omit<QueryParams, 'messages'>;
    description: string;
    setAppState: SetAppState;
    agentDefinition?: AgentDefinition;
}): string;
//# sourceMappingURL=LocalMainSessionTask.d.ts.map