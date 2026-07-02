import type { AgentId, SessionId } from 'src/types/ids.js';
import type { LogOption } from 'src/types/logs.js';
/**
 * Get or generate a word slug for the current session's plan.
 * The slug is generated lazily on first access and cached for the session.
 * If a plan file with the generated slug already exists, retries up to 10 times.
 */
export declare function getPlanSlug(sessionId?: SessionId): string;
/**
 * Set a specific plan slug for a session (used when resuming a session)
 */
export declare function setPlanSlug(sessionId: SessionId, slug: string): void;
/**
 * Clear the plan slug for the current session.
 * This should be called on /clear to ensure a fresh plan file is used.
 */
export declare function clearPlanSlug(sessionId?: SessionId): void;
/**
 * Clear ALL plan slug entries (all sessions).
 * Use this on /clear to free sub-session slug entries.
 */
export declare function clearAllPlanSlugs(): void;
export declare const getPlansDirectory: any;
/**
 * Get the file path for a session's plan
 * @param agentId Optional agent ID for subagents. If not provided, returns main session plan.
 * For main conversation (no agentId), returns {planSlug}.md
 * For subagents (agentId provided), returns {planSlug}-agent-{agentId}.md
 */
export declare function getPlanFilePath(agentId?: AgentId): string;
/**
 * Get the plan content for a session
 * @param agentId Optional agent ID for subagents. If not provided, returns main session plan.
 */
export declare function getPlan(agentId?: AgentId): string | null;
/**
 * Restore plan slug from a resumed session.
 * Sets the slug in the session cache so getPlanSlug returns it.
 * If the plan file is missing, attempts to recover it from a file snapshot
 * (written incrementally during the session) or from message history.
 * Returns true if a plan file exists (or was recovered) for the slug.
 * @param log The log to restore from
 * @param targetSessionId The session ID to associate the plan slug with.
 *                        This should be the ORIGINAL session ID being resumed,
 *                        not the temporary session ID from before resume.
 */
export declare function copyPlanForResume(log: LogOption, targetSessionId?: SessionId): Promise<boolean>;
/**
 * Copy a plan file for a forked session. Unlike copyPlanForResume (which reuses
 * the original slug), this generates a NEW slug for the forked session and
 * writes the original plan content to the new file. This prevents the original
 * and forked sessions from clobbering each other's plan files.
 */
export declare function copyPlanForFork(log: LogOption, targetSessionId: SessionId): Promise<boolean>;
/**
 * Persist a snapshot of session files (plan, todos) to the transcript.
 * Called incrementally whenever these files change. Only active in remote
 * sessions (CCR) where local files don't persist between sessions.
 */
export declare function persistFileSnapshotIfRemote(): Promise<void>;
//# sourceMappingURL=plans.d.ts.map