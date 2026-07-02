import React from 'react';
import type { ToolUseContext } from 'src/Tool.js';
import type { DeepImmutable } from 'src/types/utils.js';
import type { CommandResultDisplay } from '../../commands.js';
import type { RemoteAgentTaskState } from '../../tasks/RemoteAgentTask/RemoteAgentTask.js';
type Props = {
    session: DeepImmutable<RemoteAgentTaskState>;
    toolUseContext: ToolUseContext;
    onDone: (result?: string, options?: {
        display?: CommandResultDisplay;
    }) => void;
    onBack?: () => void;
    onKill?: () => void;
};
export declare function formatToolUseSummary(name: string, input: unknown): string;
export declare function RemoteSessionDetailDialog({ session, toolUseContext, onDone, onBack, onKill }: Props): React.ReactNode;
export {};
//# sourceMappingURL=RemoteSessionDetailDialog.d.ts.map