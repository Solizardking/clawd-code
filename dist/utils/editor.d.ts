/**
 * Classify the editor as GUI or not. Returns the matched GUI family name
 * for goto-line argv selection, or undefined for terminal editors.
 * Note: this is classification only — spawn the user's actual binary, not
 * this return value, so `code-insiders` / absolute paths are preserved.
 *
 * Uses basename so /home/alice/code/bin/nvim doesn't match 'code' via the
 * directory component. code-insiders → still matches 'code', /usr/bin/code →
 * 'code' → matches.
 */
export declare function classifyGuiEditor(editor: string): string | undefined;
/**
 * Launch a file in the user's external editor.
 *
 * For GUI editors (code, subl, etc.): spawns detached — the editor opens
 * in a separate window and Claude Code stays interactive.
 *
 * For terminal editors (vim, nvim, nano, etc.): blocks via Ink's alt-screen
 * handoff until the editor exits. This is the same dance as editFileInEditor()
 * in promptEditor.ts, minus the read-back.
 *
 * Returns true if the editor was launched, false if no editor is available.
 */
export declare function openFileInExternalEditor(filePath: string, line?: number): boolean;
export declare const getExternalEditor: any;
//# sourceMappingURL=editor.d.ts.map