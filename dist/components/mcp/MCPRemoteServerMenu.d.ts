import React from 'react';
import type { CommandResultDisplay } from '../../commands.js';
import type { ClaudeAIServerInfo, HTTPServerInfo, SSEServerInfo } from './types.js';
type Props = {
    server: SSEServerInfo | HTTPServerInfo | ClaudeAIServerInfo;
    serverToolsCount: number;
    onViewTools: () => void;
    onCancel: () => void;
    onComplete?: (result?: string, options?: {
        display?: CommandResultDisplay;
    }) => void;
    borderless?: boolean;
};
export declare function MCPRemoteServerMenu({ server, serverToolsCount, onViewTools, onCancel, onComplete, borderless }: Props): React.ReactNode;
export {};
//# sourceMappingURL=MCPRemoteServerMenu.d.ts.map