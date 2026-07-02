import type { InputEvent, Key } from '../ink.js';
import type { ImageDimensions } from '../utils/imageResizer.js';
type PasteHandlerProps = {
    onPaste?: (text: string) => void;
    onInput: (input: string, key: Key) => void;
    onImagePaste?: (base64Image: string, mediaType?: string, filename?: string, dimensions?: ImageDimensions, sourcePath?: string) => void;
};
export declare function usePasteHandler({ onPaste, onInput, onImagePaste, }: PasteHandlerProps): {
    wrappedOnInput: (input: string, key: Key, event: InputEvent) => void;
    pasteState: {
        chunks: string[];
        timeoutId: ReturnType<typeof setTimeout> | null;
    };
    isPasting: boolean;
};
export {};
//# sourceMappingURL=usePasteHandler.d.ts.map