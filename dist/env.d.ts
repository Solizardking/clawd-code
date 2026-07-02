export declare function parseEnvFile(path: string): Record<string, string>;
/**
 * Minimal Grok-compatible config.toml parser.
 * Supports the subset of TOML we actually use:
 *   [models]
 *   default = "glm-5.2"
 *
 *   [model.grok-fast]
 *   model = "grok-4.3-fast"
 *   base_url = "https://api.x.ai/v1"
 *   name = "Grok Fast"
 *   env_key = "XAI_API_KEY"
 *
 * Quotes, single-line comments (`#`), and `[section]` headers are handled.
 * Returns a flat record of resolved env-var-style keys plus a list of model
 * aliases keyed by their declared name.
 */
export declare function parseGrokConfigToml(path: string): {
    flat: Record<string, string>;
    defaultModel?: string;
    modelAliases: Record<string, {
        model: string;
        baseUrl?: string;
        name?: string;
        envKey?: string;
    }>;
};
/**
 * Merge Grok config.toml entries from project (.grok/config.toml) then user
 * (~/.grok/config.toml) into the env-var bag. Project overrides user (matches
 * 12-factor precedence and matches how Grok discovers config).
 */
export declare function loadGrokConfig(): {
    flat: Record<string, string>;
    sources: string[];
    modelAliases: Record<string, {
        model: string;
        baseUrl?: string;
        name?: string;
        envKey?: string;
    }>;
};
export declare function loadClawdEnv(): Record<string, string>;
export declare function maskSecret(value: string | undefined): string;
export declare const ENV_FILE_PATHS: {
    config: string;
    local: string;
    grokUser: string;
    grokProject: string;
};
//# sourceMappingURL=env.d.ts.map