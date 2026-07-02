import * as React from 'react';
import type { MCPServerConnection } from '../services/mcp/types.js';
import { type IDEExtensionInstallationStatus } from './ide.js';
import type { ThemeName } from './theme.js';
export type Property = {
    label?: string;
    value: React.ReactNode | Array<string>;
};
export type Diagnostic = React.ReactNode;
export declare function buildSandboxProperties(): Property[];
export declare function buildIDEProperties(mcpClients: MCPServerConnection[], ideInstallationStatus: (IDEExtensionInstallationStatus | null) | undefined, theme: ThemeName): Property[];
export declare function buildMcpProperties(clients: MCPServerConnection[] | undefined, theme: ThemeName): Property[];
export declare function buildMemoryDiagnostics(): Promise<Diagnostic[]>;
export declare function buildSettingSourcesProperties(): Property[];
export declare function buildInstallationDiagnostics(): Promise<Diagnostic[]>;
export declare function buildInstallationHealthDiagnostics(): Promise<Diagnostic[]>;
export declare function buildAccountProperties(): Property[];
export declare function buildAPIProviderProperties(): Property[];
export declare function getModelDisplayLabel(mainLoopModel: string | null): string;
//# sourceMappingURL=status.d.ts.map