/**
 * Clawd Code — Cheshire Terminal Agent Arena Client
 * On-chain Solana agent identity (Metaplex Core NFTs), discovery, hiring,
 * and ATOM reputation — all via cheshireterminal.ai REST API.
 *
 * Identity scheme: svm://solana-mainnet/<metaplex-core-asset-address>
 */
export declare const CLAWD_MINT = "8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump";
export interface ArenaService {
    name: 'x402' | 'A2A' | 'MCP' | 'OASF' | 'web' | string;
    endpoint: string;
    version?: string;
}
export interface MintParams {
    name: string;
    walletAddress: string;
    description: string;
    capabilities?: string[];
    image?: string;
}
export interface MintResult {
    assetAddress: string;
    mintSignature: string;
    globalId: string;
    network: string;
    ownerWallet: string;
    status: string;
}
export interface RegisterParams {
    assetAddress: string;
    walletAddress: string;
    name: string;
    description: string;
    capabilities?: string[];
    services?: ArenaService[];
    pricing?: {
        per_task?: number;
        currency?: string;
        mint?: string;
    };
    agentWallet?: string;
    supportedTrust?: string[];
    a2a?: boolean;
    mcp?: boolean;
    image?: string;
}
export interface RegisterResult {
    assetAddress: string;
    globalId: string;
    registerSignature: string;
    profileUrl: string;
    a2aCardUrl?: string;
    mcpServerCardUrl?: string;
    status: string;
}
export interface AgentProfile {
    name: string;
    description: string;
    capabilities: string[];
    services: ArenaService[];
    agentWallet?: string;
    globalId?: string;
    reputation?: {
        score: number;
        reviewCount: number;
    };
    a2aCardUrl?: string;
    mcpServerCardUrl?: string;
}
export interface ReviewParams {
    agentGlobalId: string;
    score: number;
    tag1?: string;
    tag2?: string;
    feedbackNote?: string;
    proofOfPayment: {
        txSignature: string;
        fromWallet: string;
        toWallet: string;
        network?: string;
        mint?: string;
    };
}
export declare class ArenaClient {
    private get;
    private post;
    mint(params: MintParams): Promise<MintResult>;
    register(params: RegisterParams): Promise<RegisterResult>;
    fetch(assetAddress: string): Promise<AgentProfile>;
    review(params: ReviewParams): Promise<{
        ok: boolean;
        message?: string;
    }>;
    health(): Promise<{
        ok: boolean;
    }>;
    globalId(assetAddress: string): string;
}
export declare const arena: ArenaClient;
//# sourceMappingURL=arena.d.ts.map