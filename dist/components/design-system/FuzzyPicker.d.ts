import * as React from 'react';
type PickerAction<T> = {
    /** Hint label shown in the byline, e.g. "mention" → "Tab to mention". */
    action: string;
    handler: (item: T) => void;
};
type Props<T> = {
    title: string;
    placeholder?: string;
    initialQuery?: string;
    items: readonly T[];
    getKey: (item: T) => string;
    /** Keep to one line — preview handles overflow. */
    renderItem: (item: T, isFocused: boolean) => React.ReactNode;
    renderPreview?: (item: T) => React.ReactNode;
    /** 'right' keeps hints stable (no bounce), but needs width. */
    previewPosition?: 'bottom' | 'right';
    visibleCount?: number;
    /**
     * 'up' puts items[0] at the bottom next to the input (atuin-style). Arrows
     * always match screen direction — ↑ walks visually up regardless.
     */
    direction?: 'down' | 'up';
    /** Caller owns filtering: re-filter on each call and pass new items. */
    onQueryChange: (query: string) => void;
    /** Enter key. Primary action. */
    onSelect: (item: T) => void;
    /**
     * Tab key. If provided, Tab no longer aliases Enter — it gets its own
     * handler and hint. Shift+Tab falls through to this if onShiftTab is unset.
     */
    onTab?: PickerAction<T>;
    /** Shift+Tab key. Gets its own hint. */
    onShiftTab?: PickerAction<T>;
    /**
     * Fires when the focused item changes (via arrows or when items reset).
     * Useful for async preview loading — keeps I/O out of renderPreview.
     */
    onFocus?: (item: T | undefined) => void;
    onCancel: () => void;
    /** Shown when items is empty. Caller bakes loading/searching state into this. */
    emptyMessage?: string | ((query: string) => string);
    /**
     * Status line below the list, e.g. "500+ matches" or "42 matches…".
     * Caller decides when to show it — pass undefined to hide.
     */
    matchLabel?: string;
    selectAction?: string;
    extraHints?: React.ReactNode;
};
export declare function FuzzyPicker<T>({ title, placeholder, initialQuery, items, getKey, renderItem, renderPreview, previewPosition, visibleCount: requestedVisible, direction, onQueryChange, onSelect, onTab, onShiftTab, onFocus, onCancel, emptyMessage, matchLabel, selectAction, extraHints }: Props<T>): React.ReactNode;
export {};
//# sourceMappingURL=FuzzyPicker.d.ts.map