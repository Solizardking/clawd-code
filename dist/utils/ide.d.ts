import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { callIdeRpc } from '../services/mcp/client.js';
import type { ConnectedMCPServer, MCPServerConnection } from '../services/mcp/types.js';
export type DetectedIDEInfo = {
    name: string;
    port: number;
    workspaceFolders: string[];
    url: string;
    isValid: boolean;
    authToken?: string;
    ideRunningInWindows?: boolean;
};
export type IdeType = 'cursor' | 'windsurf' | 'vscode' | 'pycharm' | 'intellij' | 'webstorm' | 'phpstorm' | 'rubymine' | 'clion' | 'goland' | 'rider' | 'datagrip' | 'appcode' | 'dataspell' | 'aqua' | 'gateway' | 'fleet' | 'androidstudio';
export declare function isVSCodeIde(ide: IdeType | null): boolean;
export declare function isJetBrainsIde(ide: IdeType | null): boolean;
export declare const isSupportedVSCodeTerminal: any;
export declare const isSupportedJetBrainsTerminal: any;
export declare const isSupportedTerminal: any;
export declare function getTerminalIdeType(): IdeType | null;
/**
 * Gets sorted IDE lockfiles from ~/.claude/ide directory
 * @returns Array of full lockfile paths sorted by modification time (newest first)
 */
export declare function getSortedIdeLockfiles(): Promise<string[]>;
/**
 * Gets the potential IDE lockfiles directories path based on platform.
 * Paths are not pre-checked for existence — the consumer readdirs each
 * and handles ENOENT. Pre-checking with stat() would double syscalls,
 * and on WSL (where /mnt/c access is 2-10x slower) the per-user-dir
 * stat loop compounded startup latency.
 */
export declare function getIdeLockfilesPaths(): Promise<string[]>;
/**
 * Cleans up stale IDE lockfiles
 * - Removes lockfiles for processes that are no longer running
 * - Removes lockfiles for ports that are not responding
 */
export declare function cleanupStaleIdeLockfiles(): Promise<void>;
export interface IDEExtensionInstallationStatus {
    installed: boolean;
    error: string | null;
    installedVersion: string | null;
    ideType: IdeType | null;
}
export declare function maybeInstallIDEExtension(ideType: IdeType): Promise<IDEExtensionInstallationStatus | null>;
export declare function findAvailableIDE(): Promise<DetectedIDEInfo | null>;
/**
 * Detects IDEs that have a running extension/plugin.
 * @param includeInvalid If true, also return IDEs that are invalid (ie. where
 * the workspace directory does not match the cwd)
 */
export declare function detectIDEs(includeInvalid: boolean): Promise<DetectedIDEInfo[]>;
export declare function maybeNotifyIDEConnected(client: Client): Promise<void>;
export declare function hasAccessToIDEExtensionDiffFeature(mcpClients: MCPServerConnection[]): boolean;
export declare function isIDEExtensionInstalled(ideType: IdeType): Promise<boolean>;
export declare function isCursorInstalled(): Promise<boolean>;
export declare function isWindsurfInstalled(): Promise<boolean>;
export declare function isVSCodeInstalled(): Promise<boolean>;
/**
 * Detects running IDEs and returns an array of IdeType for those that are running.
 * This performs fresh detection (~150ms) and updates the cache for subsequent
 * detectRunningIDEsCached() calls.
 */
export declare function detectRunningIDEs(): Promise<IdeType[]>;
/**
 * Returns cached IDE detection results, or performs detection if cache is empty.
 * Use this for performance-sensitive paths like tips where fresh results aren't needed.
 */
export declare function detectRunningIDEsCached(): Promise<IdeType[]>;
/**
 * Resets the cache for detectRunningIDEsCached.
 * Exported for testing - allows resetting state between tests.
 */
export declare function resetDetectRunningIDEs(): void;
export declare function getConnectedIdeName(mcpClients: MCPServerConnection[]): string | null;
export declare function getIdeClientName(ideClient?: MCPServerConnection): string | null;
export declare function toIDEDisplayName(terminal: string | null): string;
export { callIdeRpc };
/**
 * Gets the connected IDE client from a list of MCP clients
 * @param mcpClients - Array of wrapped MCP clients
 * @returns The connected IDE client, or undefined if not found
 */
export declare function getConnectedIdeClient(mcpClients?: MCPServerConnection[]): ConnectedMCPServer | undefined;
/**
 * Notifies the IDE that a new prompt has been submitted.
 * This triggers IDE-specific actions like closing all diff tabs.
 */
export declare function closeOpenDiffs(ideClient: ConnectedMCPServer): Promise<void>;
/**
 * Initializes IDE detection and extension installation, then calls the provided callback
 * with the detected IDE information and installation status.
 * @param ideToInstallExtension The ide to install the extension to (if installing from external terminal)
 * @param onIdeDetected Callback to be called when an IDE is detected (including null)
 * @param onInstallationComplete Callback to be called when extension installation is complete
 */
export declare function initializeIdeIntegration(onIdeDetected: (ide: DetectedIDEInfo | null) => void, ideToInstallExtension: IdeType | null, onShowIdeOnboarding: () => void, onInstallationComplete: (status: IDEExtensionInstallationStatus | null) => void): Promise<void>;
//# sourceMappingURL=ide.d.ts.map