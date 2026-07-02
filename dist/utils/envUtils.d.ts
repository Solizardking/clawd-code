export declare const getClaudeConfigHomeDir: any;
export declare function getTeamsDir(): string;
/**
 * Check if NODE_OPTIONS contains a specific flag.
 * Splits on whitespace and checks for exact match to avoid false positives.
 */
export declare function hasNodeOption(flag: string): boolean;
export declare function isEnvTruthy(envVar: string | boolean | undefined): boolean;
export declare function isEnvDefinedFalsy(envVar: string | boolean | undefined): boolean;
/**
 * --bare / CLAUDE_CODE_SIMPLE — skip hooks, LSP, plugin sync, skill dir-walk,
 * attribution, background prefetches, and ALL keychain/credential reads.
 * Auth is strictly ANTHROPIC_API_KEY env or apiKeyHelper from --settings.
 * Explicit CLI flags (--plugin-dir, --add-dir, --mcp-config) still honored.
 * ~30 gates across the codebase.
 *
 * Checks argv directly (in addition to the env var) because several gates
 * run before main.tsx's action handler sets CLAUDE_CODE_SIMPLE=1 from --bare
 * — notably startKeychainPrefetch() at main.tsx top-level.
 */
export declare function isBareMode(): boolean;
/**
 * Parses an array of environment variable strings into a key-value object
 * @param envVars Array of strings in KEY=VALUE format
 * @returns Object with key-value pairs
 */
export declare function parseEnvVars(rawEnvArgs: string[] | undefined): Record<string, string>;
/**
 * Get the AWS region with fallback to default
 * Matches the Anthropic Bedrock SDK's region behavior
 */
export declare function getAWSRegion(): string;
/**
 * Get the default Vertex AI region
 */
export declare function getDefaultVertexRegion(): string;
/**
 * Check if bash commands should maintain project working directory (reset to original after each command)
 * @returns true if CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR is set to a truthy value
 */
export declare function shouldMaintainProjectWorkingDir(): boolean;
/**
 * Check if running on Homespace (ant-internal cloud environment)
 */
export declare function isRunningOnHomespace(): boolean;
/**
 * Conservative check for whether Claude Code is running inside a protected
 * (privileged or ASL3+) COO namespace or cluster.
 *
 * Conservative means: when signals are ambiguous, assume protected. We would
 * rather over-report protected usage than miss it. Unprotected environments
 * are homespace, namespaces on the open allowlist, and no k8s/COO signals
 * at all (laptop/local dev).
 *
 * Used for telemetry to measure auto-mode usage in sensitive environments.
 */
export declare function isInProtectedNamespace(): boolean;
/**
 * Get the Vertex AI region for a specific model.
 * Different models may be available in different regions.
 */
export declare function getVertexRegionForModel(model: string | undefined): string | undefined;
//# sourceMappingURL=envUtils.d.ts.map