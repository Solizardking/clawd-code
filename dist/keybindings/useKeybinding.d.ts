import type { KeybindingContextName } from './types.js';
type Options = {
    /** Which context this binding belongs to (default: 'Global') */
    context?: KeybindingContextName;
    /** Only handle when active (like useInput's isActive) */
    isActive?: boolean;
};
/**
 * Ink-native hook for handling a keybinding.
 *
 * The handler stays in the component (React way).
 * The binding (keystroke → action) comes from config.
 *
 * Supports chord sequences (e.g., "ctrl+k ctrl+s"). When a chord is started,
 * the hook will manage the pending state automatically.
 *
 * Uses stopImmediatePropagation() to prevent other handlers from firing
 * once this binding is handled.
 *
 * @example
 * ```tsx
 * useKeybinding('app:toggleTodos', () => {
 *   setShowTodos(prev => !prev)
 * }, { context: 'Global' })
 * ```
 */
export declare function useKeybinding(action: string, handler: () => void | false | Promise<void>, options?: Options): void;
/**
 * Handle multiple keybindings in one hook (reduces useInput calls).
 *
 * Supports chord sequences. When a chord is started, the hook will
 * manage the pending state automatically.
 *
 * @example
 * ```tsx
 * useKeybindings({
 *   'chat:submit': () => handleSubmit(),
 *   'chat:cancel': () => handleCancel(),
 * }, { context: 'Chat' })
 * ```
 */
export declare function useKeybindings(handlers: Record<string, () => void | false | Promise<void>>, options?: Options): void;
export {};
//# sourceMappingURL=useKeybinding.d.ts.map