import * as React from 'react';
import { KeyboardEvent } from '../ink/events/keyboard-event.js';
type InsertTextHandle = {
    insert: (text: string) => void;
    setInputWithCursor: (value: string, cursor: number) => void;
    cursorOffset: number;
};
type UseVoiceIntegrationArgs = {
    setInputValueRaw: React.Dispatch<React.SetStateAction<string>>;
    inputValueRef: React.RefObject<string>;
    insertTextRef: React.RefObject<InsertTextHandle | null>;
};
type InterimRange = {
    start: number;
    end: number;
};
type StripOpts = {
    char?: string;
    anchor?: boolean;
    floor?: number;
};
type UseVoiceIntegrationResult = {
    stripTrailing: (maxStrip: number, opts?: StripOpts) => number;
    resetAnchor: () => void;
    handleKeyEvent: (fallbackMs?: number) => void;
    interimRange: InterimRange | null;
};
export declare function useVoiceIntegration({ setInputValueRaw, inputValueRef, insertTextRef }: UseVoiceIntegrationArgs): UseVoiceIntegrationResult;
/**
 * Component that handles hold-to-talk voice activation.
 *
 * The activation key is configurable via keybindings (voice:pushToTalk,
 * default: space). Hold detection depends on OS auto-repeat delivering a
 * stream of events at 30-80ms intervals. Two binding types work:
 *
 * **Modifier + letter (meta+k, ctrl+x, alt+v):** Cleanest. Activates on
 * the first press — a modifier combo is unambiguous intent (can't be
 * typed accidentally), so no hold threshold applies. The letter part
 * auto-repeats while held, feeding release detection in useVoice.ts.
 * No flow-through, no stripping.
 *
 * **Bare chars (space, v, x):** Require HOLD_THRESHOLD rapid presses to
 * activate (a single space could be normal typing). The first
 * WARMUP_THRESHOLD presses flow into the input so a single press types
 * normally. Past that, rapid presses are swallowed; on activation the
 * flow-through chars are stripped. Binding "v" doesn't make "v"
 * untypable — normal typing (>120ms between keystrokes) flows through;
 * only rapid auto-repeat from a held key triggers activation.
 *
 * Known broken: modifier+space (NUL → parsed as ctrl+backtick), chords
 * (discrete sequences, no hold). Validation warns on these.
 */
export declare function useVoiceKeybindingHandler({ voiceHandleKeyEvent, stripTrailing, resetAnchor, isActive }: {
    voiceHandleKeyEvent: (fallbackMs?: number) => void;
    stripTrailing: (maxStrip: number, opts?: StripOpts) => number;
    resetAnchor: () => void;
    isActive: boolean;
}): {
    handleKeyDown: (e: KeyboardEvent) => void;
};
export declare function VoiceKeybindingHandler(props: any): null;
export {};
//# sourceMappingURL=useVoiceIntegration.d.ts.map