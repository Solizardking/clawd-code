import type { OAuthTokens } from './types.js';
/**
 * OAuth service that handles the OAuth 2.0 authorization code flow with PKCE.
 *
 * Supports two ways to get authorization codes:
 * 1. Automatic: Opens browser, redirects to localhost where we capture the code
 * 2. Manual: User manually copies and pastes the code (used in non-browser environments)
 */
export declare class OAuthService {
    private codeVerifier;
    private authCodeListener;
    private port;
    private manualAuthCodeResolver;
    constructor();
    startOAuthFlow(authURLHandler: (url: string, automaticUrl?: string) => Promise<void>, options?: {
        loginWithClaudeAi?: boolean;
        inferenceOnly?: boolean;
        expiresIn?: number;
        orgUUID?: string;
        loginHint?: string;
        loginMethod?: string;
        /**
         * Don't call openBrowser(). Caller takes both URLs via authURLHandler
         * and decides how/where to open them. Used by the SDK control protocol
         * (claude_authenticate) where the SDK client owns the user's display,
         * not this process.
         */
        skipBrowserOpen?: boolean;
    }): Promise<OAuthTokens>;
    private waitForAuthorizationCode;
    handleManualAuthCodeInput(params: {
        authorizationCode: string;
        state: string;
    }): void;
    private formatTokens;
    cleanup(): void;
}
//# sourceMappingURL=index.d.ts.map