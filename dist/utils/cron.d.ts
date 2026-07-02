export type CronFields = {
    minute: number[];
    hour: number[];
    dayOfMonth: number[];
    month: number[];
    dayOfWeek: number[];
};
/**
 * Parse a 5-field cron expression into expanded number arrays.
 * Returns null if invalid or unsupported syntax.
 */
export declare function parseCronExpression(expr: string): CronFields | null;
/**
 * Compute the next Date strictly after `from` that matches the cron fields,
 * using the process's local timezone. Walks forward minute-by-minute. Bounded
 * at 366 days; returns null if no match (impossible for valid cron, but
 * satisfies the type).
 *
 * Standard cron semantics: when both dayOfMonth and dayOfWeek are constrained
 * (neither is the full range), a date matches if EITHER matches.
 *
 * DST: fixed-hour crons targeting a spring-forward gap (e.g. `30 2 * * *`
 * in a US timezone) skip the transition day — the gap hour never appears
 * in local time, so the hour-set check fails and the loop moves on.
 * Wildcard-hour crons (`30 * * * *`) fire at the first valid minute after
 * the gap. Fall-back repeats fire once (the step-forward logic jumps past
 * the second occurrence). This matches vixie-cron behavior.
 */
export declare function computeNextCronRun(fields: CronFields, from: Date): Date | null;
export declare function cronToHuman(cron: string, opts?: {
    utc?: boolean;
}): string;
//# sourceMappingURL=cron.d.ts.map