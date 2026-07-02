import * as React from 'react';
/**
 * Renders a shutdown request with a warning-colored border.
 */
export declare function ShutdownRequestDisplay(t0: any): any;
/**
 * Renders a shutdown rejected message with a subtle (grey) border.
 */
export declare function ShutdownRejectedDisplay(t0: any): any;
/**
 * Try to parse and render a shutdown message from raw content.
 * Returns the rendered component if it's a shutdown message, null otherwise.
 */
export declare function tryRenderShutdownMessage(content: string): React.ReactNode | null;
/**
 * Get a brief summary text for a shutdown message.
 * Used in places like the inbox queue where we want a short description.
 * Returns null if the content is not a shutdown message.
 */
export declare function getShutdownMessageSummary(content: string): string | null;
//# sourceMappingURL=ShutdownMessage.d.ts.map