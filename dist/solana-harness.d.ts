/**
 * Solana blockchain harness primitives.
 * Read-first JSON-RPC wrapper with explicit mutation gates for transaction paths.
 */
export declare const LAMPORTS_PER_SOL = 1000000000;
export declare const DEFAULT_SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
export type SolanaCluster = 'mainnet-beta' | 'devnet' | 'testnet' | 'localnet' | 'custom';
export type SolanaCommitment = 'processed' | 'confirmed' | 'finalized';
export interface SolanaHarnessConfig {
    rpcUrl: string;
    wsUrl?: string;
    cluster: SolanaCluster;
    commitment: SolanaCommitment;
    readOnly: boolean;
    liveTrading: boolean;
    operatorConfirmed: boolean;
    allowUnsafeRpc: boolean;
}
export interface RpcErrorPayload {
    code: number;
    message: string;
    data?: unknown;
}
export interface JsonRpcEnvelope<T> {
    jsonrpc: '2.0';
    id: number;
    result?: T;
    error?: RpcErrorPayload;
}
export interface RpcAccountInfo<TData = unknown> {
    lamports: number;
    owner: string;
    data: TData;
    executable: boolean;
    rentEpoch: number;
    space?: number;
}
export interface ProgramAccount<TData = unknown> {
    pubkey: string;
    account: RpcAccountInfo<TData>;
}
export interface SolanaSnapshot {
    cluster: SolanaCluster;
    rpcUrl: string;
    commitment: SolanaCommitment;
    readOnly: boolean;
    health?: string;
    version?: unknown;
    slot?: number;
    epochInfo?: unknown;
    latestBlockhash?: unknown;
    prioritizationFees?: unknown;
}
type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;
export declare function inferSolanaCluster(rpcUrl: string, explicit?: string): SolanaCluster;
export declare function normalizeCommitment(value: string | undefined): SolanaCommitment;
export declare function resolveSolanaHarnessConfig(env?: Record<string, string | undefined>): SolanaHarnessConfig;
export declare function isSolanaAddress(value: string | undefined): boolean;
export declare function shortAddress(value: string, left?: number, right?: number): string;
export declare function lamportsToSol(lamports: number): number;
export declare function formatSol(lamports: number): string;
export declare function isMutationRpcMethod(method: string): boolean;
export declare function canMutateSolana(config: SolanaHarnessConfig): boolean;
export declare class SolanaHarnessRpcClient {
    readonly config: SolanaHarnessConfig;
    private readonly fetchImpl;
    private id;
    constructor(config: SolanaHarnessConfig, fetchImpl?: FetchLike);
    request<T = unknown>(method: string, params?: unknown[], timeoutMs?: number): Promise<T>;
    getHealth(): Promise<string>;
    getVersion(): Promise<unknown>;
    getSlot(): Promise<number>;
    getEpochInfo(): Promise<unknown>;
    getLatestBlockhash(): Promise<unknown>;
    getBalance(address: string): Promise<{
        value: number;
    }>;
    getAccountInfo<TData = unknown>(address: string, encoding?: string): Promise<{
        value: RpcAccountInfo<TData> | null;
    }>;
    getTransaction(signature: string): Promise<unknown>;
    getSignaturesForAddress(address: string, limit?: number): Promise<unknown[]>;
    getProgramAccounts(programId: string): Promise<ProgramAccount[]>;
    getTokenSupply(mint: string): Promise<unknown>;
    getTokenLargestAccounts(mint: string): Promise<unknown>;
    getTokenAccountsByOwner(owner: string, filter: {
        mint?: string;
        programId?: string;
    }): Promise<unknown>;
    getRecentPrioritizationFees(addresses?: string[]): Promise<unknown>;
    requestAirdrop(address: string, sol: number): Promise<string>;
    simulateTransaction(base64Transaction: string): Promise<unknown>;
    sendRawTransaction(base64Transaction: string): Promise<string>;
}
export declare function collectSolanaSnapshot(client: SolanaHarnessRpcClient): Promise<SolanaSnapshot>;
export {};
//# sourceMappingURL=solana-harness.d.ts.map