import type { TextareaRenderable } from "@opentui/core";
import type { FileIndex } from "../../utils/file-index.js";
export interface TypeaheadState {
    suggestions: string[];
    selectedIndex: number;
    visible: boolean;
    accept: () => void;
    dismiss: () => void;
    navigateUp: () => void;
    navigateDown: () => void;
}
export interface TokenInfo {
    token: string;
    startPos: number;
    endPos: number;
    hasAtPrefix: boolean;
}
export declare function useTypeahead(inputRef: React.RefObject<TextareaRenderable | null>, fileIndex: FileIndex | null, onAccept?: (filePath: string, tokenInfo: TokenInfo) => void): TypeaheadState;
