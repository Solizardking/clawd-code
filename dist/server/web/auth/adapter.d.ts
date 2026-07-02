import type { IncomingMessage, ServerResponse } from "http";
import type { Application, Request, Response, NextFunction } from "express";
export interface AuthUser {
    id: string;
    email?: string;
    name?: string;
    isAdmin: boolean;
    /** Decrypted Anthropic API key (only present for apikey auth provider) */
    apiKey?: string;
}
export interface SessionData {
    userId: string;
    email?: string;
    name?: string;
    isAdmin: boolean;
    /** AES-256-GCM encrypted Anthropic API key */
    encryptedApiKey?: string;
    createdAt: number;
    expiresAt: number;
}
/** Augmented Express request with authenticated user attached. */
export interface AuthenticatedRequest extends Request {
    user: AuthUser;
}
/** Auth adapter — pluggable authentication strategy. */
export interface AuthAdapter {
    /**
     * Authenticate an IncomingMessage (HTTP or WebSocket upgrade).
     * Returns null when the request is unauthenticated.
     */
    authenticate(req: IncomingMessage): AuthUser | null;
    /**
     * Register login/callback/logout routes on the Express app.
     * Called once during server startup before any requests arrive.
     */
    setupRoutes(app: Application): void;
    /**
     * Express middleware that rejects unauthenticated requests.
     * For browser clients it redirects to /auth/login; for API clients it
     * returns 401 JSON.
     */
    requireAuth(req: Request, res: Response, next: NextFunction): void;
}
/**
 * In-memory server-side session store.
 *
 * Sessions are identified by a random UUID stored in a signed HttpOnly cookie.
 * Sensitive values (API keys) are stored encrypted with AES-256-GCM.
 */
export declare class SessionStore {
    private readonly sessions;
    /** 32-byte key derived from the session secret. */
    private readonly key;
    constructor(secret: string);
    create(data: Omit<SessionData, "createdAt" | "expiresAt">): string;
    get(id: string): SessionData | undefined;
    delete(id: string): void;
    sign(id: string): string;
    /**
     * Verifies the HMAC and returns the raw session ID, or null on failure.
     * Uses constant-time comparison to prevent timing attacks.
     */
    unsign(signed: string): string | null;
    /** Returns the session data for the current request, or null. */
    getFromRequest(req: IncomingMessage): SessionData | null;
    /** Returns the raw session ID from the request cookie, or null. */
    getIdFromRequest(req: IncomingMessage): string | null;
    setCookie(res: ServerResponse, sessionId: string): void;
    clearCookie(res: ServerResponse): void;
    /** Encrypts a plaintext string with AES-256-GCM for session storage. */
    encrypt(plaintext: string): string;
    /** Decrypts a value produced by {@link encrypt}. Returns null on failure. */
    decrypt(encoded: string): string | null;
    private cleanup;
}
//# sourceMappingURL=adapter.d.ts.map