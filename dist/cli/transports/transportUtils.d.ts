import { URL } from 'url';
import type { Transport } from './Transport.js';
/**
 * Helper function to get the appropriate transport for a URL.
 *
 * Transport selection priority:
 * 1. SSETransport (SSE reads + POST writes) when CLAUDE_CODE_USE_CCR_V2 is set
 * 2. HybridTransport (WS reads + POST writes) when CLAUDE_CODE_POST_FOR_SESSION_INGRESS_V2 is set
 * 3. WebSocketTransport (WS reads + WS writes) — default
 */
export declare function getTransportForUrl(url: URL, headers?: Record<string, string>, sessionId?: string, refreshHeaders?: () => Record<string, string>): Transport;
//# sourceMappingURL=transportUtils.d.ts.map