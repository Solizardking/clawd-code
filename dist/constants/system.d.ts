declare const CLI_SYSPROMPT_PREFIX_VALUES: readonly ["You are Claude Code, Anthropic's official CLI for Claude.", "You are Claude Code, Anthropic's official CLI for Claude, running within the Claude Agent SDK.", "You are a Claude agent, built on Anthropic's Claude Agent SDK."];
export type CLISyspromptPrefix = (typeof CLI_SYSPROMPT_PREFIX_VALUES)[number];
/**
 * All possible CLI sysprompt prefix values, used by splitSysPromptPrefix
 * to identify prefix blocks by content rather than position.
 */
export declare const CLI_SYSPROMPT_PREFIXES: ReadonlySet<string>;
export declare function getCLISyspromptPrefix(options?: {
    isNonInteractive: boolean;
    hasAppendSystemPrompt: boolean;
}): CLISyspromptPrefix;
/**
 * Get attribution header for API requests.
 * Returns a header string with cc_version (including fingerprint) and cc_entrypoint.
 * Enabled by default, can be disabled via env var or GrowthBook killswitch.
 *
 * When NATIVE_CLIENT_ATTESTATION is enabled, includes a `cch=00000` placeholder.
 * Before the request is sent, Bun's native HTTP stack finds this placeholder
 * in the request body and overwrites the zeros with a computed hash. The
 * server verifies this token to confirm the request came from a real Claude
 * Code client. See bun-anthropic/src/http/Attestation.zig for implementation.
 *
 * We use a placeholder (instead of injecting from Zig) because same-length
 * replacement avoids Content-Length changes and buffer reallocation.
 */
export declare function getAttributionHeader(fingerprint: string): string;
export {};
//# sourceMappingURL=system.d.ts.map