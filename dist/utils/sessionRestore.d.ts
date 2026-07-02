import type { UUID } from 'crypto';
import type { AppState } from '../state/AppState.js';
import type { AgentColorName } from '../tools/AgentTool/agentColorManager.js';
import { type AgentDefinition, type AgentDefinitionsResult } from '../tools/AgentTool/loadAgentsDir.js';
import type { AttributionSnapshotMessage, ContextCollapseCommitEntry, ContextCollapseSnapshotEntry, PersistedWorktreeSession } from '../types/logs.js';
import type { Message } from '../types/message.js';
import { type AttributionState } from './commitAttribution.js';
import type { FileHistorySnapshot } from './fileHistory.js';
import type { ContentReplacementRecord } from './toolResultStorage.js';
type ResumeResult = {
    messages?: Message[];
    fileHistorySnapshots?: FileHistorySnapshot[];
    attributionSnapshots?: AttributionSnapshotMessage[];
    contextCollapseCommits?: ContextCollapseCommitEntry[];
    contextCollapseSnapshot?: ContextCollapseSnapshotEntry;
};
/**
 * Restore session state (file history, attribution, todos) from log on resume.
 * Used by both SDK (print.ts) and interactive (REPL.tsx, main.tsx) resume paths.
 */
export declare function restoreSessionStateFromLog(result: ResumeResult, setAppState: (f: (prev: AppState) => AppState) => void): void;
/**
 * Compute restored attribution state from log snapshots.
 * Used for computing initial state before render (e.g., main.tsx --continue).
 * Returns undefined if attribution feature is disabled or no snapshots exist.
 */
export declare function computeRestoredAttributionState(result: ResumeResult): AttributionState | undefined;
/**
 * Compute standalone agent context (name/color) for session resume.
 * Used for computing initial state before render (per CLAUDE.md guidelines).
 * Returns undefined if no name/color is set on the session.
 */
export declare function computeStandaloneAgentContext(agentName: string | undefined, agentColor: string | undefined): AppState['standaloneAgentContext'] | undefined;
/**
 * Restore agent setting from a resumed session.
 *
 * When resuming a conversation that used a custom agent, this re-applies the
 * agent type and model override (unless the user specified --agent on the CLI).
 * Mutates bootstrap state via setMainThreadAgentType / setMainLoopModelOverride.
 *
 * Returns the restored agent definition and its agentType string, or undefined
 * if no agent was restored.
 */
export declare function restoreAgentFromSession(agentSetting: string | undefined, currentAgentDefinition: AgentDefinition | undefined, agentDefinitions: AgentDefinitionsResult): {
    agentDefinition: AgentDefinition | undefined;
    agentType: string | undefined;
};
/**
 * Refresh agent definitions after a coordinator/normal mode switch.
 *
 * When resuming a session that was in a different mode (coordinator vs normal),
 * the built-in agents need to be re-derived to match the new mode. CLI-provided
 * agents (from --agents flag) are merged back in.
 */
export declare function refreshAgentDefinitionsForModeSwitch(modeWasSwitched: boolean, currentCwd: string, cliAgents: AgentDefinition[], currentAgentDefinitions: AgentDefinitionsResult): Promise<AgentDefinitionsResult>;
/**
 * Result of processing a resumed/continued conversation for rendering.
 */
export type ProcessedResume = {
    messages: Message[];
    fileHistorySnapshots?: FileHistorySnapshot[];
    contentReplacements?: ContentReplacementRecord[];
    agentName: string | undefined;
    agentColor: AgentColorName | undefined;
    restoredAgentDef: AgentDefinition | undefined;
    initialState: AppState;
};
/**
 * Subset of the coordinator mode module API needed for session resume.
 */
type CoordinatorModeApi = {
    matchSessionMode(mode?: string): string | undefined;
    isCoordinatorMode(): boolean;
};
/**
 * The loaded conversation data (return type of loadConversationForResume).
 */
type ResumeLoadResult = {
    messages: Message[];
    fileHistorySnapshots?: FileHistorySnapshot[];
    attributionSnapshots?: AttributionSnapshotMessage[];
    contentReplacements?: ContentReplacementRecord[];
    contextCollapseCommits?: ContextCollapseCommitEntry[];
    contextCollapseSnapshot?: ContextCollapseSnapshotEntry;
    sessionId: UUID | undefined;
    agentName?: string;
    agentColor?: string;
    agentSetting?: string;
    customTitle?: string;
    tag?: string;
    mode?: 'coordinator' | 'normal';
    worktreeSession?: PersistedWorktreeSession | null;
    prNumber?: number;
    prUrl?: string;
    prRepository?: string;
};
/**
 * Restore the worktree working directory on resume. The transcript records
 * the last worktree enter/exit; if the session crashed while inside a
 * worktree (last entry = session object, not null), cd back into it.
 *
 * process.chdir is the TOCTOU-safe existence check — it throws ENOENT if
 * the /exit dialog removed the directory, or if the user deleted it
 * manually between sessions.
 *
 * When --worktree already created a fresh worktree, that takes precedence
 * over the resumed session's state. restoreSessionMetadata just overwrote
 * project.currentSessionWorktree with the stale transcript value, so
 * re-assert the fresh worktree here before adoptResumedSessionFile writes
 * it back to disk.
 */
export declare function restoreWorktreeForResume(worktreeSession: PersistedWorktreeSession | null | undefined): void;
/**
 * Undo restoreWorktreeForResume before a mid-session /resume switches to
 * another session. Without this, /resume from a worktree session to a
 * non-worktree session leaves the user in the old worktree directory with
 * currentWorktreeSession still pointing at the prior session. /resume to a
 * *different* worktree fails entirely — the getCurrentWorktreeSession()
 * guard above blocks the switch.
 *
 * Not needed by CLI --resume/--continue: those run once at startup where
 * getCurrentWorktreeSession() is only truthy if --worktree was used (fresh
 * worktree that should take precedence, handled by the re-assert above).
 */
export declare function exitRestoredWorktree(): void;
/**
 * Process a loaded conversation for resume/continue.
 *
 * Handles coordinator mode matching, session ID setup, agent restoration,
 * mode persistence, and initial state computation. Called by both --continue
 * and --resume paths in main.tsx.
 */
export declare function processResumedConversation(result: ResumeLoadResult, opts: {
    forkSession: boolean;
    sessionIdOverride?: string;
    transcriptPath?: string;
    includeAttribution?: boolean;
}, context: {
    modeApi: CoordinatorModeApi | null;
    mainThreadAgentDefinition: AgentDefinition | undefined;
    agentDefinitions: AgentDefinitionsResult;
    currentCwd: string;
    cliAgents: AgentDefinition[];
    initialState: AppState;
}): Promise<ProcessedResume>;
export {};
//# sourceMappingURL=sessionRestore.d.ts.map