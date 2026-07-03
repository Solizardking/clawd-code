import type { BashTool } from "../tools/bash";
import type { ScheduleManager } from "../tools/schedule";
import type { AgentMode, TaskRequest, ToolResult } from "../types/index";
import { type CustomSubagentConfig } from "../utils/settings";
import type { XaiProvider } from "./client";
interface CreateToolsOptions {
    runTask?: (request: TaskRequest, abortSignal?: AbortSignal) => Promise<ToolResult>;
    runDelegation?: (request: TaskRequest, abortSignal?: AbortSignal) => Promise<ToolResult>;
    readDelegation?: (id: string) => Promise<ToolResult>;
    listDelegations?: () => Promise<ToolResult>;
    scheduleManager?: ScheduleManager;
    subagents?: CustomSubagentConfig[];
    sendTelegramFile?: (filePath: string) => Promise<ToolResult>;
    sessionId?: string;
    toolsets?: string[];
}
export declare function createTools(bash: BashTool, provider: XaiProvider, mode?: AgentMode, options?: CreateToolsOptions): ToolSet;
export {};
