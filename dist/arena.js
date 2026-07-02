/**
 * Clawd Code — Cheshire Terminal Agent Arena Client
 * On-chain Solana agent identity (Metaplex Core NFTs), discovery, hiring,
 * and ATOM reputation — all via cheshireterminal.ai REST API.
 *
 * Identity scheme: svm://solana-mainnet/<metaplex-core-asset-address>
 */
const CT_BASE = 'https://cheshireterminal.ai/api/metaplex-agents';
export const CLAWD_MINT = '8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump';
// ── Client ───────────────────────────────────────────────────────────────────
export class ArenaClient {
    async get(path) {
        const res = await fetch(`${CT_BASE}${path}`);
        if (!res.ok)
            throw new Error(`CT ${res.status}: ${await res.text()}`);
        return res.json();
    }
    async post(path, body) {
        const res = await fetch(`${CT_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok)
            throw new Error(`CT ${res.status}: ${await res.text()}`);
        return res.json();
    }
    async mint(params) {
        return this.post('/mint', { network: 'mainnet-beta', ...params });
    }
    async register(params) {
        return this.post('/register', params);
    }
    async fetch(assetAddress) {
        return this.get(`/fetch/${assetAddress}`);
    }
    async review(params) {
        return this.post('/review', {
            ...params,
            proofOfPayment: {
                network: 'solana-mainnet',
                mint: CLAWD_MINT,
                ...params.proofOfPayment,
            },
        });
    }
    async health() {
        const res = await fetch('https://cheshireterminal.ai/api/developer/status');
        return { ok: res.ok };
    }
    globalId(assetAddress) {
        return `svm://solana-mainnet/${assetAddress}`;
    }
}
export const arena = new ArenaClient();
//# sourceMappingURL=arena.js.map