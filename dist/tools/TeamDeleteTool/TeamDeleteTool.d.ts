import { z } from 'zod/v4';
import type { Tool } from '../../Tool.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type Output = {
    success: boolean;
    message: string;
    team_name?: string;
};
export type Input = z.infer<InputSchema>;
export declare const TeamDeleteTool: Tool<InputSchema, Output>;
export {};
//# sourceMappingURL=TeamDeleteTool.d.ts.map