declare function getIsBubblewrapSandbox(): boolean;
/**
 * Checks if the system is using MUSL libc instead of glibc.
 * In native linux builds, this is statically known at compile time via IS_LIBC_MUSL/IS_LIBC_GLIBC flags.
 * In node (unbundled), both flags are false and we fall back to a runtime async stat check
 * whose result is cached at module load. If the cache isn't populated yet, returns false.
 */
declare function isMuslEnvironment(): boolean;
export declare function getTerminalWithJetBrainsDetectionAsync(): Promise<string | null>;
export declare function getTerminalWithJetBrainsDetection(): string | null;
/**
 * Initialize JetBrains IDE detection asynchronously.
 * Call this early in app initialization to populate the cache.
 * After this resolves, getTerminalWithJetBrainsDetection() will return accurate results.
 */
export declare function initJetBrainsDetection(): Promise<void>;
export declare const envDynamic: {
    terminal: string | null;
    getIsDocker: any;
    getIsBubblewrapSandbox: typeof getIsBubblewrapSandbox;
    isMuslEnvironment: typeof isMuslEnvironment;
    getTerminalWithJetBrainsDetectionAsync: typeof getTerminalWithJetBrainsDetectionAsync;
    initJetBrainsDetection: typeof initJetBrainsDetection;
    hasInternetAccess: any;
    isCI: boolean;
    platform: "darwin" | "linux" | "win32";
    arch: NodeJS.Architecture;
    nodeVersion: string;
    isSSH: () => boolean;
    getPackageManagers: any;
    getRuntimes: any;
    isRunningWithBun: any;
    isWslEnvironment: any;
    isNpmFromWindowsPath: any;
    isConductor: () => boolean;
    detectDeploymentEnvironment: any;
};
export {};
//# sourceMappingURL=envDynamic.d.ts.map