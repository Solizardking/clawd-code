import type { AppState } from './AppState.js';
/**
 * Transitions the UI to view a teammate's transcript.
 * Sets viewingAgentTaskId and, for local_agent, retain: true (blocks eviction,
 * enables stream-append, triggers disk bootstrap) and clears evictAfter.
 * If switching from another agent, releases the previous one back to stub.
 */
export declare function enterTeammateView(taskId: string, setAppState: (updater: (prev: AppState) => AppState) => void): void;
/**
 * Exit teammate transcript view and return to leader's view.
 * Drops retain and clears messages back to stub form; if terminal,
 * schedules eviction via evictAfter so the row lingers briefly.
 */
export declare function exitTeammateView(setAppState: (updater: (prev: AppState) => AppState) => void): void;
/**
 * Context-sensitive x: running → abort, terminal → dismiss.
 * Dismiss sets evictAfter=0 so the filter hides immediately.
 * If viewing the dismissed agent, also exits to leader.
 */
export declare function stopOrDismissAgent(taskId: string, setAppState: (updater: (prev: AppState) => AppState) => void): void;
//# sourceMappingURL=teammateViewHelpers.d.ts.map