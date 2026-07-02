import type * as React from 'react';
import type { Theme } from '../utils/theme.js';
type Priority = 'low' | 'medium' | 'high' | 'immediate';
type BaseNotification = {
    key: string;
    /**
     * Keys of notifications that this notification invalidates.
     * If a notification is invalidated, it will be removed from the queue
     * and, if currently displayed, cleared immediately.
     */
    invalidates?: string[];
    priority: Priority;
    timeoutMs?: number;
    /**
     * Combine notifications with the same key, like Array.reduce().
     * Called as fold(accumulator, incoming) when a notification with a matching
     * key already exists in the queue or is currently displayed.
     * Returns the merged notification (should carry fold forward for future merges).
     */
    fold?: (accumulator: Notification, incoming: Notification) => Notification;
};
type TextNotification = BaseNotification & {
    text: string;
    color?: keyof Theme;
};
type JSXNotification = BaseNotification & {
    jsx: React.ReactNode;
};
type AddNotificationFn = (content: Notification) => void;
type RemoveNotificationFn = (key: string) => void;
export type Notification = TextNotification | JSXNotification;
export declare function useNotifications(): {
    addNotification: AddNotificationFn;
    removeNotification: RemoveNotificationFn;
};
export declare function getNext(queue: Notification[]): Notification | undefined;
export {};
//# sourceMappingURL=notifications.d.ts.map