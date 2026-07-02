/**
 * Teammate Initialization Module
 *
 * Handles initialization for Claude Code instances running as teammates in a swarm.
 * Registers a Stop hook to notify the team leader when the teammate becomes idle.
 */
import type { AppState } from '../../state/AppState.js';
/**
 * Initializes hooks for a teammate running in a swarm.
 * Should be called early in session startup after AppState is available.
 *
 * Registers a Stop hook that sends an idle notification to the team leader
 * when this teammate's session stops.
 */
export declare function initializeTeammateHooks(setAppState: (updater: (prev: AppState) => AppState) => void, sessionId: string, teamInfo: {
    teamName: string;
    agentId: string;
    agentName: string;
}): void;
//# sourceMappingURL=teammateInit.d.ts.map