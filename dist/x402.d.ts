/**
 * Clawd Code — x402 Payment Integration
 * Autonomous commerce via HTTP 402 payments
 */
export interface X402RequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
    amount?: number;
    destination?: string;
}
export declare class X402Client {
    private gatewayUrl;
    private paymentSecret;
    constructor(configPath?: string);
    /**
     * Build the request URL and headers for an x402-gated call (pure, testable).
     */
    buildRequest(endpoint: string, options?: X402RequestOptions): {
        url: string;
        init: RequestInit;
    };
    /**
     * Make a payment-gated request to any x402-enabled endpoint
     */
    request<T>(endpoint: string, options?: X402RequestOptions): Promise<T>;
    /**
     * Pay for a service and get a session token
     */
    payAndGetToken(service: string, amount: number): Promise<string>;
    /**
     * Check if a wallet has sufficient balance for a payment
     */
    checkBalance(walletAddress: string, requiredAmount: number): Promise<boolean>;
}
export declare const x402: X402Client;
//# sourceMappingURL=x402.d.ts.map