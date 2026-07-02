/**
 * x402 Protocol Types
 *
 * Implements the x402 HTTP 402 Payment Required protocol for machine-to-machine
 * crypto payments (USDC on Base). See: https://github.com/coinbase/x402
 */
/** Header names used in the x402 protocol */
export const X402_HEADERS = {
    /** Server → Client: Payment requirement details (JSON) */
    PAYMENT_REQUIRED: 'x-payment-required',
    /** Client → Server: Signed payment payload (base64 JSON) */
    PAYMENT: 'x-payment',
};
/** Default facilitator URLs by network */
export const DEFAULT_FACILITATOR_URLS = {
    'base': 'https://x402.org/facilitator',
    'base-sepolia': 'https://x402.org/facilitator',
    'ethereum': 'https://x402.org/facilitator',
    'ethereum-sepolia': 'https://x402.org/facilitator',
};
/** USDC contract addresses by network */
export const USDC_ADDRESSES = {
    'base': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    'base-sepolia': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    'ethereum': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    'ethereum-sepolia': '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
};
/** Default configuration values */
export const X402_DEFAULTS = {
    enabled: false,
    network: 'base',
    maxPaymentPerRequestUSD: 0.10,
    maxSessionSpendUSD: 5.00,
};
//# sourceMappingURL=types.js.map