import { z } from 'zod/v4';
import type { PermissionDecision } from '../../utils/permissions/PermissionResult.js';
import { getToolUseSummary, renderToolResultMessage, renderToolUseMessage, renderToolUseProgressMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const WebFetchTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    shouldDefer: true;
    description(input: z.infer<Input>): Promise<string>;
    userFacingName(): string;
    getToolUseSummary: typeof getToolUseSummary;
    getActivityDescription(input: any): string;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    toAutoClassifierInput(input: z.infer<Input>): any;
    checkPermissions(input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext): Promise<PermissionDecision>;
    prompt(_options: {
        getToolPermissionContext: () => Promise<import("../../Tool.js").ToolPermissionContext>;
        tools: import("../../Tool.js").Tools;
        agents: import("../AgentTool/loadAgentsDir.js").AgentDefinition[];
        allowedAgentTypes?: string[];
    }): Promise<string>;
    validateInput(input: z.infer<Input>): Promise<{
        result: false;
        message: string;
        meta: {
            reason: string;
        };
        errorCode: number;
    } | {
        result: true;
        message?: undefined;
        meta?: undefined;
        errorCode?: undefined;
    }>;
    renderToolUseMessage: typeof renderToolUseMessage;
    renderToolUseProgressMessage: typeof renderToolUseProgressMessage;
    renderToolResultMessage: typeof renderToolResultMessage;
    call({ url, prompt }: z.infer<Input>, { abortController, options: { isNonInteractiveSession } }: import("../../Tool.js").ToolUseContext): Promise<{
        data: z.infer<any>;
    }>;
    mapToolResultToToolResultBlockParam({ result }: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: z.infer<any>;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>, context: import("../../Tool.js").ToolUseContext) => Promise<PermissionDecision>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=WebFetchTool.d.ts.map