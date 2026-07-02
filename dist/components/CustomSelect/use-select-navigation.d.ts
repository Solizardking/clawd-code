import type { OptionWithDescription } from './select.js';
export type UseSelectNavigationProps<T> = {
    /**
     * Number of items to display.
     *
     * @default 5
     */
    visibleOptionCount?: number;
    /**
     * Options.
     */
    options: OptionWithDescription<T>[];
    /**
     * Initially focused option's value.
     */
    initialFocusValue?: T;
    /**
     * Callback for focusing an option.
     */
    onFocus?: (value: T) => void;
    /**
     * Value to focus
     */
    focusValue?: T;
};
export type SelectNavigation<T> = {
    /**
     * Value of the currently focused option.
     */
    focusedValue: T | undefined;
    /**
     * 1-based index of the focused option in the full list.
     * Returns 0 if no option is focused.
     */
    focusedIndex: number;
    /**
     * Index of the first visible option.
     */
    visibleFromIndex: number;
    /**
     * Index of the last visible option.
     */
    visibleToIndex: number;
    /**
     * All options.
     */
    options: OptionWithDescription<T>[];
    /**
     * Visible options.
     */
    visibleOptions: Array<OptionWithDescription<T> & {
        index: number;
    }>;
    /**
     * Whether the focused option is an input type.
     */
    isInInput: boolean;
    /**
     * Focus next option and scroll the list down, if needed.
     */
    focusNextOption: () => void;
    /**
     * Focus previous option and scroll the list up, if needed.
     */
    focusPreviousOption: () => void;
    /**
     * Focus next page and scroll the list down by a page.
     */
    focusNextPage: () => void;
    /**
     * Focus previous page and scroll the list up by a page.
     */
    focusPreviousPage: () => void;
    /**
     * Focus a specific option by value.
     */
    focusOption: (value: T | undefined) => void;
};
export declare function useSelectNavigation<T>({ visibleOptionCount, options, initialFocusValue, onFocus, focusValue, }: UseSelectNavigationProps<T>): SelectNavigation<T>;
//# sourceMappingURL=use-select-navigation.d.ts.map