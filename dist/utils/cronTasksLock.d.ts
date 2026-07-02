/**
 * Options for out-of-REPL callers (Agent SDK daemon) that don't have
 * bootstrap state. When omitted, falls back to getProjectRoot() +
 * getSessionId() as before. lockIdentity should be stable for the lifetime
 * of one daemon process (e.g. a randomUUID() captured at startup).
 */
export type SchedulerLockOptions = {
    dir?: string;
    lockIdentity?: string;
};
/**
 * Try to acquire the scheduler lock for the current session.
 * Returns true on success, false if another live session holds it.
 *
 * Uses O_EXCL ('wx') for atomic test-and-set. If the file exists:
 *   - Already ours → true (idempotent re-acquire)
 *   - Another live PID → false
 *   - Stale (PID dead / corrupt) → unlink and retry exclusive create once
 *
 * If two sessions race to recover a stale lock, only one create succeeds.
 */
export declare function tryAcquireSchedulerLock(opts?: SchedulerLockOptions): Promise<boolean>;
/**
 * Release the scheduler lock if the current session owns it.
 */
export declare function releaseSchedulerLock(opts?: SchedulerLockOptions): Promise<void>;
//# sourceMappingURL=cronTasksLock.d.ts.map