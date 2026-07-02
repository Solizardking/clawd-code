import * as React from 'react';
import type { CommandResultDisplay, LocalJSXCommandContext } from '../../commands.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import type { Message } from '../../types/message.js';
export declare function renderFeedbackComponent(onDone: (result?: string, options?: {
    display?: CommandResultDisplay;
}) => void, abortSignal: AbortSignal, messages: Message[], initialDescription?: string, backgroundTasks?: {
    [taskId: string]: {
        type: string;
        identity?: {
            agentId: string;
        };
        messages?: Message[];
    };
}): React.ReactNode;
export declare function call(onDone: LocalJSXCommandOnDone, context: LocalJSXCommandContext, args?: string): Promise<React.ReactNode>;
//# sourceMappingURL=feedback.d.ts.map