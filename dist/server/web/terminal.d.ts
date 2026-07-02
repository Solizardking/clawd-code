/**
 * Claude Code — terminal-in-browser
 *
 * WebSocket protocol (matches src/server/web/session-manager.ts):
 *
 *  Server → client (text, JSON):
 *    { type: "connected", sessionId: string }
 *    { type: "pong" }
 *    { type: "error", message: string }
 *    { type: "exit", exitCode: number, signal: number | undefined }
 *
 *  Server → client (text, raw):
 *    PTY output — plain string, written directly to xterm
 *
 *  Client → server (text):
 *    { type: "resize", cols: number, rows: number }
 *    { type: "ping" }
 *    raw terminal input string
 */
import '@xterm/xterm/css/xterm.css';
import './styles.css';
//# sourceMappingURL=terminal.d.ts.map