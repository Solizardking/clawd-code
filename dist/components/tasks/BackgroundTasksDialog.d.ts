import React from 'react';
import type { ToolUseContext } from 'src/Tool.js';
import type { CommandResultDisplay } from '../../commands.js';
type Props = {
    onDone: (result?: string, options?: {
        display?: CommandResultDisplay;
    }) => void;
    toolUseContext: ToolUseContext;
    initialDetailTaskId?: string;
};
export declare function BackgroundTasksDialog({ onDone, toolUseContext, initialDetailTaskId }: Props): React.ReactNode;
export {};
//# sourceMappingURL=BackgroundTasksDialog.d.ts.map