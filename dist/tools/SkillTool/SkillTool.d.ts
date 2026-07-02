import type { Tool } from 'src/Tool.js';
import { z } from 'zod/v4';
export type { SkillToolProgress as Progress } from '../../types/tools.js';
import type { SkillToolProgress as Progress } from '../../types/tools.js';
export declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type Output = z.input<OutputSchema>;
export declare const SkillTool: Tool<InputSchema, Output, Progress>;
//# sourceMappingURL=SkillTool.d.ts.map