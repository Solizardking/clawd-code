/**
 * PID-Based Version Locking
 *
 * This module provides PID-based locking for running Claude Code versions.
 * Unlike mtime-based locking (which can hold locks for 30 days after a crash),
 * PID-based locking can immediately detect when a process is no longer running.
 *
 * Lock files contain JSON with the PID and metadata, and staleness is determined
 * by checking if the process is still alive.
 */
/**
 * Check if PID-based version locking is enabled.
 * When disabled, falls back to mtime-based locking (30-day timeout).
 *
 * Controlled by GrowthBook gate with local override:
 * - Set ENABLE_PID_BASED_VERSION_LOCKING=true to force-enable
 * - Set ENABLE_PID_BASED_VERSION_LOCKING=false to force-disable
 * - If unset, GrowthBook gate (tengu_pid_based_version_locking) controls rollout
 */
export declare function isPidBasedLockingEnabled(): boolean;
/**
 * Content stored in a version lock file
 */
export type VersionLockContent = {
    pid: number;
    version: string;
    execPath: string;
    acquiredAt: number;
};
/**
 * Information about a lock for diagnostic purposes
 */
export type LockInfo = {
    version: string;
    pid: number;
    isProcessRunning: boolean;
    execPath: string;
    acquiredAt: Date;
    lockFilePath: string;
};
/**
 * Check if a process with the given PID is currently running
 * Uses signal 0 which doesn't actually send a signal but checks if we can
 */
export declare function isProcessRunning(pid: number): boolean;
/**
 * Read and parse a lock file's content
 */
export declare function readLockContent(lockFilePath: string): VersionLockContent | null;
/**
 * Check if a lock file represents an active lock (process still running)
 */
export declare function isLockActive(lockFilePath: string): boolean;
/**
 * Try to acquire a lock on a version file
 * Returns a release function if successful, null if the lock is already held
 */
export declare function tryAcquireLock(versionPath: string, lockFilePath: string): Promise<(() => void) | null>;
/**
 * Acquire a lock and hold it for the lifetime of the process
 * This is used for locking the currently running version
 */
export declare function acquireProcessLifetimeLock(versionPath: string, lockFilePath: string): Promise<boolean>;
/**
 * Execute a callback while holding a lock
 * Returns true if the callback executed, false if lock couldn't be acquired
 */
export declare function withLock(versionPath: string, lockFilePath: string, callback: () => void | Promise<void>): Promise<boolean>;
/**
 * Get information about all version locks for diagnostics
 */
export declare function getAllLockInfo(locksDir: string): LockInfo[];
/**
 * Clean up stale locks (locks where the process is no longer running)
 * Returns the number of locks cleaned up
 *
 * Handles both:
 * - PID-based locks (files containing JSON with PID)
 * - Legacy proper-lockfile locks (directories created by mtime-based locking)
 */
export declare function cleanupStaleLocks(locksDir: string): number;
//# sourceMappingURL=pidLock.d.ts.map