/**
 * Thin launchers for one-off dialog JSX sites in main.tsx.
 * Each launcher dynamically imports its component and wires the `done` callback
 * identically to the original inline call site. Zero behavior change.
 *
 * Part of the main.tsx React/JSX extraction effort. See sibling PRs
 * perf/extract-interactive-helpers and perf/launch-repl.
 */
import React from 'react';
import type { AssistantSession } from './assistant/sessionDiscovery.js';
import type { StatsStore } from './context/stats.js';
import type { Root } from './ink.js';
import type { AppState } from './state/AppStateStore.js';
import type { AgentMemoryScope } from './tools/AgentTool/agentMemory.js';
import type { TeleportRemoteResponse } from './utils/conversationRecovery.js';
import type { FpsMetrics } from './utils/fpsTracker.js';
import type { ValidationError } from './utils/settings/validation.js';
type ResumeConversationProps = React.ComponentProps<typeof import('./screens/ResumeConversation.js').ResumeConversation>;
/**
 * Site ~3173: SnapshotUpdateDialog (agent memory snapshot update prompt).
 * Original callback wiring: onComplete={done}, onCancel={() => done('keep')}.
 */
export declare function launchSnapshotUpdateDialog(root: Root, props: {
    agentType: string;
    scope: AgentMemoryScope;
    snapshotTimestamp: string;
}): Promise<'merge' | 'keep' | 'replace'>;
/**
 * Site ~3250: InvalidSettingsDialog (settings validation errors).
 * Original callback wiring: onContinue={done}, onExit passed through from caller.
 */
export declare function launchInvalidSettingsDialog(root: Root, props: {
    settingsErrors: ValidationError[];
    onExit: () => void;
}): Promise<void>;
/**
 * Site ~4229: AssistantSessionChooser (pick a bridge session to attach to).
 * Original callback wiring: onSelect={id => done(id)}, onCancel={() => done(null)}.
 */
export declare function launchAssistantSessionChooser(root: Root, props: {
    sessions: AssistantSession[];
}): Promise<string | null>;
/**
 * `claude assistant` found zero sessions — show the same install wizard
 * as `/assistant` when daemon.json is empty. Resolves to the installed dir on
 * success, null on cancel. Rejects on install failure so the caller can
 * distinguish errors from user cancellation.
 */
export declare function launchAssistantInstallWizard(root: Root): Promise<string | null>;
/**
 * Site ~4549: TeleportResumeWrapper (interactive teleport session picker).
 * Original callback wiring: onComplete={done}, onCancel={() => done(null)}, source="cliArg".
 */
export declare function launchTeleportResumeWrapper(root: Root): Promise<TeleportRemoteResponse | null>;
/**
 * Site ~4597: TeleportRepoMismatchDialog (pick a local checkout of the target repo).
 * Original callback wiring: onSelectPath={done}, onCancel={() => done(null)}.
 */
export declare function launchTeleportRepoMismatchDialog(root: Root, props: {
    targetRepo: string;
    initialPaths: string[];
}): Promise<string | null>;
/**
 * Site ~4903: ResumeConversation mount (interactive session picker).
 * Uses renderAndRun, NOT showSetupDialog. Wraps in <App><KeybindingSetup>.
 * Preserves original Promise.all parallelism between getWorktreePaths and imports.
 */
export declare function launchResumeChooser(root: Root, appProps: {
    getFpsMetrics: () => FpsMetrics | undefined;
    stats: StatsStore;
    initialState: AppState;
}, worktreePathsPromise: Promise<string[]>, resumeProps: Omit<ResumeConversationProps, 'worktreePaths'>): Promise<void>;
export {};
//# sourceMappingURL=dialogLaunchers.d.ts.map