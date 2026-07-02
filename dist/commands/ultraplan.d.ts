import type { AppState } from '../state/AppStateStore.js';
export declare const CCR_TERMS_URL = "https://code.claude.com/docs/en/claude-code-on-the-web";
/**
 * Assemble the initial CCR user message. seedPlan and blurb stay outside the
 * system-reminder so the browser renders them; scaffolding is hidden.
 */
export declare function buildUltraplanPrompt(blurb: string, seedPlan?: string): string;
/**
 * Stop a running ultraplan: archive the remote session (halts it but keeps the
 * URL viewable), kill the local task entry (clears the pill), and clear
 * ultraplanSessionUrl (re-arms the keyword trigger). startDetachedPoll's
 * shouldStop callback sees the killed status on its next tick and throws;
 * the catch block early-returns when status !== 'running'.
 */
export declare function stopUltraplan(taskId: string, sessionId: string, setAppState: (f: (prev: AppState) => AppState) => void): Promise<void>;
/**
 * Shared entry for the slash command, keyword trigger, and the plan-approval
 * dialog's "Ultraplan" button. When seedPlan is present (dialog path), it is
 * prepended as a draft to refine; blurb may be empty in that case.
 *
 * Resolves immediately with the user-facing message. Eligibility check,
 * session creation, and task registration run detached and failures surface via
 * enqueuePendingNotification.
 */
export declare function launchUltraplan(opts: {
    blurb: string;
    seedPlan?: string;
    getAppState: () => AppState;
    setAppState: (f: (prev: AppState) => AppState) => void;
    signal: AbortSignal;
    /** True if the caller disconnected Remote Control before launching. */
    disconnectedBridge?: boolean;
    /**
     * Called once teleportToRemote resolves with a session URL. Callers that
     * have setMessages (REPL) append this as a second transcript message so the
     * URL is visible without opening the ↓ detail view. Callers without
     * transcript access (ExitPlanModePermissionRequest) omit this — the pill
     * still shows live status.
     */
    onSessionReady?: (msg: string) => void;
}): Promise<string>;
declare const _default: Command;
export default _default;
//# sourceMappingURL=ultraplan.d.ts.map