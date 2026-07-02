import type { DirectConnectConfig } from './directConnectManager.js';
/**
 * Errors thrown by createDirectConnectSession when the connection fails.
 */
export declare class DirectConnectError extends Error {
    constructor(message: string);
}
/**
 * Create a session on a direct-connect server.
 *
 * Posts to `${serverUrl}/sessions`, validates the response, and returns
 * a DirectConnectConfig ready for use by the REPL or headless runner.
 *
 * Throws DirectConnectError on network, HTTP, or response-parsing failures.
 */
export declare function createDirectConnectSession({ serverUrl, authToken, cwd, dangerouslySkipPermissions, }: {
    serverUrl: string;
    authToken?: string;
    cwd: string;
    dangerouslySkipPermissions?: boolean;
}): Promise<{
    config: DirectConnectConfig;
    workDir?: string;
}>;
//# sourceMappingURL=createDirectConnectSession.d.ts.map