/**
 * `claude mcp xaa` — manage the XAA (SEP-990) IdP connection.
 *
 * The IdP connection is user-level: configure once, all XAA-enabled MCP
 * servers reuse it. Lives in settings.xaaIdp (non-secret) + a keychain slot
 * keyed by issuer (secret). Separate trust domain from per-server AS secrets.
 */
import type { Command } from '@commander-js/extra-typings';
export declare function registerMcpXaaIdpCommand(mcp: Command): void;
//# sourceMappingURL=xaaIdpCommand.d.ts.map