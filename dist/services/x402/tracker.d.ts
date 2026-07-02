/**
 * x402 Payment Tracker
 *
 * Tracks x402 payments within a session for cost display and safety limits.
 * Integrates with the main cost tracking system.
 */
import type { X402PaymentRecord } from './types.js';
/** Add a payment record to the session tracker */
export declare function addX402Payment(record: X402PaymentRecord): void;
/** Get total USD spent via x402 in the current session */
export declare function getX402SessionSpentUSD(): number;
/** Get all payment records for the current session */
export declare function getX402SessionPayments(): readonly X402PaymentRecord[];
/** Get the count of payments in this session */
export declare function getX402PaymentCount(): number;
/** Reset session payment tracking (used on session switch) */
export declare function resetX402SessionPayments(): void;
/** Format x402 payment summary for display */
export declare function formatX402Cost(): string;
//# sourceMappingURL=tracker.d.ts.map