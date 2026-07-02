import type { UUID } from 'crypto';
import { type AgentId, type SessionId } from '../types/ids.js';
import type { AttributionSnapshotMessage } from '../types/logs.js';
import { type ContextCollapseCommitEntry, type ContextCollapseSnapshotEntry, type Entry, type FileHistorySnapshotMessage, type LogOption, type PersistedWorktreeSession, type SerializedMessage, type TranscriptMessage } from '../types/logs.js';
import type { AssistantMessage, AttachmentMessage, Message, SystemMessage, UserMessage } from '../types/message.js';
import type { QueueOperationMessage } from '../types/messageQueueTypes.js';
import type { FileHistorySnapshot } from './fileHistory.js';
import type { ContentReplacementRecord } from './toolResultStorage.js';
type Transcript = (UserMessage | AssistantMessage | AttachmentMessage | SystemMessage)[];
/**
 * Type guard to check if an entry is a transcript message.
 * Transcript messages include user, assistant, attachment, and system messages.
 * IMPORTANT: This is the single source of truth for what constitutes a transcript message.
 * loadTranscriptFile() uses this to determine which messages to load into the chain.
 *
 * Progress messages are NOT transcript messages. They are ephemeral UI state
 * and must not be persisted to the JSONL or participate in the parentUuid
 * chain. Including them caused chain forks that orphaned real conversation
 * messages on resume (see #14373, #23537).
 */
export declare function isTranscriptMessage(entry: Entry): entry is TranscriptMessage;
/**
 * Entries that participate in the parentUuid chain. Used on the write path
 * (insertMessageChain, useLogMessages) to skip progress when assigning
 * parentUuid. Old transcripts with progress already in the chain are handled
 * by the progressBridge rewrite in loadTranscriptFile.
 */
export declare function isChainParticipant(m: Pick<Message, 'type'>): boolean;
export declare function isEphemeralToolProgress(dataType: unknown): boolean;
export declare function getProjectsDir(): string;
export declare function getTranscriptPath(): string;
export declare function getTranscriptPathForSession(sessionId: string): string;
export declare const MAX_TRANSCRIPT_READ_BYTES: number;
export declare function setAgentTranscriptSubdir(agentId: string, subdir: string): void;
export declare function clearAgentTranscriptSubdir(agentId: string): void;
export declare function getAgentTranscriptPath(agentId: AgentId): string;
export type AgentMetadata = {
    agentType: string;
    /** Worktree path if the agent was spawned with isolation: "worktree" */
    worktreePath?: string;
    /** Original task description from the AgentTool input. Persisted so a
     * resumed agent's notification can show the original description instead
     * of a placeholder. Optional — older metadata files lack this field. */
    description?: string;
};
/**
 * Persist the agentType used to launch a subagent. Read by resume to
 * route correctly when subagent_type is omitted — without this, resuming
 * a fork silently degrades to general-purpose (4KB system prompt, no
 * inherited history). Sidecar file avoids JSONL schema changes.
 *
 * Also stores the worktreePath when the agent was spawned with worktree
 * isolation, enabling resume to restore the correct cwd.
 */
export declare function writeAgentMetadata(agentId: AgentId, metadata: AgentMetadata): Promise<void>;
export declare function readAgentMetadata(agentId: AgentId): Promise<AgentMetadata | null>;
export type RemoteAgentMetadata = {
    taskId: string;
    remoteTaskType: string;
    /** CCR session ID — used to fetch live status from the Sessions API on resume. */
    sessionId: string;
    title: string;
    command: string;
    spawnedAt: number;
    toolUseId?: string;
    isLongRunning?: boolean;
    isUltraplan?: boolean;
    isRemoteReview?: boolean;
    remoteTaskMetadata?: Record<string, unknown>;
};
/**
 * Persist metadata for a remote-agent task so it can be restored on session
 * resume. Per-task sidecar file (sibling dir to subagents/) survives
 * hydrateSessionFromRemote's .jsonl wipe; status is always fetched fresh
 * from CCR on restore — only identity is persisted locally.
 */
export declare function writeRemoteAgentMetadata(taskId: string, metadata: RemoteAgentMetadata): Promise<void>;
export declare function readRemoteAgentMetadata(taskId: string): Promise<RemoteAgentMetadata | null>;
export declare function deleteRemoteAgentMetadata(taskId: string): Promise<void>;
/**
 * Scan the remote-agents/ directory for all persisted metadata files.
 * Used by restoreRemoteAgentTasks to reconnect to still-running CCR sessions.
 */
export declare function listRemoteAgentMetadata(): Promise<RemoteAgentMetadata[]>;
export declare function sessionIdExists(sessionId: string): boolean;
export declare function getNodeEnv(): string;
export declare function getUserType(): string;
export declare function isCustomTitleEnabled(): boolean;
export declare const getProjectDir: any;
/**
 * Reset the Project singleton's flush state for testing.
 * This ensures tests don't interfere with each other via shared counter state.
 */
export declare function resetProjectFlushStateForTesting(): void;
/**
 * Reset the entire Project singleton for testing.
 * This ensures tests with different CLAUDE_CONFIG_DIR values
 * don't share stale sessionFile paths.
 */
export declare function resetProjectForTesting(): void;
export declare function setSessionFileForTesting(path: string): void;
type InternalEventWriter = (eventType: string, payload: Record<string, unknown>, options?: {
    isCompaction?: boolean;
    agentId?: string;
}) => Promise<void>;
/**
 * Register a CCR v2 internal event writer for transcript persistence.
 * When set, transcript messages are written as internal worker events
 * instead of going through v1 Session Ingress.
 */
export declare function setInternalEventWriter(writer: InternalEventWriter): void;
type InternalEventReader = () => Promise<{
    payload: Record<string, unknown>;
    agent_id?: string;
}[] | null>;
/**
 * Register a CCR v2 internal event reader for session resume.
 * When set, hydrateFromCCRv2InternalEvents() can fetch foreground and
 * subagent internal events to reconstruct conversation state on reconnection.
 */
export declare function setInternalEventReader(reader: InternalEventReader, subagentReader: InternalEventReader): void;
/**
 * Set the remote ingress URL on the current Project for testing.
 * This simulates what hydrateRemoteSession does in production.
 */
export declare function setRemoteIngressUrlForTesting(url: string): void;
export type TeamInfo = {
    teamName?: string;
    agentName?: string;
};
export declare function recordTranscript(messages: Message[], teamInfo?: TeamInfo, startingParentUuidHint?: UUID, allMessages?: readonly Message[]): Promise<UUID | null>;
export declare function recordSidechainTranscript(messages: Message[], agentId?: string, startingParentUuid?: UUID | null): Promise<void>;
export declare function recordQueueOperation(queueOp: QueueOperationMessage): Promise<void>;
/**
 * Remove a message from the transcript by UUID.
 * Used when a tombstone is received for an orphaned message.
 */
export declare function removeTranscriptMessage(targetUuid: UUID): Promise<void>;
export declare function recordFileHistorySnapshot(messageId: UUID, snapshot: FileHistorySnapshot, isSnapshotUpdate: boolean): Promise<void>;
export declare function recordAttributionSnapshot(snapshot: AttributionSnapshotMessage): Promise<void>;
export declare function recordContentReplacement(replacements: ContentReplacementRecord[], agentId?: AgentId): Promise<void>;
/**
 * Reset the session file pointer after switchSession/regenerateSessionId.
 * The new file is created lazily on the first user/assistant message.
 */
export declare function resetSessionFilePointer(): Promise<void>;
/**
 * Adopt the existing session file after --continue/--resume (non-fork).
 * Call after switchSession + resetSessionFilePointer + restoreSessionMetadata:
 * getTranscriptPath() now derives the resumed file's path from the switched
 * sessionId, and the cache holds the final metadata (--name title, resumed
 * mode/tag/agent).
 *
 * Setting sessionFile here — instead of waiting for materializeSessionFile
 * on the first user message — lets the exit cleanup handler's
 * reAppendSessionMetadata run (it bails when sessionFile is null). Without
 * this, `-c -n foo` + quit-before-message drops the title on the floor:
 * the in-memory cache is correct but never written. The resumed file
 * already exists on disk (we loaded from it), so this can't create an
 * orphan the way a fresh --name session would.
 *
 * skipTitleRefresh: restoreSessionMetadata populated the cache from the
 * same disk read microseconds ago, so refreshing from the tail here is a
 * no-op — unless --name was used, in which case it would clobber the fresh
 * CLI title with the stale disk value. After this write, disk == cache and
 * later calls (compaction, exit cleanup) absorb SDK writes normally.
 */
export declare function adoptResumedSessionFile(): void;
/**
 * Append a context-collapse commit entry to the transcript. One entry per
 * commit, in commit order. On resume these are collected into an ordered
 * array and handed to restoreFromEntries() which rebuilds the commit log.
 */
export declare function recordContextCollapseCommit(commit: {
    collapseId: string;
    summaryUuid: string;
    summaryContent: string;
    summary: string;
    firstArchivedUuid: string;
    lastArchivedUuid: string;
}): Promise<void>;
/**
 * Snapshot the staged queue + spawn state. Written after each ctx-agent
 * spawn resolves (when staged contents may have changed). Last-wins on
 * restore — the loader keeps only the most recent snapshot entry.
 */
export declare function recordContextCollapseSnapshot(snapshot: {
    staged: Array<{
        startUuid: string;
        endUuid: string;
        summary: string;
        risk: number;
        stagedAt: number;
    }>;
    armed: boolean;
    lastSpawnTokens: number;
}): Promise<void>;
export declare function flushSessionStorage(): Promise<void>;
export declare function hydrateRemoteSession(sessionId: string, ingressUrl: string): Promise<boolean>;
/**
 * Hydrate session state from CCR v2 internal events.
 * Fetches foreground and subagent events via the registered readers,
 * extracts transcript entries from payloads, and writes them to the
 * local transcript files (main + per-agent).
 * The server handles compaction filtering — it returns events starting
 * from the latest compaction boundary.
 */
export declare function hydrateFromCCRv2InternalEvents(sessionId: string): Promise<boolean>;
/**
 * Gets the last user message that was processed (i.e., before any non-user message appears).
 * Used to determine if a session has valid user interaction.
 */
export declare function getFirstMeaningfulUserMessageTextContent<T extends Message>(transcript: T[]): string | undefined;
export declare function removeExtraFields(transcript: TranscriptMessage[]): SerializedMessage[];
/**
 * Builds a conversation chain from a leaf message to root
 * @param messages Map of all messages
 * @param leafMessage The leaf message to start from
 * @returns Array of messages from root to leaf
 */
export declare function buildConversationChain(messages: Map<UUID, TranscriptMessage>, leafMessage: TranscriptMessage): TranscriptMessage[];
/**
 * Find the latest turn_duration checkpoint in the reconstructed chain and
 * compare its recorded messageCount against the chain's position at that
 * point. Emits tengu_resume_consistency_delta for BigQuery monitoring of
 * write→load round-trip drift — the class of bugs where snip/compact/
 * parallel-TR operations mutate in-memory but the parentUuid walk on disk
 * reconstructs a different set (adamr-20260320-165831: 397K displayed →
 * 1.65M actual on resume).
 *
 * delta > 0: resume loaded MORE than in-session (the usual failure mode)
 * delta < 0: resume loaded FEWER (chain truncation — #22453 class)
 * delta = 0: round-trip consistent
 *
 * Called from loadConversationForResume — fires once per resume, not on
 * /share or log-listing chain rebuilds.
 */
export declare function checkResumeConsistency(chain: Message[]): void;
/**
 * Loads a transcript from a JSON or JSONL file and converts it to LogOption format
 * @param filePath Path to the transcript file (.json or .jsonl)
 * @returns LogOption containing the transcript messages
 * @throws Error if file doesn't exist or contains invalid data
 */
export declare function loadTranscriptFromFile(filePath: string): Promise<LogOption>;
export declare function fetchLogs(limit?: number): Promise<LogOption[]>;
export declare function saveCustomTitle(sessionId: UUID, customTitle: string, fullPath?: string, source?: 'user' | 'auto'): Promise<void>;
/**
 * Persist an AI-generated title to the JSONL as a distinct `ai-title` entry.
 *
 * Writing a separate entry type (vs. reusing `custom-title`) is load-bearing:
 * - Read preference: readers prefer `customTitle` field over `aiTitle`, so
 *   a user rename always wins regardless of append order.
 * - Resume safety: `loadTranscriptFile` only populates the `customTitles`
 *   Map from `custom-title` entries, so `restoreSessionMetadata` never
 *   caches an AI title and `reAppendSessionMetadata` never re-appends one
 *   at EOF — avoiding the clobber-on-resume bug where a stale AI title
 *   overwrites a mid-session user rename.
 * - CAS semantics: VS Code's `onlyIfNoCustomTitle` check scans for the
 *   `customTitle` field only, so AI can overwrite its own previous AI
 *   title but never a user title.
 * - Metrics: `tengu_session_renamed` is not fired for AI titles.
 *
 * Because the entry is never re-appended, it scrolls out of the 64KB tail
 * window once enough messages accumulate. Readers (`readLiteMetadata`,
 * `listSessionsImpl`, VS Code `fetchSessions`) fall back to scanning the
 * head buffer for `aiTitle` in that case. Both head and tail reads are
 * bounded (64KB each via `extractLastJsonStringField`), never a full scan.
 *
 * Callers with a stale-write guard (e.g., VS Code client) should prefer
 * passing `persist: false` to the SDK control request and persisting
 * through their own rename path after the guard passes, to avoid a race
 * where the AI title lands after a mid-flight user rename.
 */
export declare function saveAiGeneratedTitle(sessionId: UUID, aiTitle: string): void;
/**
 * Append a periodic task summary for `claude ps`. Unlike ai-title this is
 * not re-appended by reAppendSessionMetadata — it's a rolling snapshot of
 * what the agent is doing *now*, so staleness is fine; ps reads the most
 * recent one from the tail.
 */
export declare function saveTaskSummary(sessionId: UUID, summary: string): void;
export declare function saveTag(sessionId: UUID, tag: string, fullPath?: string): Promise<void>;
/**
 * Link a session to a GitHub pull request.
 * This stores the PR number, URL, and repository for tracking and navigation.
 */
export declare function linkSessionToPR(sessionId: UUID, prNumber: number, prUrl: string, prRepository: string, fullPath?: string): Promise<void>;
export declare function getCurrentSessionTag(sessionId: UUID): string | undefined;
export declare function getCurrentSessionTitle(sessionId: SessionId): string | undefined;
export declare function getCurrentSessionAgentColor(): string | undefined;
/**
 * Restore session metadata into in-memory cache on resume.
 * Populates the cache so metadata is available for display (e.g. the
 * agent banner) and re-appended on session exit via reAppendSessionMetadata.
 */
export declare function restoreSessionMetadata(meta: {
    customTitle?: string;
    tag?: string;
    agentName?: string;
    agentColor?: string;
    agentSetting?: string;
    mode?: 'coordinator' | 'normal';
    worktreeSession?: PersistedWorktreeSession | null;
    prNumber?: number;
    prUrl?: string;
    prRepository?: string;
}): void;
/**
 * Clear all cached session metadata (title, tag, agent name/color).
 * Called when /clear creates a new session so stale metadata
 * from the previous session does not leak into the new one.
 */
export declare function clearSessionMetadata(): void;
/**
 * Re-append cached session metadata (custom title, tag) to the end of the
 * transcript file. Call this after compaction so the metadata stays within
 * the 16KB tail window that readLiteMetadata reads during progressive loading.
 * Without this, enough post-compaction messages can push the metadata entry
 * out of the window, causing `--resume` to show the auto-generated firstPrompt
 * instead of the user-set session name.
 */
export declare function reAppendSessionMetadata(): void;
export declare function saveAgentName(sessionId: UUID, agentName: string, fullPath?: string, source?: 'user' | 'auto'): Promise<void>;
export declare function saveAgentColor(sessionId: UUID, agentColor: string, fullPath?: string): Promise<void>;
/**
 * Cache the session agent setting. Written to disk by materializeSessionFile
 * on the first user message, and re-stamped by reAppendSessionMetadata on exit.
 * Cache-only here to avoid creating metadata-only session files at startup.
 */
export declare function saveAgentSetting(agentSetting: string): void;
/**
 * Cache a session title set at startup (--name). Written to disk by
 * materializeSessionFile on the first user message. Cache-only here so no
 * orphan metadata-only file is created before the session ID is finalized.
 */
export declare function cacheSessionTitle(customTitle: string): void;
/**
 * Cache the session mode. Written to disk by materializeSessionFile on the
 * first user message, and re-stamped by reAppendSessionMetadata on exit.
 * Cache-only here to avoid creating metadata-only session files at startup.
 */
export declare function saveMode(mode: 'coordinator' | 'normal'): void;
/**
 * Record the session's worktree state for --resume. Written to disk by
 * materializeSessionFile on the first user message and re-stamped by
 * reAppendSessionMetadata on exit. Pass null when exiting a worktree
 * so --resume knows not to cd back into it.
 */
export declare function saveWorktreeState(worktreeSession: PersistedWorktreeSession | null): void;
/**
 * Extracts the session ID from a log.
 * For lite logs, uses the sessionId field directly.
 * For full logs, extracts from the first message.
 */
export declare function getSessionIdFromLog(log: LogOption): UUID | undefined;
/**
 * Checks if a log is a lite log that needs full loading.
 * Lite logs have messages: [] and sessionId set.
 */
export declare function isLiteLog(log: LogOption): boolean;
/**
 * Loads full messages for a lite log by reading its JSONL file.
 * Returns a new LogOption with populated messages array.
 * If the log is already full or loading fails, returns the original log.
 */
export declare function loadFullLog(log: LogOption): Promise<LogOption>;
/**
 * Searches for sessions by custom title match.
 * Returns matches sorted by recency (newest first).
 * Uses case-insensitive matching for better UX.
 * Deduplicates by sessionId (keeps most recent per session).
 * Searches across same-repo worktrees by default.
 */
export declare function searchSessionsByCustomTitle(query: string, options?: {
    limit?: number;
    exact?: boolean;
}): Promise<LogOption[]>;
/**
 * Loads all messages, summaries, and file history snapshots from a transcript file.
 * Returns the messages, summaries, custom titles, tags, file history snapshots, and attribution snapshots.
 */
export declare function loadTranscriptFile(filePath: string, opts?: {
    keepAllLeaves?: boolean;
}): Promise<{
    messages: Map<UUID, TranscriptMessage>;
    summaries: Map<UUID, string>;
    customTitles: Map<UUID, string>;
    tags: Map<UUID, string>;
    agentNames: Map<UUID, string>;
    agentColors: Map<UUID, string>;
    agentSettings: Map<UUID, string>;
    prNumbers: Map<UUID, number>;
    prUrls: Map<UUID, string>;
    prRepositories: Map<UUID, string>;
    modes: Map<UUID, string>;
    worktreeStates: Map<UUID, PersistedWorktreeSession | null>;
    fileHistorySnapshots: Map<UUID, FileHistorySnapshotMessage>;
    attributionSnapshots: Map<UUID, AttributionSnapshotMessage>;
    contentReplacements: Map<UUID, ContentReplacementRecord[]>;
    agentContentReplacements: Map<AgentId, ContentReplacementRecord[]>;
    contextCollapseCommits: ContextCollapseCommitEntry[];
    contextCollapseSnapshot: ContextCollapseSnapshotEntry | undefined;
    leafUuids: Set<UUID>;
}>;
/**
 * Clear the memoized session messages cache.
 * Call after compaction when old message UUIDs are no longer valid.
 */
export declare function clearSessionMessagesCache(): void;
/**
 * Check if a message UUID exists in the session storage
 */
export declare function doesMessageExistInSession(sessionId: UUID, messageUuid: UUID): Promise<boolean>;
export declare function getLastSessionLog(sessionId: UUID): Promise<LogOption | null>;
/**
 * Loads the list of message logs
 * @param limit Optional limit on number of session files to load
 * @returns List of message logs sorted by date
 */
export declare function loadMessageLogs(limit?: number): Promise<LogOption[]>;
/**
 * Loads message logs from all project directories.
 * @param limit Optional limit on number of session files to load per project (used when no index exists)
 * @returns List of message logs sorted by date
 */
export declare function loadAllProjectsMessageLogs(limit?: number, options?: {
    skipIndex?: boolean;
    initialEnrichCount?: number;
}): Promise<LogOption[]>;
export declare function loadAllProjectsMessageLogsProgressive(limit?: number, initialEnrichCount?: number): Promise<SessionLogResult>;
/**
 * Loads message logs from all worktrees of the same git repository.
 * Falls back to loadMessageLogs if no worktrees provided.
 *
 * Uses pure filesystem metadata for fast loading.
 *
 * @param worktreePaths Array of worktree paths (from getWorktreePaths)
 * @param limit Optional limit on number of session files to load per project
 * @returns List of message logs sorted by date
 */
/**
 * Result of loading session logs with progressive enrichment support.
 */
export type SessionLogResult = {
    /** Enriched logs ready for display */
    logs: LogOption[];
    /** Full stat-only list for progressive loading (call enrichLogs to get more) */
    allStatLogs: LogOption[];
    /** Index into allStatLogs where progressive loading should continue from */
    nextIndex: number;
};
export declare function loadSameRepoMessageLogs(worktreePaths: string[], limit?: number, initialEnrichCount?: number): Promise<LogOption[]>;
export declare function loadSameRepoMessageLogsProgressive(worktreePaths: string[], limit?: number, initialEnrichCount?: number): Promise<SessionLogResult>;
/**
 * Retrieves the transcript for a specific agent by agentId.
 * Directly loads the agent-specific transcript file.
 * @param agentId The agent ID to search for
 * @returns The conversation chain and budget replacement records for the agent,
 *          or null if not found
 */
export declare function getAgentTranscript(agentId: AgentId): Promise<{
    messages: Message[];
    contentReplacements: ContentReplacementRecord[];
} | null>;
/**
 * Extract agent IDs from progress messages in the conversation.
 * Agent/skill progress messages have type 'progress' with data.type
 * 'agent_progress' or 'skill_progress' and data.agentId.
 * This captures sync agents that emit progress messages during execution.
 */
export declare function extractAgentIdsFromMessages(messages: Message[]): string[];
/**
 * Extract teammate transcripts directly from AppState tasks.
 * In-process teammates store their messages in task.messages,
 * which is more reliable than loading from disk since each teammate turn
 * uses a random agentId for transcript storage.
 */
export declare function extractTeammateTranscriptsFromTasks(tasks: {
    [taskId: string]: {
        type: string;
        identity?: {
            agentId: string;
        };
        messages?: Message[];
    };
}): {
    [agentId: string]: Message[];
};
/**
 * Load subagent transcripts for the given agent IDs
 */
export declare function loadSubagentTranscripts(agentIds: string[]): Promise<{
    [agentId: string]: Message[];
}>;
export declare function loadAllSubagentTranscriptsFromDisk(): Promise<{
    [agentId: string]: Message[];
}>;
export declare function isLoggableMessage(m: Message): boolean;
export declare function cleanMessagesForLogging(messages: Message[], allMessages?: readonly Message[]): Transcript;
/**
 * Gets a log by its index
 * @param index Index in the sorted list of logs (0-based)
 * @returns Log data or null if not found
 */
export declare function getLogByIndex(index: number): Promise<LogOption | null>;
/**
 * Looks up unresolved tool uses in the transcript by tool_use_id.
 * Returns the assistant message containing the tool_use, or null if not found
 * or the tool call already has a tool_result.
 */
export declare function findUnresolvedToolUse(toolUseId: string): Promise<AssistantMessage | null>;
/**
 * Gets all session JSONL files in a project directory with their stats.
 * Returns a map of sessionId → {path, mtime, ctime, size}.
 * Stats are batched via Promise.all to avoid serial syscalls in the hot loop.
 */
export declare function getSessionFilesWithMtime(projectDir: string): Promise<Map<string, {
    path: string;
    mtime: number;
    ctime: number;
    size: number;
}>>;
/**
 * Loads all logs from a single session file with full message data.
 * Builds a LogOption for each leaf message in the file.
 */
export declare function loadAllLogsFromSessionFile(sessionFile: string, projectPathOverride?: string): Promise<LogOption[]>;
/**
 * Returns lite LogOption[] from pure filesystem metadata (stat only).
 * No file reads — instant. Call `enrichLogs` to enrich
 * visible sessions with firstPrompt, gitBranch, customTitle, etc.
 */
export declare function getSessionFilesLite(projectDir: string, limit?: number, projectPath?: string): Promise<LogOption[]>;
/**
 * Enriches enough lite logs from `allLogs` (starting at `startIndex`) to
 * produce `count` valid results. Returns the valid enriched logs and the
 * index where scanning stopped (for progressive loading to continue from).
 */
export declare function enrichLogs(allLogs: LogOption[], startIndex: number, count: number): Promise<{
    logs: LogOption[];
    nextIndex: number;
}>;
export {};
//# sourceMappingURL=sessionStorage.d.ts.map