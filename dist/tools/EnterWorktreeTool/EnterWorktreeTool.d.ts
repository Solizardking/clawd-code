import { z } from 'zod/v4';
import type { Tool } from '../../Tool.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const EnterWorktreeTool: Tool<InputSchema, Output>;
export {};
//# sourceMappingURL=EnterWorktreeTool.d.ts.map