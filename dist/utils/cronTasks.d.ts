export type CronTask = {
    id: string;
    /** 5-field cron string (local time) — validated on write, re-validated on read. */
    cron: string;
    /** Prompt to enqueue when the task fires. */
    prompt: string;
    /** Epoch ms when the task was created. Anchor for missed-task detection. */
    createdAt: number;
    /**
     * Epoch ms of the most recent fire. Written back by the scheduler after
     * each recurring fire so next-fire computation survives process restarts.
     * The scheduler anchors first-sight from `lastFiredAt ?? createdAt` — a
     * never-fired task uses createdAt (correct for pinned crons like
     * `30 14 27 2 *` whose next-from-now is next year); a fired-before task
     * reconstructs the same `nextFireAt` the prior process had in memory.
     * Never set for one-shots (they're deleted on fire).
     */
    lastFiredAt?: number;
    /** When true, the task reschedules after firing instead of being deleted. */
    recurring?: boolean;
    /**
     * When true, the task is exempt from recurringMaxAgeMs auto-expiry.
     * System escape hatch for assistant mode's built-in tasks (catch-up/
     * morning-checkin/dream) — the installer's writeIfMissing() skips existing
     * files so re-install can't recreate them. Not settable via CronCreateTool;
     * only written directly to scheduled_tasks.json by src/assistant/install.ts.
     */
    permanent?: boolean;
    /**
     * Runtime-only flag. false → session-scoped (never written to disk).
     * File-backed tasks leave this undefined; writeCronTasks strips it so
     * the on-disk shape stays { id, cron, prompt, createdAt, lastFiredAt?, recurring?, permanent? }.
     */
    durable?: boolean;
    /**
     * Runtime-only. When set, the task was created by an in-process teammate.
     * The scheduler routes fires to that teammate's queue instead of the main
     * REPL's. Never written to disk (teammate crons are always session-only).
     */
    agentId?: string;
};
/**
 * Path to the cron file. `dir` defaults to getProjectRoot() — pass it
 * explicitly from contexts that don't run through main.tsx (e.g. the Agent
 * SDK daemon, which has no bootstrap state).
 */
export declare function getCronFilePath(dir?: string): string;
/**
 * Read and parse .claude/scheduled_tasks.json. Returns an empty task list if the file
 * is missing, empty, or malformed. Tasks with invalid cron strings are
 * silently dropped (logged at debug level) so a single bad entry never
 * blocks the whole file.
 */
export declare function readCronTasks(dir?: string): Promise<CronTask[]>;
/**
 * Sync check for whether the cron file has any valid tasks. Used by
 * cronScheduler.start() to decide whether to auto-enable. One file read.
 */
export declare function hasCronTasksSync(dir?: string): boolean;
/**
 * Overwrite .claude/scheduled_tasks.json with the given tasks. Creates .claude/ if
 * missing. Empty task list writes an empty file (rather than deleting) so
 * the file watcher sees a change event on last-task-removed.
 */
export declare function writeCronTasks(tasks: CronTask[], dir?: string): Promise<void>;
/**
 * Append a task. Returns the generated id. Caller is responsible for having
 * already validated the cron string (the tool does this via validateInput).
 *
 * When `durable` is false the task is held in process memory only
 * (bootstrap/state.ts) — it fires on schedule this session but is never
 * written to .claude/scheduled_tasks.json and dies with the process. The
 * scheduler merges session tasks into its tick loop directly, so no file
 * change event is needed.
 */
export declare function addCronTask(cron: string, prompt: string, recurring: boolean, durable: boolean, agentId?: string): Promise<string>;
/**
 * Remove tasks by id. No-op if none match (e.g. another session raced us).
 * Used for both fire-once cleanup and explicit CronDelete.
 *
 * When called with `dir` undefined (REPL path), also sweeps the in-memory
 * session store — the caller doesn't know which store an id lives in.
 * Daemon callers pass `dir` explicitly; they have no session, and the
 * `dir !== undefined` guard keeps this function from touching bootstrap
 * state on that path (tests enforce this).
 */
export declare function removeCronTasks(ids: string[], dir?: string): Promise<void>;
/**
 * Stamp `lastFiredAt` on the given recurring tasks and write back. Batched
 * so N fires in one scheduler tick = one read-modify-write, not N. Only
 * touches file-backed tasks — session tasks die with the process, no point
 * persisting their fire time. No-op if none of the ids match (task was
 * deleted between fire and write — e.g. user ran CronDelete mid-tick).
 *
 * Scheduler lock means at most one process calls this; chokidar picks up
 * the write and triggers a reload which re-seeds `nextFireAt` from the
 * just-written `lastFiredAt` — idempotent (same computation, same answer).
 */
export declare function markCronTasksFired(ids: string[], firedAt: number, dir?: string): Promise<void>;
/**
 * File-backed tasks + session-only tasks, merged. Session tasks get
 * `durable: false` so callers can distinguish them. File tasks are
 * returned as-is (durable undefined → truthy).
 *
 * Only merges when `dir` is undefined — daemon callers (explicit `dir`)
 * have no session store to merge with.
 */
export declare function listAllCronTasks(dir?: string): Promise<CronTask[]>;
/**
 * Next fire time in epoch ms for a cron string, strictly after `fromMs`.
 * Returns null if invalid or no match in the next 366 days.
 */
export declare function nextCronRunMs(cron: string, fromMs: number): number | null;
/**
 * Cron scheduler tuning knobs. Sourced at runtime from the
 * `tengu_kairos_cron_config` GrowthBook JSON config (see cronJitterConfig.ts)
 * so ops can adjust behavior fleet-wide without shipping a client build.
 * Defaults here preserve the pre-config behavior exactly.
 */
export type CronJitterConfig = {
    /** Recurring-task forward delay as a fraction of the interval between fires. */
    recurringFrac: number;
    /** Upper bound on recurring forward delay regardless of interval length. */
    recurringCapMs: number;
    /** One-shot backward lead: maximum ms a task may fire early. */
    oneShotMaxMs: number;
    /**
     * One-shot backward lead: minimum ms a task fires early when the minute-mod
     * gate matches. 0 = taskIds hashing near zero fire on the exact mark. Raise
     * this to guarantee nobody lands on the wall-clock boundary.
     */
    oneShotFloorMs: number;
    /**
     * Jitter fires landing on minutes where `minute % N === 0`. 30 → :00/:30
     * (the human-rounding hotspots). 15 → :00/:15/:30/:45. 1 → every minute.
     */
    oneShotMinuteMod: number;
    /**
     * Recurring tasks auto-expire this many ms after creation (unless marked
     * `permanent`). Cron is the primary driver of multi-day sessions (p99
     * uptime 61min → 53h post-#19931), and unbounded recurrence lets Tier-1
     * heap leaks compound indefinitely. The default (7 days) covers "check
     * my PRs every hour this week" workflows while capping worst-case
     * session lifetime. Permanent tasks (assistant mode's catch-up/
     * morning-checkin/dream) never age out — they can't be recreated if
     * deleted because install.ts's writeIfMissing() skips existing files.
     *
     * `0` = unlimited (tasks never auto-expire).
     */
    recurringMaxAgeMs: number;
};
export declare const DEFAULT_CRON_JITTER_CONFIG: CronJitterConfig;
/**
 * Same as {@link nextCronRunMs}, plus a deterministic per-task delay to
 * avoid a thundering herd when many sessions schedule the same cron string
 * (e.g. `0 * * * *` → everyone hits inference at :00).
 *
 * The delay is proportional to the current gap between fires
 * ({@link CronJitterConfig.recurringFrac}, capped at
 * {@link CronJitterConfig.recurringCapMs}) so at defaults an hourly task
 * spreads across [:00, :06) but a per-minute task only spreads by a few
 * seconds.
 *
 * Only used for recurring tasks. One-shot tasks use
 * {@link oneShotJitteredNextCronRunMs} (backward jitter, minute-gated).
 */
export declare function jitteredNextCronRunMs(cron: string, fromMs: number, taskId: string, cfg?: CronJitterConfig): number | null;
/**
 * Same as {@link nextCronRunMs}, minus a deterministic per-task lead time
 * when the fire time lands on a minute boundary matching
 * {@link CronJitterConfig.oneShotMinuteMod}.
 *
 * One-shot tasks are user-pinned ("remind me at 3pm") so delaying them
 * breaks the contract — but firing slightly early is invisible and spreads
 * the inference spike from everyone picking the same round wall-clock time.
 * At defaults (mod 30, max 90 s, floor 0) only :00 and :30 get jitter,
 * because humans round to the half-hour.
 *
 * During an incident, ops can push `tengu_kairos_cron_config` with e.g.
 * `{oneShotMinuteMod: 15, oneShotMaxMs: 300000, oneShotFloorMs: 30000}` to
 * spread :00/:15/:30/:45 fires across a [t-5min, t-30s] window — every task
 * gets at least 30 s of lead, so nobody lands on the exact mark.
 *
 * Checks the computed fire time rather than the cron string so
 * `0 15 * * *`, step expressions, and `0,30 9 * * *` all get jitter
 * when they land on a matching minute. Clamped to `fromMs` so a task created
 * inside its own jitter window doesn't fire before it was created.
 */
export declare function oneShotJitteredNextCronRunMs(cron: string, fromMs: number, taskId: string, cfg?: CronJitterConfig): number | null;
/**
 * A task is "missed" when its next scheduled run (computed from createdAt)
 * is in the past. Surfaced to the user at startup. Works for both one-shot
 * and recurring tasks — a recurring task whose window passed while Claude
 * was down is still "missed".
 */
export declare function findMissedTasks(tasks: CronTask[], nowMs: number): CronTask[];
//# sourceMappingURL=cronTasks.d.ts.map