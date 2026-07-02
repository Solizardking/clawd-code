import type { AppState } from '../state/AppState.js';
/**
 * Parse `@agent-name message` syntax for direct team member messaging.
 */
export declare function parseDirectMemberMessage(input: string): {
    recipientName: string;
    message: string;
} | null;
export type DirectMessageResult = {
    success: true;
    recipientName: string;
} | {
    success: false;
    error: 'no_team_context' | 'unknown_recipient';
    recipientName?: string;
};
type WriteToMailboxFn = (recipientName: string, message: {
    from: string;
    text: string;
    timestamp: string;
}, teamName: string) => Promise<void>;
/**
 * Send a direct message to a team member, bypassing the model.
 */
export declare function sendDirectMemberMessage(recipientName: string, message: string, teamContext: AppState['teamContext'], writeToMailbox?: WriteToMailboxFn): Promise<DirectMessageResult>;
export {};
//# sourceMappingURL=directMemberMessage.d.ts.map