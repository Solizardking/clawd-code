/**
 * Wraps a raw GitHub token so that its string representation is redacted.
 * `String(token)`, template literals, `JSON.stringify(token)`, and any
 * attached error messages will show `[REDACTED:gh-token]` instead of the
 * token value. Call `.reveal()` only at the single point where the raw
 * value is placed into an HTTP body.
 */
export declare class RedactedGithubToken {
    #private;
    constructor(raw: string);
    reveal(): string;
    toString(): string;
    toJSON(): string;
}
export type ImportTokenResult = {
    github_username: string;
};
export type ImportTokenError = {
    kind: 'not_signed_in';
} | {
    kind: 'invalid_token';
} | {
    kind: 'server';
    status: number;
} | {
    kind: 'network';
};
/**
 * POSTs a GitHub token to the CCR backend, which validates it against
 * GitHub's /user endpoint and stores it Fernet-encrypted in sync_user_tokens.
 * The stored token satisfies the same read paths as an OAuth token, so
 * clone/push in claude.ai/code works immediately after this succeeds.
 */
export declare function importGithubToken(token: RedactedGithubToken): Promise<{
    ok: true;
    result: ImportTokenResult;
} | {
    ok: false;
    error: ImportTokenError;
}>;
/**
 * Best-effort default environment creation. Mirrors the web onboarding's
 * DEFAULT_CLOUD_ENVIRONMENT_REQUEST so a first-time user lands on the
 * composer instead of env-setup. Checks for existing environments first
 * so re-running /web-setup doesn't pile up duplicates. Failures are
 * non-fatal — the token import already succeeded, and the web state
 * machine falls back to env-setup on next load.
 */
export declare function createDefaultEnvironment(): Promise<boolean>;
/** Returns true when the user has valid Claude OAuth credentials. */
export declare function isSignedIn(): Promise<boolean>;
export declare function getCodeWebUrl(): string;
//# sourceMappingURL=api.d.ts.map