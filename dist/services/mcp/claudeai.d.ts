/**
 * Fetches MCP server configurations from Claude.ai org configs.
 * These servers are managed by the organization via Claude.ai.
 *
 * Results are memoized for the session lifetime (fetch once per CLI session).
 */
export declare const fetchClaudeAIMcpConfigsIfEligible: any;
/**
 * Clears the memoized cache for fetchClaudeAIMcpConfigsIfEligible.
 * Call this after login so the next fetch will use the new auth tokens.
 */
export declare function clearClaudeAIMcpConfigsCache(): void;
/**
 * Record that a claude.ai connector successfully connected. Idempotent.
 *
 * Gates the "N connectors unavailable/need auth" startup notifications: a
 * connector that was working yesterday and is now failed is a state change
 * worth surfacing; an org-configured connector that's been needs-auth since
 * it showed up is one the user has demonstrably ignored.
 */
export declare function markClaudeAiMcpConnected(name: string): void;
export declare function hasClaudeAiMcpEverConnected(name: string): boolean;
//# sourceMappingURL=claudeai.d.ts.map