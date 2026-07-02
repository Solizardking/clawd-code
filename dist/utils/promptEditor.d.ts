import type { PastedContent } from './config.js';
export type EditorResult = {
    content: string | null;
    error?: string;
};
export declare function editFileInEditor(filePath: string): EditorResult;
export declare function editPromptInEditor(currentPrompt: string, pastedContents?: Record<number, PastedContent>): EditorResult;
//# sourceMappingURL=promptEditor.d.ts.map