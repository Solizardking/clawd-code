import { z } from 'zod/v4';
/**
 * Crash-recovery pointer for Remote Control sessions.
 *
 * Written immediately after a bridge session is created, periodically
 * refreshed during the session, and cleared on clean shutdown. If the
 * process dies unclean (crash, kill -9, terminal closed), the pointer
 * persists. On next startup, `claude remote-control` detects it and offers
 * to resume via the --session-id flow from #20460.
 *
 * Staleness is checked against the file's mtime (not an embedded timestamp)
 * so that a periodic re-write with the same content serves as a refresh —
 * matches the backend's rolling BRIDGE_LAST_POLL_TTL (4h) semantics. A
 * bridge that's been polling for 5+ hours and then crashes still has a
 * fresh pointer as long as the refresh ran within the window.
 *
 * Scoped per working directory (alongside transcript JSONL files) so two
 * concurrent bridges in different repos don't clobber each other.
 */
export declare const BRIDGE_POINTER_TTL_MS: number;
declare const BridgePointerSchema: () => any;
export type BridgePointer = z.infer<ReturnType<typeof BridgePointerSchema>>;
export declare function getBridgePointerPath(dir: string): string;
/**
 * Write the pointer. Also used to refresh mtime during long sessions —
 * calling with the same IDs is a cheap no-content-change write that bumps
 * the staleness clock. Best-effort — a crash-recovery file must never
 * itself cause a crash. Logs and swallows on error.
 */
export declare function writeBridgePointer(dir: string, pointer: BridgePointer): Promise<void>;
/**
 * Read the pointer and its age (ms since last write). Operates directly
 * and handles errors — no existence check (CLAUDE.md TOCTOU rule). Returns
 * null on any failure: missing file, corrupted JSON, schema mismatch, or
 * stale (mtime > 4h ago). Stale/invalid pointers are deleted so they don't
 * keep re-prompting after the backend has already GC'd the env.
 */
export declare function readBridgePointer(dir: string): Promise<(BridgePointer & {
    ageMs: number;
}) | null>;
/**
 * Worktree-aware read for `--continue`. The REPL bridge writes its pointer
 * to `getOriginalCwd()` which EnterWorktreeTool/activeWorktreeSession can
 * mutate to a worktree path — but `claude remote-control --continue` runs
 * with `resolve('.')` = shell CWD. This fans out across git worktree
 * siblings to find the freshest pointer, matching /resume's semantics.
 *
 * Fast path: checks `dir` first. Only shells out to `git worktree list` if
 * that misses — the common case (pointer in launch dir) is one stat, zero
 * exec. Fanout reads run in parallel; capped at MAX_WORKTREE_FANOUT.
 *
 * Returns the pointer AND the dir it was found in, so the caller can clear
 * the right file on resume failure.
 */
export declare function readBridgePointerAcrossWorktrees(dir: string): Promise<{
    pointer: BridgePointer & {
        ageMs: number;
    };
    dir: string;
} | null>;
/**
 * Delete the pointer. Idempotent — ENOENT is expected when the process
 * shut down clean previously.
 */
export declare function clearBridgePointer(dir: string): Promise<void>;
export {};
//# sourceMappingURL=bridgePointer.d.ts.map