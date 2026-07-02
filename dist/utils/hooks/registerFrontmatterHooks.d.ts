import type { AppState } from 'src/state/AppState.js';
import type { HooksSettings } from '../settings/types.js';
/**
 * Register hooks from frontmatter (agent or skill) into session-scoped hooks.
 * These hooks will be active for the duration of the session/agent and cleaned up
 * when the session/agent ends.
 *
 * @param setAppState Function to update app state
 * @param sessionId Session ID to scope the hooks (agent ID for agents, session ID for skills)
 * @param hooks The hooks settings from frontmatter
 * @param sourceName Human-readable source name for logging (e.g., "agent 'my-agent'")
 * @param isAgent If true, converts Stop hooks to SubagentStop (since subagents trigger SubagentStop, not Stop)
 */
export declare function registerFrontmatterHooks(setAppState: (updater: (prev: AppState) => AppState) => void, sessionId: string, hooks: HooksSettings, sourceName: string, isAgent?: boolean): void;
//# sourceMappingURL=registerFrontmatterHooks.d.ts.map