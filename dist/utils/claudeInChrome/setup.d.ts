import type { ScopedMcpServerConfig } from '../../services/mcp/types.js';
export declare function shouldEnableClaudeInChrome(chromeFlag?: boolean): boolean;
export declare function shouldAutoEnableClaudeInChrome(): boolean;
/**
 * Setup Claude in Chrome MCP server and tools
 *
 * @returns MCP config and allowed tools, or throws an error if platform is unsupported
 */
export declare function setupClaudeInChrome(): {
    mcpConfig: Record<string, ScopedMcpServerConfig>;
    allowedTools: string[];
    systemPrompt: string;
};
export declare function installChromeNativeHostManifest(manifestBinaryPath: string): Promise<void>;
/**
 * Detects if the Claude in Chrome extension is installed by checking the Extensions
 * directory across all supported Chromium-based browsers and their profiles.
 *
 * @returns Object with isInstalled boolean and the browser where the extension was found
 */
export declare function isChromeExtensionInstalled(): Promise<boolean>;
//# sourceMappingURL=setup.d.ts.map