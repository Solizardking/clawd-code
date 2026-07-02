import * as React from 'react';
import type { ToolProgressData } from '../../Tool.js';
import type { ProgressMessage } from '../../types/message.js';
import type { Output } from './ListMcpResourcesTool.js';
export declare function renderToolUseMessage(input: Partial<{
    server?: string;
}>): React.ReactNode;
export declare function renderToolResultMessage(output: Output, _progressMessagesForMessage: ProgressMessage<ToolProgressData>[], { verbose }: {
    verbose: boolean;
}): React.ReactNode;
//# sourceMappingURL=UI.d.ts.map