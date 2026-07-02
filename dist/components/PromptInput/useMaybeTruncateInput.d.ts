import type { PastedContent } from 'src/utils/config.js';
type Props = {
    input: string;
    pastedContents: Record<number, PastedContent>;
    onInputChange: (input: string) => void;
    setCursorOffset: (offset: number) => void;
    setPastedContents: (contents: Record<number, PastedContent>) => void;
};
export declare function useMaybeTruncateInput({ input, pastedContents, onInputChange, setCursorOffset, setPastedContents, }: Props): void;
export {};
//# sourceMappingURL=useMaybeTruncateInput.d.ts.map