import type { ThemeName } from 'src/utils/theme.js';
import type { ToolUseContext } from '../../Tool.js';
import type { LocalJSXCommandContext, LocalJSXCommandOnDone } from '../../types/command.js';
export declare function getNativeCSIuTerminalDisplayName(): string | null;
export declare function shouldOfferTerminalSetup(): boolean;
export declare function setupTerminal(theme: ThemeName): Promise<string>;
export declare function isShiftEnterKeyBindingInstalled(): boolean;
export declare function hasUsedBackslashReturn(): boolean;
export declare function markBackslashReturnUsed(): void;
export declare function call(onDone: LocalJSXCommandOnDone, context: ToolUseContext & LocalJSXCommandContext, _args: string): Promise<null>;
//# sourceMappingURL=terminalSetup.d.ts.map