export type WalletRecord = {
    name: string;
    publicKey: string;
    path: string;
};
export declare function createWallet(name?: string): WalletRecord;
export declare function listWallets(): WalletRecord[];
//# sourceMappingURL=wallet.d.ts.map