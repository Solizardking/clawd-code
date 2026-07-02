import type { LocalJSXCommandContext } from '../../commands.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import type { SerializedMessage } from '../../types/logs.js';
/**
 * Derive a single-line title base from the first user message.
 * Collapses whitespace — multiline first messages (pasted stacks, code)
 * otherwise flow into the saved title and break the resume hint.
 */
export declare function deriveFirstPrompt(firstUserMessage: Extract<SerializedMessage, {
    type: 'user';
}> | undefined): string;
export declare function call(onDone: LocalJSXCommandOnDone, context: LocalJSXCommandContext, args: string): Promise<React.ReactNode>;
//# sourceMappingURL=branch.d.ts.map