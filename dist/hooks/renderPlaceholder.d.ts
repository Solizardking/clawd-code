type PlaceholderRendererProps = {
    placeholder?: string;
    value: string;
    showCursor?: boolean;
    focus?: boolean;
    terminalFocus: boolean;
    invert?: (text: string) => string;
    hidePlaceholderText?: boolean;
};
export declare function renderPlaceholder({ placeholder, value, showCursor, focus, terminalFocus, invert, hidePlaceholderText, }: PlaceholderRendererProps): {
    renderedPlaceholder: string | undefined;
    showPlaceholder: boolean;
};
export {};
//# sourceMappingURL=renderPlaceholder.d.ts.map