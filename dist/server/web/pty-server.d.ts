import type { IncomingMessage } from "http";
import { SessionManager } from "./session-manager.js";
declare const app: any;
declare const server: import("http").Server<typeof IncomingMessage, typeof import("http").ServerResponse>;
declare const sessionManager: SessionManager;
declare const wss: any;
export { app, server, sessionManager, wss };
//# sourceMappingURL=pty-server.d.ts.map