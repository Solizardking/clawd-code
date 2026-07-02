/**
 * Migrate users with 'opus' pinned in their settings to 'opus[1m]' when they
 * are eligible for the merged Opus 1M experience (Max/Team Premium on 1P).
 *
 * CLI invocations with --model opus are unaffected: that flag is a runtime
 * override and does not touch userSettings, so it continues to use plain Opus.
 *
 * Pro subscribers are skipped — they retain separate Opus and Opus 1M options.
 * 3P users are skipped — their model strings are full model IDs, not aliases.
 *
 * Idempotent: only writes if userSettings.model is exactly 'opus'.
 */
export declare function migrateOpusToOpus1m(): void;
//# sourceMappingURL=migrateOpusToOpus1m.d.ts.map