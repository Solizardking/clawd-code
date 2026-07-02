import * as React from 'react';
import type { ToolProgressData } from '../../Tool.js';
import type { ProgressMessage } from '../../types/message.js';
import type { ThemeName } from '../../utils/theme.js';
import type { Output } from './EnterWorktreeTool.js';
export declare function renderToolUseMessage(): React.ReactNode;
export declare function renderToolResultMessage(output: Output, _progressMessagesForMessage: ProgressMessage<ToolProgressData>[], _options: {
    theme: ThemeName;
}): React.ReactNode;
//# sourceMappingURL=UI.d.ts.map