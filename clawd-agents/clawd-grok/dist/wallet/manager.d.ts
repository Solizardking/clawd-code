import type { PaymentChain } from "../utils/settings";
import type { WalletBalance, WalletData } from "./types";
export interface StoredWallet {
    privateKey: `0x${string}`;
    address: string;
    chain: PaymentChain;
    createdAt: string;
}
export declare class WalletManager {
    static exists(): boolean;
    init(chain?: PaymentChain): WalletData;
    getWalletData(): WalletData;
    getStoredWallet(): StoredWallet;
    getBalance(): Promise<WalletBalance>;
}
