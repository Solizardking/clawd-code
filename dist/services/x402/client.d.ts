/**
 * x402 Payment Client
 *
 * Handles the x402 payment protocol flow:
 * 1. Parse 402 response headers for payment requirements
 * 2. Validate payment amounts against configured limits
 * 3. Sign EIP-3009 transferWithAuthorization via EIP-712
 * 4. Construct payment header for retry
 */
import { type PaymentNetwork, type PaymentPayload, type PaymentRequirement, type X402PaymentRecord } from './types.js';
/**
 * Parse the X-Payment-Required header from a 402 response.
 */
export declare function parsePaymentRequirement(headerValue: string): PaymentRequirement;
/**
 * Validate that a payment requirement is within configured limits.
 */
export declare function validatePaymentRequirement(requirement: PaymentRequirement, sessionSpentUSD: number): {
    valid: boolean;
    reason?: string;
};
/**
 * Create a signed x402 payment payload for a given requirement.
 */
export declare function createPayment(requirement: PaymentRequirement, fromAddress: string, privateKeyHex: string): PaymentPayload;
/**
 * Encode a payment payload as a base64 string for the X-Payment header.
 */
export declare function encodePaymentHeader(payload: PaymentPayload): string;
/**
 * Handle a 402 response by creating and encoding a payment.
 * Returns the payment header value, or null if payment is not possible.
 */
export declare function handlePaymentRequired(headerValue: string, sessionSpentUSD: number): {
    paymentHeader: string;
    record: X402PaymentRecord;
} | null;
/**
 * Get the facilitator URL for a given network.
 */
export declare function getFacilitatorUrl(network: PaymentNetwork): string;
//# sourceMappingURL=client.d.ts.map