/**
 * Detects when the user types a single valid digit into the prompt input,
 * debounces to avoid accidental submissions (e.g., "1. First item"),
 * trims the digit from the input, and fires a callback.
 *
 * Used by survey components that accept numeric responses typed directly
 * into the main prompt input.
 */
export declare function useDebouncedDigitInput<T extends string = string>({ inputValue, setInputValue, isValidDigit, onDigit, enabled, once, debounceMs, }: {
    inputValue: string;
    setInputValue: (value: string) => void;
    isValidDigit: (char: string) => char is T;
    onDigit: (digit: T) => void;
    enabled?: boolean;
    once?: boolean;
    debounceMs?: number;
}): void;
//# sourceMappingURL=useDebouncedDigitInput.d.ts.map