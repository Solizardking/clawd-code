export declare function registerPairingCode(userId: number): string;
export declare function approvePairingCode(code: string): {
    ok: true;
    userId: number;
} | {
    ok: false;
    error: string;
};
export declare function clearPairingStore(): void;
