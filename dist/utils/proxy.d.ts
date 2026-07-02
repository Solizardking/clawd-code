import { type AxiosInstance } from 'axios';
import type { LookupOptions } from 'dns';
import type { Agent } from 'http';
import { type HttpsProxyAgentOptions } from 'https-proxy-agent';
import type * as undici from 'undici';
import { type TLSConfig } from './mtls.js';
export declare function disableKeepAlive(): void;
export declare function _resetKeepAliveForTesting(): void;
/**
 * Convert dns.LookupOptions.family to a numeric address family value
 * Handles: 0 | 4 | 6 | 'IPv4' | 'IPv6' | undefined
 */
export declare function getAddressFamily(options: LookupOptions): 0 | 4 | 6;
type EnvLike = Record<string, string | undefined>;
/**
 * Get the active proxy URL if one is configured
 * Prefers lowercase variants over uppercase (https_proxy > HTTPS_PROXY > http_proxy > HTTP_PROXY)
 * @param env Environment variables to check (defaults to process.env for production use)
 */
export declare function getProxyUrl(env?: EnvLike): string | undefined;
/**
 * Get the NO_PROXY environment variable value
 * Prefers lowercase over uppercase (no_proxy > NO_PROXY)
 * @param env Environment variables to check (defaults to process.env for production use)
 */
export declare function getNoProxy(env?: EnvLike): string | undefined;
/**
 * Check if a URL should bypass the proxy based on NO_PROXY environment variable
 * Supports:
 * - Exact hostname matches (e.g., "localhost")
 * - Domain suffix matches with leading dot (e.g., ".example.com")
 * - Wildcard "*" to bypass all
 * - Port-specific matches (e.g., "example.com:8080")
 * - IP addresses (e.g., "127.0.0.1")
 * @param urlString URL to check
 * @param noProxy NO_PROXY value (defaults to getNoProxy() for production use)
 */
export declare function shouldBypassProxy(urlString: string, noProxy?: string | undefined): boolean;
/**
 * Axios instance with its own proxy agent. Same NO_PROXY/mTLS/CA
 * resolution as the global interceptor, but agent options stay
 * scoped to this instance.
 */
export declare function createAxiosInstance(extra?: HttpsProxyAgentOptions<string>): AxiosInstance;
/**
 * Get or create a memoized proxy agent for the given URI
 * Now respects NO_PROXY environment variable
 */
export declare const getProxyAgent: any;
/**
 * Get an HTTP agent configured for WebSocket proxy support
 * Returns undefined if no proxy is configured or URL should bypass proxy
 */
export declare function getWebSocketProxyAgent(url: string): Agent | undefined;
/**
 * Get the proxy URL for WebSocket connections under Bun.
 * Bun's native WebSocket supports a `proxy` string option instead of Node's `agent`.
 * Returns undefined if no proxy is configured or URL should bypass proxy.
 */
export declare function getWebSocketProxyUrl(url: string): string | undefined;
/**
 * Get fetch options for the Anthropic SDK with proxy and mTLS configuration
 * Returns fetch options with appropriate dispatcher for proxy and/or mTLS
 *
 * @param opts.forAnthropicAPI - Enables ANTHROPIC_UNIX_SOCKET tunneling. This
 *   env var is set by `claude ssh` on the remote CLI to route API calls through
 *   an ssh -R forwarded unix socket to a local auth proxy. It MUST NOT leak
 *   into non-Anthropic-API fetch paths (MCP HTTP/SSE transports, etc.) or those
 *   requests get misrouted to api.anthropic.com. Only the Anthropic SDK client
 *   should pass `true` here.
 */
export declare function getProxyFetchOptions(opts?: {
    forAnthropicAPI?: boolean;
}): {
    tls?: TLSConfig;
    dispatcher?: undici.Dispatcher;
    proxy?: string;
    unix?: string;
    keepalive?: false;
};
export declare function configureGlobalAgents(): void;
/**
 * Get AWS SDK client configuration with proxy support
 * Returns configuration object that can be spread into AWS service client constructors
 */
export declare function getAWSClientProxyConfig(): Promise<object>;
/**
 * Clear proxy agent cache.
 */
export declare function clearProxyCache(): void;
export {};
//# sourceMappingURL=proxy.d.ts.map