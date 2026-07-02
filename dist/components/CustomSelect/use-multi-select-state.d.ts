import type { OptionWithDescription } from './select.js';
export type UseMultiSelectStateProps<T> = {
    /**
     * When disabled, user input is ignored.
     *
     * @default false
     */
    isDisabled?: boolean;
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
     * Initially selected values.
     */
    defaultValue?: T[];
    /**
     * Callback when selection changes.
     */
    onChange?: (values: T[]) => void;
    /**
     * Callback for canceling the select.
     */
    onCancel: () => void;
    /**
     * Callback for focusing an option.
     */
    onFocus?: (value: T) => void;
    /**
     * Value to focus
     */
    focusValue?: T;
    /**
     * Text for the submit button. When provided, a submit button is shown and
     * Enter toggles selection (submit only fires when the button is focused).
     * When omitted, Enter submits directly and Space toggles selection.
     */
    submitButtonText?: string;
    /**
     * Callback when user submits. Receives the currently selected values.
     */
    onSubmit?: (values: T[]) => void;
    /**
     * Callback when user presses down from the last item (submit button).
     * If provided, navigation will not wrap to the first item.
     */
    onDownFromLastItem?: () => void;
    /**
     * Callback when user presses up from the first item.
     * If provided, navigation will not wrap to the last item.
     */
    onUpFromFirstItem?: () => void;
    /**
     * Focus the last option initially instead of the first.
     */
    initialFocusLast?: boolean;
    /**
     * When true, numeric keys (1-9) do not toggle options by index.
     * Mirrors the rendering layer's hideIndexes: if index labels aren't shown,
     * pressing a number shouldn't silently toggle an invisible mapping.
     */
    hideIndexes?: boolean;
};
export type MultiSelectState<T> = {
    /**
     * Value of the currently focused option.
     */
    focusedValue: T | undefined;
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
     * Currently selected values.
     */
    selectedValues: T[];
    /**
     * Current input field values.
     */
    inputValues: Map<T, string>;
    /**
     * Whether the submit button is focused.
     */
    isSubmitFocused: boolean;
    /**
     * Update an input field value.
     */
    updateInputValue: (value: T, inputValue: string) => void;
    /**
     * Callback for canceling the select.
     */
    onCancel: () => void;
};
export declare function useMultiSelectState<T>({ isDisabled, visibleOptionCount, options, defaultValue, onChange, onCancel, onFocus, focusValue, submitButtonText, onSubmit, onDownFromLastItem, onUpFromFirstItem, initialFocusLast, hideIndexes, }: UseMultiSelectStateProps<T>): MultiSelectState<T>;
//# sourceMappingURL=use-multi-select-state.d.ts.map