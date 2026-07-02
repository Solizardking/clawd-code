import type { KeybindingContextName } from './types.js';
/**
 * Hook to get the display text for a configured shortcut.
 * Returns the configured binding or a fallback if unavailable.
 *
 * @param action - The action name (e.g., 'app:toggleTranscript')
 * @param context - The keybinding context (e.g., 'Global')
 * @param fallback - Fallback text if keybinding context unavailable
 * @returns The configured shortcut display text
 *
 * @example
 * const expandShortcut = useShortcutDisplay('app:toggleTranscript', 'Global', 'ctrl+o')
 * // Returns the user's configured binding, or 'ctrl+o' as default
 */
export declare function useShortcutDisplay(action: string, context: KeybindingContextName, fallback: string): string;
//# sourceMappingURL=useShortcutDisplay.d.ts.map