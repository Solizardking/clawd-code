import { z } from 'zod/v4';
import type { Tool } from '../../Tool.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.infer<OutputSchema>;
export declare const EnterPlanModeTool: Tool<InputSchema, Output>;
export {};
//# sourceMappingURL=EnterPlanModeTool.d.ts.map