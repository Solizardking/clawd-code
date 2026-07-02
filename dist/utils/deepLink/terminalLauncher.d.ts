/**
 * Terminal Launcher
 *
 * Detects the user's preferred terminal emulator and launches Claude Code
 * inside it. Used by the deep link protocol handler when invoked by the OS
 * (i.e., not already running inside a terminal).
 *
 * Platform support:
 *   macOS  — Terminal.app, iTerm2, Ghostty, Kitty, Alacritty, WezTerm
 *   Linux  — $TERMINAL, x-terminal-emulator, gnome-terminal, konsole, etc.
 *   Windows — Windows Terminal (wt.exe), PowerShell, cmd.exe
 */
export type TerminalInfo = {
    name: string;
    command: string;
};
/**
 * Detect the user's preferred terminal emulator.
 */
export declare function detectTerminal(): Promise<TerminalInfo | null>;
/**
 * Launch Claude Code in the detected terminal emulator.
 *
 * Pure argv paths (no shell, user input never touches an interpreter):
 *   macOS — Ghostty, Alacritty, Kitty, WezTerm (via open -na --args)
 *   Linux — all ten in LINUX_TERMINALS
 *   Windows — Windows Terminal
 *
 * Shell-string paths (user input is shell-quoted and relied upon):
 *   macOS — iTerm2, Terminal.app (AppleScript `write text` / `do script`
 *           are inherently shell-interpreted; no argv interface exists)
 *   Windows — PowerShell -Command, cmd.exe /k (no argv exec mode)
 *
 * For pure-argv paths: claudePath, --prefill, query, cwd travel as distinct
 * argv elements end-to-end. No sh -c. No shellQuote(). The terminal does
 * chdir(cwd) and execvp(claude, argv). Spaces/quotes/metacharacters in
 * query or cwd are preserved by argv boundaries with zero interpretation.
 */
export declare function launchInTerminal(claudePath: string, action: {
    query?: string;
    cwd?: string;
    repo?: string;
    lastFetchMs?: number;
}): Promise<boolean>;
//# sourceMappingURL=terminalLauncher.d.ts.map