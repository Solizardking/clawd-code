/**
 * Plugin-hint recommendations.
 *
 * Companion to lspRecommendation.ts: where LSP recommendations are triggered
 * by file edits, plugin hints are triggered by CLIs/SDKs emitting a
 * `<claude-code-hint />` tag to stderr (detected by the Bash/PowerShell tools).
 *
 * State persists in GlobalConfig.claudeCodeHints — a show-once record per
 * plugin and a disabled flag (user picked "don't show again"). Official-
 * marketplace filtering is hardcoded for v1.
 */
import { type ClaudeCodeHint } from '../claudeCodeHints.js';
export type PluginHintRecommendation = {
    pluginId: string;
    pluginName: string;
    marketplaceName: string;
    pluginDescription?: string;
    sourceCommand: string;
};
/**
 * Pre-store gate called by shell tools when a `type="plugin"` hint is detected.
 * Drops the hint if:
 *
 *  - a dialog has already been shown this session
 *  - user has disabled hints
 *  - the shown-plugins list has hit the config-growth cap
 *  - plugin slug doesn't parse as `name@marketplace`
 *  - marketplace isn't official (hardcoded for v1)
 *  - plugin is already installed
 *  - plugin was already shown in a prior session
 *
 * Synchronous on purpose — shell tools shouldn't await a marketplace lookup
 * just to strip a stderr line. The async marketplace-cache check happens
 * later in resolvePluginHint (hook side).
 */
export declare function maybeRecordPluginHint(hint: ClaudeCodeHint): void;
/** Test-only reset. */
export declare function _resetHintRecommendationForTesting(): void;
/**
 * Resolve the pending hint to a renderable recommendation. Runs the async
 * marketplace lookup that the sync pre-store gate skipped. Returns null if
 * the plugin isn't in the marketplace cache — the hint is discarded.
 */
export declare function resolvePluginHint(hint: ClaudeCodeHint): Promise<PluginHintRecommendation | null>;
/**
 * Record that a prompt for this plugin was surfaced. Called regardless of
 * the user's yes/no response — show-once semantics.
 */
export declare function markHintPluginShown(pluginId: string): void;
/** Called when the user picks "don't show plugin installation hints again". */
export declare function disableHintRecommendations(): void;
//# sourceMappingURL=hintRecommendation.d.ts.map