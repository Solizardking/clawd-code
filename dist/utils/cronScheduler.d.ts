import { type CronJitterConfig, type CronTask } from './cronTasks.js';
/**
 * True when a recurring task was created more than `maxAgeMs` ago and should
 * be deleted on its next fire. Permanent tasks never age. `maxAgeMs === 0`
 * means unlimited (never ages out). Sourced from
 * {@link CronJitterConfig.recurringMaxAgeMs} at call time.
 * Extracted for testability — the scheduler's check() is buried under
 * setInterval/chokidar/lock machinery.
 */
export declare function isRecurringTaskAged(t: CronTask, nowMs: number, maxAgeMs: number): boolean;
type CronSchedulerOptions = {
    /** Called when a task fires (regular or missed-on-startup). */
    onFire: (prompt: string) => void;
    /** While true, firing is deferred to the next tick. */
    isLoading: () => boolean;
    /**
     * When true, bypasses the isLoading gate in check() and auto-enables the
     * scheduler without waiting for setScheduledTasksEnabled(). The
     * auto-enable is the load-bearing part — assistant mode has tasks in
     * scheduled_tasks.json at install time and shouldn't wait on a loader
     * skill to flip the flag. The isLoading bypass is minor post-#20425
     * (assistant mode now idles between turns like a normal REPL).
     */
    assistantMode?: boolean;
    /**
     * When provided, receives the full CronTask on normal fires (and onFire is
     * NOT called for that fire). Lets daemon callers see the task id/cron/etc
     * instead of just the prompt string.
     */
    onFireTask?: (task: CronTask) => void;
    /**
     * When provided, receives the missed one-shot tasks on initial load (and
     * onFire is NOT called with the pre-formatted notification). Daemon decides
     * how to surface them.
     */
    onMissed?: (tasks: CronTask[]) => void;
    /**
     * Directory containing .claude/scheduled_tasks.json. When provided, the
     * scheduler never touches bootstrap state: getProjectRoot/getSessionId are
     * not read, and the getScheduledTasksEnabled() poll is skipped (enable()
     * runs immediately on start). Required for Agent SDK daemon callers.
     */
    dir?: string;
    /**
     * Owner key written into the lock file. Defaults to getSessionId().
     * Daemon callers must pass a stable per-process UUID since they have no
     * session. PID remains the liveness probe regardless.
     */
    lockIdentity?: string;
    /**
     * Returns the cron jitter config to use for this tick. Called once per
     * check() cycle. REPL callers pass a GrowthBook-backed implementation
     * (see cronJitterConfig.ts) for live tuning — ops can widen the jitter
     * window mid-session during a :00 load spike without restarting clients.
     * Agent SDK daemon callers omit this and get DEFAULT_CRON_JITTER_CONFIG,
     * which is safe since daemons restart on config change anyway, and the
     * growthbook.ts → config.ts → commands.ts → REPL chain stays out of
     * sdk.mjs.
     */
    getJitterConfig?: () => CronJitterConfig;
    /**
     * Killswitch: polled once per check() tick. When true, check() bails
     * before firing anything — existing crons stop dead mid-session. CLI
     * callers inject `() => !isKairosCronEnabled()` so flipping the
     * tengu_kairos_cron gate off stops already-running schedulers (not just
     * new ones). Daemon callers omit this, same rationale as getJitterConfig.
     */
    isKilled?: () => boolean;
    /**
     * Per-task gate applied before any side effect. Tasks returning false are
     * invisible to this scheduler: never fired, never stamped with
     * `lastFiredAt`, never deleted, never surfaced as missed, absent from
     * `getNextFireTime()`. The daemon cron worker uses `t => t.permanent` so
     * non-permanent tasks in the same scheduled_tasks.json are untouched.
     */
    filter?: (t: CronTask) => boolean;
};
export type CronScheduler = {
    start: () => void;
    stop: () => void;
    /**
     * Epoch ms of the soonest scheduled fire across all loaded tasks, or null
     * if nothing is scheduled (no tasks, or all tasks already in-flight).
     * Daemon callers use this to decide whether to tear down an idle agent
     * subprocess or keep it warm for an imminent fire.
     */
    getNextFireTime: () => number | null;
};
export declare function createCronScheduler(options: CronSchedulerOptions): CronScheduler;
/**
 * Build the missed-task notification text. Guidance precedes the task list
 * and the list is wrapped in a code fence so a multi-line imperative prompt
 * is not interpreted as immediate instructions to avoid self-inflicted
 * prompt injection. The full prompt body is preserved — this path DOES
 * need the model to execute the prompt after user
 * confirmation, and tasks are already deleted from JSON before the model
 * sees this notification.
 */
export declare function buildMissedTaskNotification(missed: CronTask[]): string;
export {};
//# sourceMappingURL=cronScheduler.d.ts.map