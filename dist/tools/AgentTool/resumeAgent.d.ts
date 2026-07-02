import type { CanUseToolFn } from '../../hooks/useCanUseTool.js';
import type { ToolUseContext } from '../../Tool.js';
export type ResumeAgentResult = {
    agentId: string;
    description: string;
    outputFile: string;
};
export declare function resumeAgentBackground({ agentId, prompt, toolUseContext, canUseTool, invokingRequestId, }: {
    agentId: string;
    prompt: string;
    toolUseContext: ToolUseContext;
    canUseTool: CanUseToolFn;
    invokingRequestId?: string;
}): Promise<ResumeAgentResult>;
//# sourceMappingURL=resumeAgent.d.ts.map