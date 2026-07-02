import type { RenderableMessage } from '../types/message.js';
/**
 * Collapses consecutive completed-background-bash task-notifications into a
 * single synthetic "N background commands completed" notification. Failed/killed
 * tasks and agent/workflow notifications are left alone. Monitor stream
 * events (enqueueStreamEvent) have no <status> tag and never match.
 *
 * Pass-through in verbose mode so ctrl+O shows each completion.
 */
export declare function collapseBackgroundBashNotifications(messages: RenderableMessage[], verbose: boolean): RenderableMessage[];
//# sourceMappingURL=collapseBackgroundBashNotifications.d.ts.map