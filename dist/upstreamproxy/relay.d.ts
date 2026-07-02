/**
 * CONNECT-over-WebSocket relay for CCR upstreamproxy.
 *
 * Listens on localhost TCP, accepts HTTP CONNECT from curl/gh/kubectl/etc,
 * and tunnels bytes over WebSocket to the CCR upstreamproxy endpoint.
 * The CCR server-side terminates the tunnel, MITMs TLS, injects org-configured
 * credentials (e.g. DD-API-KEY), and forwards to the real upstream.
 *
 * WHY WebSocket and not raw CONNECT: CCR ingress is GKE L7 with path-prefix
 * routing; there's no connect_matcher in cdk-constructs. The session-ingress
 * tunnel (sessions/tunnel/v1alpha/tunnel.proto) already uses this pattern.
 *
 * Protocol: bytes are wrapped in UpstreamProxyChunk protobuf messages
 * (`message UpstreamProxyChunk { bytes data = 1; }`) for compatibility with
 * gateway.NewWebSocketStreamAdapter on the server side.
 */
/**
 * Encode an UpstreamProxyChunk protobuf message by hand.
 *
 * For `message UpstreamProxyChunk { bytes data = 1; }` the wire format is:
 *   tag = (field_number << 3) | wire_type = (1 << 3) | 2 = 0x0a
 *   followed by varint length, followed by the bytes.
 *
 * protobufjs would be the general answer; for a single-field bytes message
 * the hand encoding is 10 lines and avoids a runtime dep in the hot path.
 */
export declare function encodeChunk(data: Uint8Array): Uint8Array;
/**
 * Decode an UpstreamProxyChunk. Returns the data field, or null if malformed.
 * Tolerates the server sending a zero-length chunk (keepalive semantics).
 */
export declare function decodeChunk(buf: Uint8Array): Uint8Array | null;
export type UpstreamProxyRelay = {
    port: number;
    stop: () => void;
};
/**
 * Start the relay. Returns the ephemeral port it bound and a stop function.
 * Uses Bun.listen when available, otherwise Node's net.createServer — the CCR
 * container runs the CLI under Node, not Bun.
 */
export declare function startUpstreamProxyRelay(opts: {
    wsUrl: string;
    sessionId: string;
    token: string;
}): Promise<UpstreamProxyRelay>;
export declare function startNodeRelay(wsUrl: string, authHeader: string, wsAuthHeader: string): Promise<UpstreamProxyRelay>;
//# sourceMappingURL=relay.d.ts.map