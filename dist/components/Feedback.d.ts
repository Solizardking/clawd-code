import * as React from 'react';
import type { CommandResultDisplay } from '../commands.js';
import type { Message } from '../types/message.js';
type Props = {
    abortSignal: AbortSignal;
    messages: Message[];
    initialDescription?: string;
    onDone(result: string, options?: {
        display?: CommandResultDisplay;
    }): void;
    backgroundTasks?: {
        [taskId: string]: {
            type: string;
            identity?: {
                agentId: string;
            };
            messages?: Message[];
        };
    };
};
export declare function redactSensitiveInfo(text: string): string;
export declare function Feedback({ abortSignal, messages, initialDescription, onDone, backgroundTasks }: Props): React.ReactNode;
export declare function createGitHubIssueUrl(feedbackId: string, title: string, description: string, errors: Array<{
    error?: string;
    timestamp?: string;
}>): string;
export {};
//# sourceMappingURL=Feedback.d.ts.map