import type { SessionActivity, SessionSpawner } from './types.js';
/**
 * Sanitize a session ID for use in file names.
 * Strips any characters that could cause path traversal (e.g. `../`, `/`)
 * or other filesystem issues, replacing them with underscores.
 */
export declare function safeFilenameId(id: string): string;
/**
 * A control_request emitted by the child CLI when it needs permission to
 * execute a **specific** tool invocation (not a general capability check).
 * The bridge forwards this to the server so the user can approve/deny.
 */
export type PermissionRequest = {
    type: 'control_request';
    request_id: string;
    request: {
        /** Per-invocation permission check — "may I run this tool with these inputs?" */
        subtype: 'can_use_tool';
        tool_name: string;
        input: Record<string, unknown>;
        tool_use_id: string;
    };
};
type SessionSpawnerDeps = {
    execPath: string;
    /**
     * Arguments that must precede the CLI flags when spawning. Empty for
     * compiled binaries (where execPath is the claude binary itself); contains
     * the script path (process.argv[1]) for npm installs where execPath is the
     * node runtime. Without this, node sees --sdk-url as a node option and
     * exits with "bad option: --sdk-url" (see anthropics/claude-code#28334).
     */
    scriptArgs: string[];
    env: NodeJS.ProcessEnv;
    verbose: boolean;
    sandbox: boolean;
    debugFile?: string;
    permissionMode?: string;
    onDebug: (msg: string) => void;
    onActivity?: (sessionId: string, activity: SessionActivity) => void;
    onPermissionRequest?: (sessionId: string, request: PermissionRequest, accessToken: string) => void;
};
declare function extractActivities(line: string, sessionId: string, onDebug: (msg: string) => void): SessionActivity[];
export declare function createSessionSpawner(deps: SessionSpawnerDeps): SessionSpawner;
export { extractActivities as _extractActivitiesForTesting };
//# sourceMappingURL=sessionRunner.d.ts.map