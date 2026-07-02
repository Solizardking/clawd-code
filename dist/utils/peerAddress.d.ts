/**
 * Peer address parsing — kept separate from peerRegistry.ts so that
 * SendMessageTool can import parseAddress without transitively loading
 * the bridge (axios) and UDS (fs, net) modules at tool-enumeration time.
 */
/** Parse a URI-style address into scheme + target. */
export declare function parseAddress(to: string): {
    scheme: 'uds' | 'bridge' | 'other';
    target: string;
};
//# sourceMappingURL=peerAddress.d.ts.map