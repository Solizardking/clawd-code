/**
 * Built-in terminal panel toggled with Meta+J.
 *
 * Uses tmux for shell persistence: a separate tmux server with a per-instance
 * socket (e.g., "claude-panel-a1b2c3d4") holds the shell session. Each Claude
 * Code instance gets its own isolated terminal panel that persists within the
 * session but is destroyed when the instance exits.
 *
 * Meta+J is bound to detach-client inside tmux, so pressing it returns to
 * Claude Code while the shell keeps running. Next toggle re-attaches to the
 * same session.
 *
 * When tmux is not available, falls back to a non-persistent shell via spawnSync.
 *
 * Uses the same suspend-Ink pattern as the external editor (promptEditor.ts).
 */
/**
 * Get the tmux socket name for the terminal panel.
 * Uses a unique socket per Claude Code instance (based on session ID)
 * so that each instance has its own isolated terminal panel.
 */
export declare function getTerminalPanelSocket(): string;
/**
 * Return the singleton TerminalPanel, creating it lazily on first use.
 */
export declare function getTerminalPanel(): TerminalPanel;
declare class TerminalPanel {
    private hasTmux;
    private cleanupRegistered;
    toggle(): void;
    private checkTmux;
    private hasSession;
    private createSession;
    private attachSession;
    private showShell;
    /** Ensure a tmux session exists, creating one if needed. */
    private ensureSession;
    /** Fallback when tmux is not available — runs a non-persistent shell. */
    private runShellDirect;
}
export {};
//# sourceMappingURL=terminalPanel.d.ts.map