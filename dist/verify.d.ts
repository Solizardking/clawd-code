/**
 * Clawd Code — Environment Verification & Preflight
 * (Adapted from clawd-grok/src/verify/environment.ts)
 *
 * Checks the default Z.AI key and optional provider keys.
 */
export interface VerifyResult {
    name: string;
    ok: boolean;
    message: string;
    remedy?: string;
}
export declare class EnvironmentVerifier {
    private results;
    /**
     * Run all preflight checks.
     */
    verifyAll(): Promise<VerifyResult[]>;
    private checkNodeVersion;
    private checkZaiKey;
    private checkXaiKeyOptional;
    /**
     * Live ping of https://api.x.ai/v1/models using XAI_API_KEY. Skipped if the
     * key is missing or the runtime can't reach the network. Reports the first
     * few model ids so the operator can confirm the account is on the right
     * tier (grok-4.x availability, etc.).
     */
    private checkXaiReachable;
    private checkHeliusRpc;
    private checkPhoenixUrl;
    private checkVulcanCli;
    private checkSafetyGates;
    private checkConfigFile;
    private checkWorkspace;
    /**
     * Print a verification report
     */
    printReport(results?: VerifyResult[]): {
        ok: boolean;
        failed: VerifyResult[];
    };
    /**
     * Load env file and re-check (must be called after loading)
     */
    static loadEnvFile(path?: string): Record<string, string>;
}
//# sourceMappingURL=verify.d.ts.map