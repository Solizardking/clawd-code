export type Platform = 'macos' | 'windows' | 'wsl' | 'linux' | 'unknown';
export declare const SUPPORTED_PLATFORMS: Platform[];
export declare const getPlatform: any;
export declare const getWslVersion: any;
export type LinuxDistroInfo = {
    linuxDistroId?: string;
    linuxDistroVersion?: string;
    linuxKernel?: string;
};
export declare const getLinuxDistroInfo: any;
export declare function detectVcs(dir?: string): Promise<string[]>;
//# sourceMappingURL=platform.d.ts.map