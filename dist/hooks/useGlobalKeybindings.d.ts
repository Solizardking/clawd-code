import type { Screen } from '../screens/REPL.js';
type Props = {
    screen: Screen;
    setScreen: React.Dispatch<React.SetStateAction<Screen>>;
    showAllInTranscript: boolean;
    setShowAllInTranscript: React.Dispatch<React.SetStateAction<boolean>>;
    messageCount: number;
    onEnterTranscript?: () => void;
    onExitTranscript?: () => void;
    virtualScrollActive?: boolean;
    searchBarOpen?: boolean;
};
/**
 * Registers global keybinding handlers for:
 * - ctrl+t: Toggle todo list
 * - ctrl+o: Toggle transcript mode
 * - ctrl+e: Toggle showing all messages in transcript
 * - ctrl+c/escape: Exit transcript mode
 */
export declare function GlobalKeybindingHandlers({ screen, setScreen, showAllInTranscript, setShowAllInTranscript, messageCount, onEnterTranscript, onExitTranscript, virtualScrollActive, searchBarOpen }: Props): null;
export {};
//# sourceMappingURL=useGlobalKeybindings.d.ts.map