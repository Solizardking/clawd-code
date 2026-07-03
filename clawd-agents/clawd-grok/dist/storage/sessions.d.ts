import type { AgentMode, SessionInfo, SessionRecap, WorkspaceInfo } from "../types/index";
export declare class SessionStore {
    private readonly workspace;
    constructor(cwd: string);
    getWorkspace(): WorkspaceInfo;
    openSession(selector: string | undefined, model: string, mode: AgentMode, cwd: string): SessionInfo;
    createSession(model: string, mode: AgentMode, cwd: string): SessionInfo;
    getLatestSession(): SessionInfo | null;
    getSessionById(id: string): SessionInfo | null;
    getRequiredSession(id: string): SessionInfo;
    setTitle(id: string, title: string | null): void;
    setRecap(id: string, recap: SessionRecap | null): void;
    setModel(id: string, model: string): void;
    setMode(id: string, mode: AgentMode): void;
    touchSession(id: string, cwd: string): void;
}
