import type { HistoryMode } from 'src/hooks/useArrowKeyHistory.js';
import type { PromptInputMode } from 'src/types/textInputTypes.js';
export declare function prependModeCharacterToInput(input: string, mode: PromptInputMode): string;
export declare function getModeFromInput(input: string): HistoryMode;
export declare function getValueFromInput(input: string): string;
export declare function isInputModeCharacter(input: string): boolean;
//# sourceMappingURL=inputModes.d.ts.map