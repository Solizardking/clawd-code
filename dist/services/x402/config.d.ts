/**
 * x402 Wallet Configuration
 *
 * Manages wallet configuration and private key storage for x402 payments.
 * Private keys are stored in the user's global config (~/.claude/config.json)
 * and never logged or transmitted.
 */
import { type PaymentNetwork, type X402WalletConfig } from './types.js';
/** Retrieves x402 config from global config */
export declare function getX402Config(): X402WalletConfig;
/** Retrieves the private key from environment or global config */
export declare function getX402PrivateKey(): string | undefined;
/** Checks if x402 payments are configured and enabled */
export declare function isX402Enabled(): boolean;
/** Saves x402 wallet configuration */
export declare function saveX402Config(updates: Partial<X402WalletConfig>): void;
/**
 * Saves a private key and derives + stores the wallet address.
 * The private key is stored encrypted-at-rest via the global config's
 * file permissions (600).
 */
export declare function saveX402PrivateKey(privateKeyHex: string): string;
/** Removes the private key and disables x402 */
export declare function removeX402PrivateKey(): void;
/** Gets the wallet address without exposing the private key */
export declare function getX402WalletAddress(): string | undefined;
/**
 * Generates a new random private key for x402 payments.
 * Returns the hex-encoded key (with 0x prefix).
 */
export declare function generateX402PrivateKey(): string;
/** Updates the payment network */
export declare function setX402Network(network: PaymentNetwork): void;
/** Updates max per-request payment limit */
export declare function setX402MaxPayment(amountUSD: number): void;
/** Updates max session spend limit */
export declare function setX402MaxSessionSpend(amountUSD: number): void;
//# sourceMappingURL=config.d.ts.map