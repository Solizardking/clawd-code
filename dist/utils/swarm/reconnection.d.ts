/**
 * Swarm Reconnection Module
 *
 * Handles initialization of swarm context for teammates.
 * - Fresh spawns: Initialize from CLI args (set in main.tsx via dynamicTeamContext)
 * - Resumed sessions: Initialize from teamName/agentName stored in the transcript
 */
import type { AppState } from '../../state/AppState.js';
/**
 * Computes the initial teamContext for AppState.
 *
 * This is called synchronously in main.tsx to compute the teamContext
 * BEFORE the first render, eliminating the need for useEffect workarounds.
 *
 * @returns The teamContext object to include in initialState, or undefined if not a teammate
 */
export declare function computeInitialTeamContext(): AppState['teamContext'] | undefined;
/**
 * Initialize teammate context from a resumed session.
 *
 * This is called when resuming a session that has teamName/agentName stored
 * in the transcript. It sets up teamContext in AppState so that heartbeat
 * and other swarm features work correctly.
 */
export declare function initializeTeammateContextFromSession(setAppState: (updater: (prev: AppState) => AppState) => void, teamName: string, agentName: string): void;
//# sourceMappingURL=reconnection.d.ts.map