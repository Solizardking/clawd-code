/**
 * Clawd Code - Solana blockchain harness mode.
 * Read-first RPC operations plus Z.AI-assisted planning/explanation.
 */
import { type ZaiReasoningEffort, type ZaiThinkingType } from '../zai.js';
interface ChainConfig {
    rpcUrl?: string;
    zaiApiKey?: string;
    zaiBaseUrl?: string;
    zaiThinking?: ZaiThinkingType;
    zaiReasoningEffort?: ZaiReasoningEffort;
    model?: string;
    liveTrading?: boolean;
    operatorConfirmed?: boolean;
}
export declare class ChainMode {
    private readonly config;
    private readonly harnessConfig;
    private readonly client;
    constructor(config?: ChainConfig);
    run(args: string[]): Promise<void>;
    private showStatus;
    private showBalance;
    private showAccount;
    private showTransaction;
    private showSignatures;
    private showProgram;
    private showToken;
    private showTokenAccounts;
    private showFees;
    private showBlockhash;
    private airdrop;
    private simulate;
    private sendRaw;
    private rawRpc;
    private askZai;
    private resolveAddress;
    private flag;
    private numberFlag;
    private parseJsonParams;
    private summarizeData;
    private getNested;
    private isKnownReadRpc;
    private printHelp;
}
export {};
//# sourceMappingURL=chain.d.ts.map