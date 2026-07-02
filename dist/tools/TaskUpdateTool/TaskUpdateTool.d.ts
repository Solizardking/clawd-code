import { z } from 'zod/v4';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const TaskUpdateTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    userFacingName(): string;
    shouldDefer: true;
    isEnabled(): boolean;
    isConcurrencySafe(): true;
    toAutoClassifierInput(input: z.infer<Input>): string;
    renderToolUseMessage(): null;
    call({ taskId, subject, description, activeForm, status, owner, addBlocks, addBlockedBy, metadata, }: z.infer<Input>, context: import("../../Tool.js").ToolUseContext): Promise<{
        data: {
            success: boolean;
            taskId: z.infer<Input>;
            updatedFields: never[];
            error: string;
            statusChange?: undefined;
            verificationNudgeNeeded?: undefined;
        };
    } | {
        data: {
            success: boolean;
            taskId: z.infer<Input>;
            updatedFields: string[];
            error: string | undefined;
            statusChange: {
                from: any;
                to: string;
            } | undefined;
            verificationNudgeNeeded?: undefined;
        };
    } | {
        data: {
            success: boolean;
            taskId: z.infer<Input>;
            updatedFields: string[];
            statusChange: {
                from: any;
                to: any;
            } | undefined;
            verificationNudgeNeeded: boolean;
            error?: undefined;
        };
    }>;
    mapToolResultToToolResultBlockParam(content: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: any;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: import("../../Tool.js").ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => string;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=TaskUpdateTool.d.ts.map