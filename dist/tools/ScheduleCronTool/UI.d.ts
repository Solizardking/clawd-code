import React from 'react';
import type { CreateOutput } from './CronCreateTool.js';
import type { DeleteOutput } from './CronDeleteTool.js';
import type { ListOutput } from './CronListTool.js';
export declare function renderCreateToolUseMessage(input: Partial<{
    cron: string;
    prompt: string;
}>): React.ReactNode;
export declare function renderCreateResultMessage(output: CreateOutput): React.ReactNode;
export declare function renderDeleteToolUseMessage(input: Partial<{
    id: string;
}>): React.ReactNode;
export declare function renderDeleteResultMessage(output: DeleteOutput): React.ReactNode;
export declare function renderListToolUseMessage(): React.ReactNode;
export declare function renderListResultMessage(output: ListOutput): React.ReactNode;
//# sourceMappingURL=UI.d.ts.map