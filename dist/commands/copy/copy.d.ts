import type { LocalJSXCommandCall } from '../../types/command.js';
import type { Message } from '../../types/message.js';
/**
 * Walk messages newest-first, returning text from assistant messages that
 * actually said something (skips tool-use-only turns and API errors).
 * Index 0 = latest, 1 = second-to-latest, etc. Caps at MAX_LOOKBACK.
 */
export declare function collectRecentAssistantTexts(messages: Message[]): string[];
export declare function fileExtension(lang: string | undefined): string;
export declare const call: LocalJSXCommandCall;
//# sourceMappingURL=copy.d.ts.map