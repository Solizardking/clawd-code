/**
 * /x402 command implementation
 *
 * Manages x402 wallet configuration for HTTP 402 crypto payments.
 *
 * Subcommands:
 *   /x402 setup     - Generate a new wallet or import an existing private key
 *   /x402 status    - Show wallet address, balance, and payment history
 *   /x402 enable    - Enable x402 payments
 *   /x402 disable   - Disable x402 payments
 *   /x402 set-limit - Set per-request or session spend limits
 *   /x402 network   - Switch blockchain network
 *   /x402 remove    - Remove wallet and disable payments
 *   /x402           - Show help
 */
import type { LocalCommandCall } from '../../types/command.js';
export declare const call: LocalCommandCall;
//# sourceMappingURL=x402.d.ts.map