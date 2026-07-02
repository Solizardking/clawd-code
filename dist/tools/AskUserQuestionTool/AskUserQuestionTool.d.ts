import { z } from 'zod/v4';
import type { Tool } from '../../Tool.js';
declare const questionOptionSchema: () => any;
declare const questionSchema: () => any;
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export declare const _sdkInputSchema: () => any;
export declare const _sdkOutputSchema: () => any;
export type Question = z.infer<ReturnType<typeof questionSchema>>;
export type QuestionOption = z.infer<ReturnType<typeof questionOptionSchema>>;
export type Output = z.infer<OutputSchema>;
export declare const AskUserQuestionTool: Tool<InputSchema, Output>;
export {};
//# sourceMappingURL=AskUserQuestionTool.d.ts.map