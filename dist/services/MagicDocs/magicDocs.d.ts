/**
 * Magic Docs automatically maintains markdown documentation files marked with special headers.
 * When a file with "# MAGIC DOC: [title]" is read, it runs periodically in the background
 * using a forked subagent to update the document with new learnings from the conversation.
 *
 * See docs/magic-docs.md for more information.
 */
export declare function clearTrackedMagicDocs(): void;
/**
 * Detect if a file content contains a Magic Doc header
 * Returns an object with title and optional instructions, or null if not a magic doc
 */
export declare function detectMagicDocHeader(content: string): {
    title: string;
    instructions?: string;
} | null;
/**
 * Register a file as a Magic Doc when it's read
 * Only registers once per file path - the hook always reads latest content
 */
export declare function registerMagicDoc(filePath: string): void;
export declare function initMagicDocs(): Promise<void>;
//# sourceMappingURL=magicDocs.d.ts.map