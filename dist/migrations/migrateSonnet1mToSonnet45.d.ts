/**
 * Migrate users who had "sonnet[1m]" saved to the explicit "sonnet-4-5-20250929[1m]".
 *
 * The "sonnet" alias now resolves to Sonnet 4.6, so users who previously set
 * "sonnet[1m]" (targeting Sonnet 4.5 with 1M context) need to be pinned to the
 * explicit version to preserve their intended model.
 *
 * This is needed because Sonnet 4.6 1M was offered to a different group of users than
 * Sonnet 4.5 1M, so we needed to pin existing sonnet[1m] users to Sonnet 4.5 1M.
 *
 * Reads from userSettings specifically (not merged settings) so we don't
 * promote a project-scoped "sonnet[1m]" to the global default. Runs once,
 * tracked by a completion flag in global config.
 */
export declare function migrateSonnet1mToSonnet45(): void;
//# sourceMappingURL=migrateSonnet1mToSonnet45.d.ts.map