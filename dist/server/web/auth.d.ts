import type { IncomingMessage } from "http";
/**
 * Validates the auth token from a WebSocket upgrade request.
 * If AUTH_TOKEN is not set, all connections are allowed.
 */
export declare function validateAuthToken(req: IncomingMessage): boolean;
/**
 * Simple per-IP rate limiter for new connections.
 */
export declare class ConnectionRateLimiter {
    private attempts;
    private readonly maxPerWindow;
    private readonly windowMs;
    constructor(maxPerWindow?: number, windowMs?: number);
    /**
     * Returns true if the connection should be allowed.
     */
    allow(ip: string): boolean;
    /**
     * Periodically clean up stale entries.
     */
    cleanup(): void;
}
//# sourceMappingURL=auth.d.ts.map