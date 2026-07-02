/**
 * x402 Payment Service
 *
 * Public API for the x402 integration. Provides payment handling for
 * HTTP 402 responses using the x402 protocol (USDC on Base).
 *
 * @see https://github.com/coinbase/x402
 */
export { generateX402PrivateKey, getX402Config, getX402PrivateKey, getX402WalletAddress, isX402Enabled, removeX402PrivateKey, saveX402Config, saveX402PrivateKey, setX402MaxPayment, setX402MaxSessionSpend, setX402Network, } from './config.js';
export { createPayment, encodePaymentHeader, getFacilitatorUrl, handlePaymentRequired, parsePaymentRequirement, validatePaymentRequirement, } from './client.js';
export { addX402AxiosInterceptor, wrapFetchWithX402, } from './paymentFetch.js';
export { addX402Payment, formatX402Cost, getX402PaymentCount, getX402SessionPayments, getX402SessionSpentUSD, resetX402SessionPayments, } from './tracker.js';
export type { PaymentNetwork, PaymentPayload, PaymentRequirement, PaymentScheme, X402PaymentRecord, X402WalletConfig, } from './types.js';
//# sourceMappingURL=index.d.ts.map