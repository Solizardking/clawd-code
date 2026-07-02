import type { VimInputState, VimMode } from '../types/textInputTypes.js';
import { type UseTextInputProps } from './useTextInput.js';
type UseVimInputProps = Omit<UseTextInputProps, 'inputFilter'> & {
    onModeChange?: (mode: VimMode) => void;
    onUndo?: () => void;
    inputFilter?: UseTextInputProps['inputFilter'];
};
export declare function useVimInput(props: UseVimInputProps): VimInputState;
export {};
//# sourceMappingURL=useVimInput.d.ts.map