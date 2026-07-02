type Platform = 'win32' | 'darwin' | 'linux';
export declare const getGlobalClaudeFile: any;
/**
 * Checks if we're running via Conductor
 * @returns true if running via Conductor, false otherwise
 */
declare function isConductor(): boolean;
export declare const JETBRAINS_IDES: string[];
/**
 * Detects the deployment environment/platform based on environment variables
 * @returns The deployment platform name, or 'unknown' if not detected
 */
export declare const detectDeploymentEnvironment: any;
declare function isSSHSession(): boolean;
export declare const env: {
    hasInternetAccess: any;
    isCI: boolean;
    platform: Platform;
    arch: NodeJS.Architecture;
    nodeVersion: string;
    terminal: string | null;
    isSSH: typeof isSSHSession;
    getPackageManagers: any;
    getRuntimes: any;
    isRunningWithBun: any;
    isWslEnvironment: any;
    isNpmFromWindowsPath: any;
    isConductor: typeof isConductor;
    detectDeploymentEnvironment: any;
};
/**
 * Returns the host platform for analytics reporting.
 * If CLAUDE_CODE_HOST_PLATFORM is set to a valid platform value, that overrides
 * the detected platform. This is useful for container/remote environments where
 * process.platform reports the container OS but the actual host platform differs.
 */
export declare function getHostPlatformForAnalytics(): Platform;
export {};
//# sourceMappingURL=env.d.ts.map