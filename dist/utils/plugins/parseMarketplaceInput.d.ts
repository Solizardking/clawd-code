import type { MarketplaceSource } from './schemas.js';
/**
 * Parses a marketplace input string and returns the appropriate marketplace source type.
 * Handles various input formats:
 * - Git SSH URLs (user@host:path or user@host:path.git)
 *   - Standard: git@github.com:owner/repo.git
 *   - GitHub Enterprise SSH certificates: org-123456@github.com:owner/repo.git
 *   - Custom usernames: deploy@gitlab.com:group/project.git
 *   - Self-hosted: user@192.168.10.123:path/to/repo
 * - HTTP/HTTPS URLs
 * - GitHub shorthand (owner/repo)
 * - Local file paths (.json files)
 * - Local directory paths
 *
 * @param input The marketplace source input string
 * @returns MarketplaceSource object, error object, or null if format is unrecognized
 */
export declare function parseMarketplaceInput(input: string): Promise<MarketplaceSource | {
    error: string;
} | null>;
//# sourceMappingURL=parseMarketplaceInput.d.ts.map