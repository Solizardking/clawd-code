/**
 * Team Memory Sync Service
 *
 * Syncs team memory files between the local filesystem and the server API.
 * Team memory is scoped per-repo (identified by git remote hash) and shared
 * across all authenticated org members.
 *
 * API contract (anthropic/anthropic#250711 + #283027):
 *   GET  /api/claude_code/team_memory?repo={owner/repo}            → TeamMemoryData (includes entryChecksums)
 *   GET  /api/claude_code/team_memory?repo={owner/repo}&view=hashes → metadata + entryChecksums only (no entry bodies)
 *   PUT  /api/claude_code/team_memory?repo={owner/repo}            → upload entries (upsert semantics)
 *   404 = no data exists yet
 *
 * Sync semantics:
 *   - Pull overwrites local files with server content (server wins per-key).
 *   - Push uploads only keys whose content hash differs from serverChecksums
 *     (delta upload). Server uses upsert: keys not in the PUT are preserved.
 *   - File deletions do NOT propagate: deleting a local file won't remove it
 *     from the server, and the next pull will restore it locally.
 *
 * State management:
 *   All mutable state (ETag tracking, watcher suppression) lives in a
 *   SyncState object created by the caller and threaded through every call.
 *   This avoids module-level mutable state and gives tests natural isolation.
 */
import { type TeamMemorySyncPushResult } from './types.js';
/**
 * Mutable state for the team memory sync service.
 * Created once per session by the watcher and passed to all sync functions.
 * Tests create a fresh instance per test for isolation.
 */
export type SyncState = {
    /** Last known server checksum (ETag) for conditional requests. */
    lastKnownChecksum: string | null;
    /**
     * Per-key content hash (`sha256:<hex>`) of what we believe the server
     * currently holds. Populated from server-provided entryChecksums on pull
     * and from local hashes on successful push. Used to compute the delta on
     * push — only keys whose local hash differs are uploaded.
     */
    serverChecksums: Map<string, string>;
    /**
     * Server-enforced max_entries cap, learned from a structured 413 response
     * (anthropic/anthropic#293258 adds error_code + extra_details.max_entries).
     * Stays null until a 413 is observed — the server's cap is GB-tunable
     * per-org so there is no correct client-side default.  While null,
     * readLocalTeamMemory sends everything and lets the server be
     * authoritative (it rejects atomically).
     */
    serverMaxEntries: number | null;
};
export declare function createSyncState(): SyncState;
/**
 * Compute `sha256:<hex>` over the UTF-8 bytes of the given content.
 * Format matches the server's entryChecksums values (anthropic/anthropic#283027)
 * so local-vs-server comparison works by direct string equality.
 */
export declare function hashContent(content: string): string;
/**
 * Split a delta into PUT-sized batches under MAX_PUT_BODY_BYTES each.
 *
 * Greedy bin-packing over sorted keys — sorting gives deterministic batches
 * across calls, which matters for ETag stability if the conflict loop retries
 * after a partial commit.  The byte count is the full serialized body
 * including JSON overhead, so what we measure is what axios sends.
 *
 * A single entry exceeding MAX_PUT_BODY_BYTES goes into its own solo batch
 * (MAX_FILE_SIZE_BYTES=250K already caps individual files; a ~250K solo body
 * is above our soft cap but below the gateway's observed real threshold).
 */
export declare function batchDeltaByBytes(delta: Record<string, string>): Array<Record<string, string>>;
/**
 * Check if team memory sync is available (requires first-party OAuth).
 */
export declare function isTeamMemorySyncAvailable(): boolean;
/**
 * Pull team memory from the server and write to local directory.
 * Returns true if any files were updated.
 */
export declare function pullTeamMemory(state: SyncState, options?: {
    skipEtagCache?: boolean;
}): Promise<{
    success: boolean;
    filesWritten: number;
    /** Number of entries the server returned, regardless of whether they were written to disk. */
    entryCount: number;
    notModified?: boolean;
    error?: string;
}>;
/**
 * Push local team memory files to the server with optimistic locking.
 *
 * Uses delta upload: only keys whose local content hash differs from
 * serverChecksums are included in the PUT. On 412 conflict, probes
 * GET ?view=hashes to refresh serverChecksums, recomputes the delta
 * (naturally excluding keys where a teammate's push matches ours),
 * and retries. No merge, no disk writes — server-only new keys from
 * a teammate's concurrent push propagate on the next pull.
 *
 * Local-wins-on-conflict is the opposite of syncTeamMemory's pull-first
 * semantics. This is intentional: pushTeamMemory is triggered by a local edit,
 * and that edit must not be silently discarded just because a teammate pushed
 * in the meantime. Content-level merge (same key, both changed) is not
 * attempted — the local version simply overwrites the server version for that
 * key, and the server's edit to that key is lost. This is the lesser evil:
 * the local user is actively editing and can re-incorporate the teammate's
 * changes, whereas silently discarding the local edit loses work the user
 * just did with no recourse.
 */
export declare function pushTeamMemory(state: SyncState): Promise<TeamMemorySyncPushResult>;
/**
 * Bidirectional sync: pull from server, merge with local, push back.
 * Server entries take precedence on conflict (last-write-wins by the server).
 * Push uses conflict resolution (retries on 412) via pushTeamMemory.
 */
export declare function syncTeamMemory(state: SyncState): Promise<{
    success: boolean;
    filesPulled: number;
    filesPushed: number;
    error?: string;
}>;
//# sourceMappingURL=index.d.ts.map