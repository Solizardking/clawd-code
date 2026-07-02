/**
 * User keybinding configuration loader with hot-reload support.
 *
 * Loads keybindings from ~/.claude/keybindings.json and watches
 * for changes to reload them automatically.
 *
 * NOTE: User keybinding customization is currently only available for
 * Anthropic employees (USER_TYPE === 'ant'). External users always
 * use the default bindings.
 */
import type { ParsedBinding } from './types.js';
import { type KeybindingWarning } from './validate.js';
/**
 * Check if keybinding customization is enabled.
 *
 * Returns true if the tengu_keybinding_customization_release GrowthBook gate is enabled.
 *
 * This function is exported so other parts of the codebase (e.g., /doctor)
 * can check the same condition consistently.
 */
export declare function isKeybindingCustomizationEnabled(): boolean;
/**
 * Result of loading keybindings, including any validation warnings.
 */
export type KeybindingsLoadResult = {
    bindings: ParsedBinding[];
    warnings: KeybindingWarning[];
};
/**
 * Get the path to the user keybindings file.
 */
export declare function getKeybindingsPath(): string;
/**
 * Load and parse keybindings from user config file.
 * Returns merged default + user bindings along with validation warnings.
 *
 * For external users, always returns default bindings only.
 * User customization is currently gated to Anthropic employees.
 */
export declare function loadKeybindings(): Promise<KeybindingsLoadResult>;
/**
 * Load keybindings synchronously (for initial render).
 * Uses cached value if available.
 */
export declare function loadKeybindingsSync(): ParsedBinding[];
/**
 * Load keybindings synchronously with validation warnings.
 * Uses cached values if available.
 *
 * For external users, always returns default bindings only.
 * User customization is currently gated to Anthropic employees.
 */
export declare function loadKeybindingsSyncWithWarnings(): KeybindingsLoadResult;
/**
 * Initialize file watching for keybindings.json.
 * Call this once when the app starts.
 *
 * For external users, this is a no-op since user customization is disabled.
 */
export declare function initializeKeybindingWatcher(): Promise<void>;
/**
 * Clean up the file watcher.
 */
export declare function disposeKeybindingWatcher(): void;
/**
 * Subscribe to keybinding changes.
 * The listener receives the new parsed bindings when the file changes.
 */
export declare const subscribeToKeybindingChanges: (listener: (result: KeybindingsLoadResult) => void) => () => void;
/**
 * Get the cached keybinding warnings.
 * Returns empty array if no warnings or bindings haven't been loaded yet.
 */
export declare function getCachedKeybindingWarnings(): KeybindingWarning[];
/**
 * Reset internal state for testing.
 */
export declare function resetKeybindingLoaderForTesting(): void;
//# sourceMappingURL=loadUserBindings.d.ts.map