/**
 * x402 Payment Fetch Wrapper
 *
 * Wraps fetch (or axios) to automatically handle HTTP 402 Payment Required
 * responses using the x402 protocol. When a 402 is received:
 *
 * 1. Parse the X-Payment-Required header
 * 2. Validate against spending limits
 * 3. Sign a payment authorization
 * 4. Retry the request with the X-Payment header
 *
 * This integrates at the fetch level so it works transparently with
 * both the Anthropic SDK client and the WebFetchTool.
 */
import type { AxiosInstance } from 'axios';
/**
 * Create a fetch wrapper that intercepts 402 responses and handles x402 payment.
 *
 * Usage with the Anthropic SDK client:
 *   const wrappedFetch = wrapFetchWithX402(originalFetch)
 *   // Pass wrappedFetch as the `fetch` option to the SDK
 *
 * @param innerFetch - The underlying fetch function to wrap
 * @returns A fetch-compatible function with x402 payment handling
 */
export declare function wrapFetchWithX402(innerFetch: typeof globalThis.fetch): typeof globalThis.fetch;
/**
 * Add x402 payment interceptor to an axios instance.
 *
 * Usage with WebFetchTool's axios:
 *   addX402AxiosInterceptor(axiosInstance)
 *
 * @param instance - The axios instance to add the interceptor to
 */
export declare function addX402AxiosInterceptor(instance: AxiosInstance): void;
//# sourceMappingURL=paymentFetch.d.ts.map