import { z } from 'zod/v4';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const TodoWriteTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    strict: true;
    description(): Promise<string>;
    prompt(): Promise<string>;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    userFacingName(): string;
    shouldDefer: true;
    isEnabled(): boolean;
    toAutoClassifierInput(input: z.infer<Input>): string;
    checkPermissions(input: z.infer<Input>): Promise<{
        behavior: "allow";
        updatedInput: z.infer<Input>;
    }>;
    renderToolUseMessage(): null;
    call({ todos }: z.infer<Input>, context: import("../../Tool.js").ToolUseContext): Promise<{
        data: {
            oldTodos: any;
            newTodos: z.infer<Input>;
            verificationNudgeNeeded: boolean;
        };
    }>;
    mapToolResultToToolResultBlockParam({ verificationNudgeNeeded }: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: string;
    };
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: (_input?: unknown) => boolean;
    isReadOnly: (_input?: unknown) => boolean;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: z.infer<Input>) => Promise<{
        behavior: "allow";
        updatedInput: z.infer<Input>;
    }>;
    toAutoClassifierInput: (input: z.infer<Input>) => string;
    userFacingName: () => string;
};
export {};
//# sourceMappingURL=TodoWriteTool.d.ts.map