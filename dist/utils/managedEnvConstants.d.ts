export declare function isProviderManagedEnvVar(key: string): boolean;
/**
 * Dangerous shell settings that can execute arbitrary shell code
 */
export declare const DANGEROUS_SHELL_SETTINGS: readonly ["apiKeyHelper", "awsAuthRefresh", "awsCredentialExport", "gcpAuthRefresh", "otelHeadersHelper", "statusLine"];
/**
 * Safe environment variables that can be applied before trust dialog.
 * These are Claude Code specific settings that don't pose security risks.
 *
 * IMPORTANT: This is the source of truth for which env vars are safe.
 * Any env var NOT in this list is considered dangerous and will trigger
 * a security dialog when set via remote managed settings.
 *
 * Dangerous env vars (NOT in this list):
 *
 * === REDIRECT TO ATTACKER-CONTROLLED SERVER ===
 * - ANTHROPIC_BASE_URL, ANTHROPIC_BEDROCK_BASE_URL, ANTHROPIC_FOUNDRY_BASE_URL, ANTHROPIC_VERTEX_BASE_URL
 * - HTTP_PROXY, HTTPS_PROXY, NO_PROXY, http_proxy, https_proxy, no_proxy
 * - OTEL_EXPORTER_OTLP_ENDPOINT, OTEL_EXPORTER_OTLP_LOGS_ENDPOINT, OTEL_EXPORTER_OTLP_METRICS_ENDPOINT
 *
 * === TRUST ATTACKER-CONTROLLED SERVER ===
 * - NODE_TLS_REJECT_UNAUTHORIZED
 * - NODE_EXTRA_CA_CERTS
 *
 * === SWITCH TO ATTACKER-CONTROLLED PROJECT ===
 * - ANTHROPIC_FOUNDRY_RESOURCE
 * - ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN
 * - AWS_BEARER_TOKEN_BEDROCK
 */
export declare const SAFE_ENV_VARS: Set<string>;
//# sourceMappingURL=managedEnvConstants.d.ts.map