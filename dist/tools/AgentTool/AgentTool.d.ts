export declare const inputSchema: () => any;
export declare const outputSchema: () => any;
export type RemoteLaunchedOutput = {
    status: 'remote_launched';
    taskId: string;
    sessionUrl: string;
    description: string;
    prompt: string;
    outputFile: string;
};
import type { AgentToolProgress, ShellProgress } from '../../types/tools.js';
export type Progress = AgentToolProgress | ShellProgress;
export declare const AgentTool: any;
//# sourceMappingURL=AgentTool.d.ts.map