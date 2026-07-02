import type { OAuthTokens } from '../../services/oauth/types.js';
/**
 * Shared post-token-acquisition logic. Saves tokens, fetches profile/roles,
 * and sets up the local auth state.
 */
export declare function installOAuthTokens(tokens: OAuthTokens): Promise<void>;
export declare function authLogin({ email, sso, console: useConsole, claudeai, }: {
    email?: string;
    sso?: boolean;
    console?: boolean;
    claudeai?: boolean;
}): Promise<void>;
export declare function authStatus(opts: {
    json?: boolean;
    text?: boolean;
}): Promise<void>;
export declare function authLogout(): Promise<void>;
//# sourceMappingURL=auth.d.ts.map