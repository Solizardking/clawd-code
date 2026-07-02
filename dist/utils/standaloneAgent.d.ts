/**
 * Standalone agent utilities for sessions with custom names/colors
 *
 * These helpers provide access to standalone agent context (name and color)
 * for sessions that are NOT part of a swarm team. When a session is part
 * of a swarm, these functions return undefined to let swarm context take
 * precedence.
 */
import type { AppState } from '../state/AppState.js';
/**
 * Returns the standalone agent name if set and not a swarm teammate.
 * Uses getTeamName() for consistency with isTeammate() swarm detection.
 */
export declare function getStandaloneAgentName(appState: AppState): string | undefined;
//# sourceMappingURL=standaloneAgent.d.ts.map