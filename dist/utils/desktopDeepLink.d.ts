export type DesktopInstallStatus = {
    status: 'not-installed';
} | {
    status: 'version-too-old';
    version: string;
} | {
    status: 'ready';
    version: string;
};
/**
 * Check Desktop install status including version compatibility.
 */
export declare function getDesktopInstallStatus(): Promise<DesktopInstallStatus>;
/**
 * Build and open a deep link to resume the current session in Claude Desktop.
 * Returns an object with success status and any error message.
 */
export declare function openCurrentSessionInDesktop(): Promise<{
    success: boolean;
    error?: string;
    deepLinkUrl?: string;
}>;
//# sourceMappingURL=desktopDeepLink.d.ts.map