import { type InstallMethod } from './config.js';
export type InstallationType = 'npm-global' | 'npm-local' | 'native' | 'package-manager' | 'development' | 'unknown';
export type DiagnosticInfo = {
    installationType: InstallationType;
    version: string;
    installationPath: string;
    invokedBinary: string;
    configInstallMethod: InstallMethod | 'not set';
    autoUpdates: string;
    hasUpdatePermissions: boolean | null;
    multipleInstallations: Array<{
        type: string;
        path: string;
    }>;
    warnings: Array<{
        issue: string;
        fix: string;
    }>;
    recommendation?: string;
    packageManager?: string;
    ripgrepStatus: {
        working: boolean;
        mode: 'system' | 'builtin' | 'embedded';
        systemPath: string | null;
    };
};
export declare function getCurrentInstallationType(): Promise<InstallationType>;
export declare function getInvokedBinary(): string;
export declare function detectLinuxGlobPatternWarnings(): Array<{
    issue: string;
    fix: string;
}>;
export declare function getDoctorDiagnostic(): Promise<DiagnosticInfo>;
//# sourceMappingURL=doctorDiagnostic.d.ts.map