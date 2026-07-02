import type { ServerResponse } from 'http';
/**
 * Temporary localhost HTTP server that listens for OAuth authorization code redirects.
 *
 * When the user authorizes in their browser, the OAuth provider redirects to:
 * http://localhost:[port]/callback?code=AUTH_CODE&state=STATE
 *
 * This server captures that redirect and extracts the auth code.
 * Note: This is NOT an OAuth server - it's just a redirect capture mechanism.
 */
export declare class AuthCodeListener {
    private localServer;
    private port;
    private promiseResolver;
    private promiseRejecter;
    private expectedState;
    private pendingResponse;
    private callbackPath;
    constructor(callbackPath?: string);
    /**
     * Starts listening on an OS-assigned port and returns the port number.
     * This avoids race conditions by keeping the server open until it's used.
     * @param port Optional specific port to use. If not provided, uses OS-assigned port.
     */
    start(port?: number): Promise<number>;
    getPort(): number;
    hasPendingResponse(): boolean;
    waitForAuthorization(state: string, onReady: () => Promise<void>): Promise<string>;
    /**
     * Completes the OAuth flow by redirecting the user's browser to a success page.
     * Different success pages are shown based on the granted scopes.
     * @param scopes The OAuth scopes that were granted
     * @param customHandler Optional custom handler to serve response instead of redirecting
     */
    handleSuccessRedirect(scopes: string[], customHandler?: (res: ServerResponse, scopes: string[]) => void): void;
    /**
     * Handles error case by sending a redirect to the appropriate success page with an error indicator,
     * ensuring the browser flow is completed properly.
     */
    handleErrorRedirect(): void;
    private startLocalListener;
    private handleRedirect;
    private validateAndRespond;
    private handleError;
    private resolve;
    private reject;
    close(): void;
}
//# sourceMappingURL=auth-code-listener.d.ts.map