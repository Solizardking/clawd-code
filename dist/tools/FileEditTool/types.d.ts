import { z } from 'zod/v4';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
export type FileEditInput = z.output<InputSchema>;
export type EditInput = Omit<FileEditInput, 'file_path'>;
export type FileEdit = {
    old_string: string;
    new_string: string;
    replace_all: boolean;
};
export declare const hunkSchema: () => any;
export declare const gitDiffSchema: () => any;
declare const outputSchema: () => any;
type OutputSchema = ReturnType<typeof outputSchema>;
export type FileEditOutput = z.infer<OutputSchema>;
export { inputSchema, outputSchema };
//# sourceMappingURL=types.d.ts.map