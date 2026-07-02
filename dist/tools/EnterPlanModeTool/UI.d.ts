import * as React from 'react';
import type { ToolProgressData } from '../../Tool.js';
import type { ProgressMessage } from '../../types/message.js';
import type { ThemeName } from '../../utils/theme.js';
import type { Output } from './EnterPlanModeTool.js';
export declare function renderToolUseMessage(): React.ReactNode;
export declare function renderToolResultMessage(_output: Output, _progressMessagesForMessage: ProgressMessage<ToolProgressData>[], _options: {
    theme: ThemeName;
}): React.ReactNode;
export declare function renderToolUseRejectedMessage(): React.ReactNode;
//# sourceMappingURL=UI.d.ts.map