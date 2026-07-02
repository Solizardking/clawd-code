import React from 'react';
import type { CommandResultDisplay } from '../../commands.js';
import type { StdioServerInfo } from './types.js';
type Props = {
    server: StdioServerInfo;
    serverToolsCount: number;
    onViewTools: () => void;
    onCancel: () => void;
    onComplete: (result?: string, options?: {
        display?: CommandResultDisplay;
    }) => void;
    borderless?: boolean;
};
export declare function MCPStdioServerMenu({ server, serverToolsCount, onViewTools, onCancel, onComplete, borderless }: Props): React.ReactNode;
export {};
//# sourceMappingURL=MCPStdioServerMenu.d.ts.map