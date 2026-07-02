/**
 * Team Discovery - Utilities for discovering teams and teammate status
 *
 * Scans ~/.claude/teams/ to find teams where the current session is the leader.
 * Used by the Teams UI in the footer to show team status.
 */
import { type PaneBackendType } from './swarm/backends/types.js';
export type TeamSummary = {
    name: string;
    memberCount: number;
    runningCount: number;
    idleCount: number;
};
export type TeammateStatus = {
    name: string;
    agentId: string;
    agentType?: string;
    model?: string;
    prompt?: string;
    status: 'running' | 'idle' | 'unknown';
    color?: string;
    idleSince?: string;
    tmuxPaneId: string;
    cwd: string;
    worktreePath?: string;
    isHidden?: boolean;
    backendType?: PaneBackendType;
    mode?: string;
};
/**
 * Get detailed teammate statuses for a team
 * Reads isActive from config to determine status
 */
export declare function getTeammateStatuses(teamName: string): TeammateStatus[];
//# sourceMappingURL=teamDiscovery.d.ts.map