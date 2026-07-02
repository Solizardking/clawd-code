/**
 * Swarm Initialization Hook
 *
 * Initializes swarm features: teammate hooks and context.
 * Handles both fresh spawns and resumed teammate sessions.
 *
 * This hook is conditionally loaded to allow dead code elimination when swarms are disabled.
 */
import type { AppState } from '../state/AppState.js';
import type { Message } from '../types/message.js';
type SetAppState = (f: (prevState: AppState) => AppState) => void;
/**
 * Hook that initializes swarm features when ENABLE_AGENT_SWARMS is true.
 *
 * Handles both:
 * - Resumed teammate sessions (from --resume or /resume) where teamName/agentName
 *   are stored in transcript messages
 * - Fresh spawns where context is read from environment variables
 */
export declare function useSwarmInitialization(setAppState: SetAppState, initialMessages: Message[] | undefined, { enabled }?: {
    enabled?: boolean;
}): void;
export {};
//# sourceMappingURL=useSwarmInitialization.d.ts.map