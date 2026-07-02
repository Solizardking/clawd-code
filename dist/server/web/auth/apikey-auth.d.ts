import type { IncomingMessage } from "http";
import type { Application, Request, Response, NextFunction } from "express";
import type { AuthAdapter, AuthUser } from "./adapter.js";
import { SessionStore } from "./adapter.js";
/**
 * API-key authentication adapter.
 *
 * Each user provides their own Anthropic API key on the login page.
 * The key is stored encrypted in the server-side session and is injected
 * as `ANTHROPIC_API_KEY` into every PTY spawned for that user.
 * The plaintext key is never sent to the browser after the login form POST.
 *
 * User identity is derived from the key itself (SHA-256 prefix), so two
 * sessions using the same key share the same userId and home directory.
 *
 * Optional env vars:
 *   ADMIN_USERS — comma-separated user IDs (SHA-256 prefixes) or API-key
 *                 prefixes that receive the admin role
 */
export declare class ApiKeyAdapter implements AuthAdapter {
    private readonly store;
    private readonly adminUsers;
    constructor(store: SessionStore);
    authenticate(req: IncomingMessage): AuthUser | null;
    setupRoutes(app: Application): void;
    requireAuth(req: Request, res: Response, next: NextFunction): void;
    private loadLoginPage;
}
//# sourceMappingURL=apikey-auth.d.ts.map