import React from 'react';
import type { ToolUseContext } from '../../Tool.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import type { Message } from '../../types/message.js';
export declare function extractFirstPrompt(messages: Message[]): string;
export declare function sanitizeFilename(text: string): string;
export declare function call(onDone: LocalJSXCommandOnDone, context: ToolUseContext, args: string): Promise<React.ReactNode>;
//# sourceMappingURL=export.d.ts.map