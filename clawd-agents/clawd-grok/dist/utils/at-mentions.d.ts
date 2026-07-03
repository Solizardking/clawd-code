export interface AtMentionedFile {
    raw: string;
    filePath: string;
    startLine?: number;
    endLine?: number;
}
export interface ProcessedMentions {
    enhancedMessage: string;
    mentionedFiles: string[];
}
export declare function extractAtMentionedFiles(text: string): AtMentionedFile[];
export declare function processAtMentions(text: string, cwd: string): ProcessedMentions;
