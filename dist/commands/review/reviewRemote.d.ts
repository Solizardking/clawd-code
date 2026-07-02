/**
 * Teleported /ultrareview execution. Creates a CCR session with the current repo,
 * sends the review prompt as the initial message, and registers a
 * RemoteAgentTask so the polling loop pipes results back into the local
 * session via task-notification. Mirrors the /ultraplan → CCR flow.
 *
 * TODO(#22051): pass useBundleMode once landed so local-only / uncommitted
 * repo state is captured. The GitHub-clone path (current) only works for
 * pushed branches on repos with the Claude GitHub app installed.
 */
import type { ContentBlockParam } from '@anthropic-ai/sdk/resources/messages.js';
import type { ToolUseContext } from '../../Tool.js';
export declare function confirmOverage(): void;
export type OverageGate = {
    kind: 'proceed';
    billingNote: string;
} | {
    kind: 'not-enabled';
} | {
    kind: 'low-balance';
    available: number;
} | {
    kind: 'needs-confirm';
};
/**
 * Determine whether the user can launch an ultrareview and under what
 * billing terms. Fetches quota and utilization in parallel.
 */
export declare function checkOverageGate(): Promise<OverageGate>;
/**
 * Launch a teleported review session. Returns ContentBlockParam[] describing
 * the launch outcome for injection into the local conversation (model is then
 * queried with this content, so it can narrate the launch to the user).
 *
 * Returns ContentBlockParam[] with user-facing error messages on recoverable
 * failures (missing merge-base, empty diff, bundle too large), or null on
 * other failures so the caller falls through to the local-review prompt.
 * Reason is captured in analytics.
 *
 * Caller must run checkOverageGate() BEFORE calling this function
 * (ultrareviewCommand.tsx handles the dialog).
 */
export declare function launchRemoteReview(args: string, context: ToolUseContext, billingNote?: string): Promise<ContentBlockParam[] | null>;
//# sourceMappingURL=reviewRemote.d.ts.map