import type { TerminalNotification } from '../ink/useTerminalNotification.js';
export type NotificationOptions = {
    message: string;
    title?: string;
    notificationType: string;
};
export declare function sendNotification(notif: NotificationOptions, terminal: TerminalNotification): Promise<void>;
//# sourceMappingURL=notifier.d.ts.map