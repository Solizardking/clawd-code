import type { OptionWithDescription } from './select.js';
import type { SelectState } from './use-select-state.js';
export type UseSelectProps<T> = {
    /**
     * When disabled, user input is ignored.
     *
     * @default false
     */
    isDisabled?: boolean;
    /**
     * When true, prevents selection on Enter or number keys, but allows
     * scrolling.
     * When 'numeric', prevents selection on number keys, but allows Enter (and
     * scrolling).
     *
     * @default false
     */
    readonly disableSelection?: boolean | 'numeric';
    /**
     * Select state.
     */
    state: SelectState<T>;
    /**
     * Options.
     */
    options: OptionWithDescription<T>[];
    /**
     * Whether this is a multi-select component.
     *
     * @default false
     */
    isMultiSelect?: boolean;
    /**
     * Callback when user presses up from the first item.
     * If provided, navigation will not wrap to the last item.
     */
    onUpFromFirstItem?: () => void;
    /**
     * Callback when user presses down from the last item.
     * If provided, navigation will not wrap to the first item.
     */
    onDownFromLastItem?: () => void;
    /**
     * Callback when input mode should be toggled for an option.
     * Called when Tab is pressed (to enter or exit input mode).
     */
    onInputModeToggle?: (value: T) => void;
    /**
     * Current input values for input-type options.
     * Used to determine if number key should submit an empty input option.
     */
    inputValues?: Map<T, string>;
    /**
     * Whether image selection mode is active on the focused input option.
     * When true, arrow key navigation in useInput is suppressed so that
     * Attachments keybindings can handle image navigation instead.
     */
    imagesSelected?: boolean;
    /**
     * Callback to attempt entering image selection mode on DOWN arrow.
     * Returns true if image selection was entered (images exist), false otherwise.
     */
    onEnterImageSelection?: () => boolean;
};
export declare const useSelectInput: <T>({ isDisabled, disableSelection, state, options, isMultiSelect, onUpFromFirstItem, onDownFromLastItem, onInputModeToggle, inputValues, imagesSelected, onEnterImageSelection, }: UseSelectProps<T>) => void;
//# sourceMappingURL=use-select-input.d.ts.map