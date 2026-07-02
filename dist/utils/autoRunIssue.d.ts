/**
 * Component that shows a notification about running /issue command
 * with the ability to cancel via ESC key
 */
export declare function AutoRunIssueNotification(t0: any): any;
export type AutoRunIssueReason = 'feedback_survey_bad' | 'feedback_survey_good';
/**
 * Determines if /issue should auto-run for Ant users
 */
export declare function shouldAutoRunIssue(reason: AutoRunIssueReason): boolean;
/**
 * Returns the appropriate command to auto-run based on the reason
 * ANT-ONLY: good-claude command only exists in ant builds
 */
export declare function getAutoRunCommand(reason: AutoRunIssueReason): string;
/**
 * Gets a human-readable description of why /issue is being auto-run
 */
export declare function getAutoRunIssueReasonText(reason: AutoRunIssueReason): string;
//# sourceMappingURL=autoRunIssue.d.ts.map