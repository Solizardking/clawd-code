/**
 * Split an identifier (camelCase, PascalCase, kebab-case, snake_case, or
 * path segments) into individual words.  Fragments of 2 chars or fewer are
 * discarded to avoid noise.
 */
export declare function splitIdentifier(name: string): string[];
/**
 * Build a list of keyterms for the voice_stream STT endpoint.
 *
 * Combines hardcoded global coding terms with session context (project name,
 * git branch, recent files) without any model calls.
 */
export declare function getVoiceKeyterms(recentFiles?: ReadonlySet<string>): Promise<string[]>;
//# sourceMappingURL=voiceKeyterms.d.ts.map