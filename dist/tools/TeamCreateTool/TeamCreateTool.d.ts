import { z } from 'zod/v4';
import type { Tool } from '../../Tool.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type Output = {
    team_name: string;
    team_file_path: string;
    lead_agent_id: string;
};
export type Input = z.infer<InputSchema>;
export declare const TeamCreateTool: Tool<InputSchema, Output>;
export {};
//# sourceMappingURL=TeamCreateTool.d.ts.map