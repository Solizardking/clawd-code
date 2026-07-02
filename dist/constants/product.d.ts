export declare const PRODUCT_URL = "https://github.com/Solizardking/solana-clawd";
export declare const BASE_URL = "https://clawd.code";
/**
 * Determine the session environment based on session ID format and ingress URL.
 */
export declare function isStagingSession(sessionId?: string, ingressUrl?: string): boolean;
/**
 * Determine if we're in a local-dev environment for remote sessions.
 */
export declare function isLocalSession(sessionId?: string, ingressUrl?: string): boolean;
/**
 * Get the base URL for Clawd Code based on environment.
 */
export declare function getClawdBaseUrl(sessionId?: string, ingressUrl?: string): string;
/**
 * Get the full session URL for a remote session.
 */
export declare function getRemoteSessionUrl(sessionId: string, ingressUrl?: string): string;
//# sourceMappingURL=product.d.ts.map