/**
 * File persistence orchestrator
 *
 * This module provides the main orchestration logic for persisting files
 * at the end of each turn:
 * - BYOC mode: Upload files to Files API and collect file IDs
 * - 1P/Cloud mode: Query Files API listDirectory for file IDs (rclone handles sync)
 */
import { type FilesPersistedEventData, type TurnStartTime } from './types.js';
/**
 * Execute file persistence for modified files in the outputs directory.
 *
 * Assembles all config internally:
 * - Checks environment kind (CLAUDE_CODE_ENVIRONMENT_KIND)
 * - Retrieves session access token
 * - Requires CLAUDE_CODE_REMOTE_SESSION_ID for session ID
 *
 * @param turnStartTime - The timestamp when the turn started
 * @param signal - Optional abort signal for cancellation
 * @returns Event data, or null if not enabled or no files to persist
 */
export declare function runFilePersistence(turnStartTime: TurnStartTime, signal?: AbortSignal): Promise<FilesPersistedEventData | null>;
/**
 * Execute file persistence and emit result via callback.
 * Handles errors internally.
 */
export declare function executeFilePersistence(turnStartTime: TurnStartTime, signal: AbortSignal, onResult: (result: FilesPersistedEventData) => void): Promise<void>;
/**
 * Check if file persistence is enabled.
 * Requires: feature flag ON, valid environment kind, session access token,
 * and CLAUDE_CODE_REMOTE_SESSION_ID.
 * This ensures only public-api/sessions users trigger file persistence,
 * not normal Claude Code CLI users.
 */
export declare function isFilePersistenceEnabled(): boolean;
//# sourceMappingURL=filePersistence.d.ts.map