import type { IncomingMessage } from "http";
import type { Application, Request, Response, NextFunction } from "express";
import type { AuthAdapter, AuthUser } from "./adapter.js";
/**
 * Token auth — the original single-token mode.
 *
 * If `AUTH_TOKEN` is set, callers must supply a matching token via the
 * `?token=` query parameter (WebSocket) or `Authorization: Bearer <token>`
 * header (HTTP). When `AUTH_TOKEN` is unset every caller is admitted as the
 * built-in "default" admin user.
 *
 * All callers share the same user identity. Use this provider for single-
 * user or trusted-network deployments where you just want a simple password.
 */
export declare class TokenAuthAdapter implements AuthAdapter {
    private readonly token;
    private readonly adminUsers;
    constructor();
    authenticate(req: IncomingMessage): AuthUser | null;
    setupRoutes(_app: Application): void;
    requireAuth(req: Request, res: Response, next: NextFunction): void;
    private extractToken;
}
//# sourceMappingURL=token-auth.d.ts.map