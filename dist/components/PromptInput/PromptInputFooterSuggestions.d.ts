import type { Theme } from '../../utils/theme.js';
export type SuggestionItem = {
    id: string;
    displayText: string;
    tag?: string;
    description?: string;
    metadata?: unknown;
    color?: keyof Theme;
};
export type SuggestionType = 'command' | 'file' | 'directory' | 'agent' | 'shell' | 'custom-title' | 'slack-channel' | 'none';
export declare const OVERLAY_MAX_ITEMS = 5;
export declare function PromptInputFooterSuggestions(t0: any): any;
declare const _default: any;
export default _default;
//# sourceMappingURL=PromptInputFooterSuggestions.d.ts.map