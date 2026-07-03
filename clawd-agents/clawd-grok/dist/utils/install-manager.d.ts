export declare const CLAWD_GITHUB_REPO = "superagent-ai/grok-cli";
export declare const CLAWD_RELEASES_API = "https://api.github.com/repos/superagent-ai/grok-cli/releases";
export declare const SCRIPT_INSTALL_METHOD = "script";
interface ReleaseTarget {
    key: string;
    assetName: string;
    binaryName: string;
}
interface InstallMetadata {
    schemaVersion?: number;
    installMethod?: string;
    version: string;
    repo: string;
    binaryPath: string;
    installDir: string;
    assetName: string;
    target: string;
    installedAt: string;
    method?: string;
    shellConfigPath?: string;
    pathCommand?: string;
}
interface UninstallPlan {
    removePaths: string[];
    pruneDirs: string[];
}
interface UpdateResult {
    success: boolean;
    output: string;
}
export declare function getClawdUserDir(homeDir?: string): string;
export declare function getScriptInstallDir(homeDir?: string): string;
export declare function getInstallMetadataPath(homeDir?: string): string;
export declare function getReleaseTargetForPlatform(platform?: string, arch?: string): ReleaseTarget | null;
export declare function loadScriptInstallMetadata(homeDir?: string): InstallMetadata | null;
export declare function saveScriptInstallMetadata(meta: Omit<InstallMetadata, "method"> & Record<string, unknown>, homeDir?: string): void;
interface ScriptInstallContext {
    metadata: InstallMetadata;
    currentVersion: string;
    target: ReleaseTarget;
    binaryPath: string;
    installDir: string;
}
export declare function getScriptInstallContext(homeDir?: string): ScriptInstallContext | null;
export declare function parseChecksumsFile(text: string): Map<string, string>;
export declare function fetchLatestReleaseVersion(): Promise<string | null>;
export declare function fetchChecksums(url: string): Promise<Map<string, string>>;
export declare function runScriptManagedUpdate(currentVersion: string): Promise<UpdateResult>;
export declare function buildScriptUninstallPlan(options: {
    keepConfig?: boolean;
    keepData?: boolean;
}, homeDir?: string): UninstallPlan | null;
export declare function runScriptManagedUninstall(options: {
    dryRun?: boolean;
    force?: boolean;
    keepConfig?: boolean;
    keepData?: boolean;
}, homeDir?: string): Promise<UpdateResult>;
export {};
