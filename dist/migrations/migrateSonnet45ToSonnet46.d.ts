/**
 * Migrate Pro/Max/Team Premium first-party users off explicit Sonnet 4.5
 * model strings to the 'sonnet' alias (which now resolves to Sonnet 4.6).
 *
 * Users may have been pinned to explicit Sonnet 4.5 strings by:
 * - The earlier migrateSonnet1mToSonnet45 migration (sonnet[1m] → explicit 4.5[1m])
 * - Manually selecting it via /model
 *
 * Reads userSettings specifically (not merged) so we only migrate what /model
 * wrote — project/local pins are left alone.
 * Idempotent: only writes if userSettings.model matches a Sonnet 4.5 string.
 */
export declare function migrateSonnet45ToSonnet46(): void;
//# sourceMappingURL=migrateSonnet45ToSonnet46.d.ts.map