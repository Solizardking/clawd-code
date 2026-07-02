import type * as tls from 'tls';
import type * as undici from 'undici';
export type MTLSConfig = {
    cert?: string;
    key?: string;
    passphrase?: string;
};
export type TLSConfig = MTLSConfig & {
    ca?: string | string[] | Buffer;
};
/**
 * Get mTLS configuration from environment variables
 */
export declare const getMTLSConfig: any;
/**
 * Create an HTTPS agent with mTLS configuration
 */
export declare const getMTLSAgent: any;
/**
 * Get TLS options for WebSocket connections
 */
export declare function getWebSocketTLSOptions(): tls.ConnectionOptions | undefined;
/**
 * Get fetch options with TLS configuration (mTLS + CA certs) for undici
 */
export declare function getTLSFetchOptions(): {
    tls?: TLSConfig;
    dispatcher?: undici.Dispatcher;
};
/**
 * Clear the mTLS configuration cache.
 */
export declare function clearMTLSCache(): void;
/**
 * Configure global Node.js TLS settings
 */
export declare function configureGlobalMTLS(): void;
//# sourceMappingURL=mtls.d.ts.map