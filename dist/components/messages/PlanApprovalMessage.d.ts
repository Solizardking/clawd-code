import * as React from 'react';
/**
 * Renders a plan approval request with a planMode-colored border,
 * showing the plan content and instructions for approving/rejecting.
 */
export declare function PlanApprovalRequestDisplay(t0: any): any;
/**
 * Renders a plan approval response with a success (green) or error (red) border.
 */
export declare function PlanApprovalResponseDisplay(t0: any): any;
/**
 * Try to parse and render a plan approval message from raw content.
 * Returns the rendered component if it's a plan approval message, null otherwise.
 */
export declare function tryRenderPlanApprovalMessage(content: string, senderName: string): React.ReactNode | null;
/**
 * Format teammate message content for display.
 * If it's a structured message (plan approval, shutdown, or idle), returns a formatted summary.
 * Otherwise returns the original content.
 */
export declare function formatTeammateMessageContent(content: string): string;
//# sourceMappingURL=PlanApprovalMessage.d.ts.map