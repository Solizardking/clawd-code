import { z } from 'zod/v4';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const TaskGetTool: Omit<{
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
    isReadOnly(): true;
    toAutoClassifierInput(input: z.infer<Input>): any;
    renderToolUseMessage(): null;
    call({ taskId }: z.infer<Input>): Promise<{
        data: {
            task: null;
        };
    } | {
        data: {
            task: {
                id: any;
                subject: any;
                description: any;
                status: any;
                blocks: any;
                blockedBy: any;
            };
        };
    }>;
    mapToolResultToToolResultBlockParam(content: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: import("../../Tool.js").ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (input: z.infer<Input>) => any;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=TaskGetTool.d.ts.map