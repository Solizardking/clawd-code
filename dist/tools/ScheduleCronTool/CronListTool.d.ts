import { z } from 'zod/v4';
import { renderListResultMessage, renderListToolUseMessage } from './UI.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type ListOutput = z.infer<OutputSchema>;
export declare const CronListTool: Omit<{
    name: string;
    searchHint: string;
    maxResultSizeChars: number;
    shouldDefer: true;
    readonly inputSchema: InputSchema;
    readonly outputSchema: OutputSchema;
    isEnabled(): boolean;
    isConcurrencySafe(): true;
    isReadOnly(): true;
    description(): Promise<string>;
    prompt(): Promise<string>;
    call(): Promise<{
        data: {
            jobs: {
                durable?: boolean | undefined;
                recurring?: boolean | undefined;
                id: string;
                cron: string;
                humanSchedule: string;
                prompt: string;
            }[];
        };
    }>;
    mapToolResultToToolResultBlockParam(output: z.infer<any>, toolUseID: string): {
        tool_use_id: string;
        type: string;
        content: any;
    };
    renderToolUseMessage: typeof renderListToolUseMessage;
    renderToolResultMessage: typeof renderListResultMessage;
}, "isEnabled" | "isConcurrencySafe" | "isReadOnly" | "isDestructive" | "checkPermissions" | "toAutoClassifierInput" | "userFacingName"> & {
    isEnabled: () => boolean;
    isConcurrencySafe: () => true;
    isReadOnly: () => true;
    isDestructive: (_input?: unknown) => boolean;
    checkPermissions: (input: {
        [key: string]: unknown;
    }, _ctx?: import("../../Tool.js").ToolUseContext) => Promise<import("../../types/permissions.js").PermissionResult>;
    toAutoClassifierInput: (_input?: unknown) => string;
    userFacingName: (_input?: unknown) => string;
};
export {};
//# sourceMappingURL=CronListTool.d.ts.map