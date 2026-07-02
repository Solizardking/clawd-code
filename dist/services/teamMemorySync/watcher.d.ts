/**
 * Team Memory File Watcher
 *
 * Watches the team memory directory for changes and triggers
 * a debounced push to the server when files are modified.
 * Performs an initial pull on startup, then starts a directory-level
 * fs.watch so first-time writes to a fresh repo get picked up.
 */
import { type SyncState } from './index.js';
import type { TeamMemorySyncPushResult } from './types.js';
/**
 * Permanent = retry without user action will fail the same way.
 * - no_oauth / no_repo: pre-request client checks, no status code
 * - 4xx except 409/429: client error (404 missing repo, 413 too many
 *   entries, 403 permission). 409 is a transient conflict — server state
 *   changed under us, a fresh push after next pull can succeed. 429 is a
 *   rate limit — watcher-driven backoff is fine.
 */
export declare function isPermanentFailure(r: TeamMemorySyncPushResult): boolean;
/**
 * Start the team memory sync system.
 *
 * Returns early (before creating any state) if:
 *   - TEAMMEM build flag is off
 *   - team memory is disabled (isTeamMemoryEnabled)
 *   - OAuth is not available (isTeamMemorySyncAvailable)
 *   - the current repo has no github.com remote
 *
 * The early github.com check prevents a noisy failure mode where the
 * watcher starts, it fires on local edits, and every push/pull
 * logs `errorType: no_repo` forever. Team memory is GitHub-scoped on
 * the server side, so non-github.com remotes can never sync anyway.
 *
 * Pulls from server, then starts the file watcher unconditionally.
 * The watcher must start even when the server has no content yet
 * (fresh EAP repo) — otherwise Claude's first team-memory write
 * depends entirely on PostToolUse hooks firing notifyTeamMemoryWrite,
 * which is a chicken-and-egg: Claude's write rate is low enough that
 * a fresh partner can sit in the bootstrap dead zone for days.
 */
export declare function startTeamMemoryWatcher(): Promise<void>;
/**
 * Call this when a team memory file is written (e.g. from PostToolUse hooks).
 * Schedules a push explicitly in case fs.watch misses the write —
 * a file written in the same tick the watcher starts may not fire an
 * event, and some platforms coalesce rapid successive writes.
 * If the watcher does fire, the debounce timer just resets.
 */
export declare function notifyTeamMemoryWrite(): Promise<void>;
/**
 * Stop the file watcher and flush pending changes.
 * Note: runs within the 2s graceful shutdown budget, so the flush
 * is best-effort — if the HTTP PUT doesn't complete in time,
 * process.exit() will kill it.
 */
export declare function stopTeamMemoryWatcher(): Promise<void>;
/**
 * Test-only: reset module state and optionally seed syncState.
 * The feature('TEAMMEM') gate at the top of startTeamMemoryWatcher() is
 * always false in bun test, so tests can't set syncState through the normal
 * path. This helper lets tests drive notifyTeamMemoryWrite() /
 * stopTeamMemoryWatcher() directly.
 *
 * `skipWatcher: true` marks the watcher as already-started without actually
 * starting it. Tests that only exercise the schedulePush/flush path don't
 * need a real watcher.
 */
export declare function _resetWatcherStateForTesting(opts?: {
    syncState?: SyncState;
    skipWatcher?: boolean;
    pushSuppressedReason?: string | null;
}): void;
/**
 * Test-only: start the real fs.watch on a specified directory.
 * Used by the fd-count regression test — startTeamMemoryWatcher() is gated
 * by feature('TEAMMEM') which is false under bun test.
 */
export declare function _startFileWatcherForTesting(dir: string): Promise<void>;
//# sourceMappingURL=watcher.d.ts.map