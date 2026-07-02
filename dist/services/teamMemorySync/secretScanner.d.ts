/**
 * Client-side secret scanner for team memory (PSR M22174).
 *
 * Scans content for credentials before upload so secrets never leave the
 * user's machine. Uses a curated subset of high-confidence rules from
 * gitleaks (https://github.com/gitleaks/gitleaks, MIT license) — only
 * rules with distinctive prefixes that have near-zero false-positive
 * rates are included. Generic keyword-context rules are omitted.
 *
 * Rule IDs and regexes sourced directly from the public gitleaks config:
 * https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml
 *
 * JS regex notes:
 *   - gitleaks uses Go regex; inline (?i) and mode groups (?-i:...) are
 *     not portable to JS. Affected rules are rewritten with explicit
 *     character classes ([a-zA-Z0-9] instead of (?i)[a-z0-9]).
 *   - Trailing boundary alternations like (?:[\x60'"\s;]|\\[nr]|$) from
 *     Go regex are kept (JS $ matches end-of-string in default mode).
 */
export type SecretMatch = {
    /** Gitleaks rule ID that matched (e.g., "github-pat", "aws-access-token") */
    ruleId: string;
    /** Human-readable label derived from the rule ID */
    label: string;
};
/**
 * Scan a string for potential secrets.
 *
 * Returns one match per rule that fired (deduplicated by rule ID). The
 * actual matched text is intentionally NOT returned — we never log or
 * display secret values.
 */
export declare function scanForSecrets(content: string): SecretMatch[];
/**
 * Get a human-readable label for a gitleaks rule ID.
 * Falls back to kebab-to-Title conversion for unknown IDs.
 */
export declare function getSecretLabel(ruleId: string): string;
export declare function redactSecrets(content: string): string;
//# sourceMappingURL=secretScanner.d.ts.map