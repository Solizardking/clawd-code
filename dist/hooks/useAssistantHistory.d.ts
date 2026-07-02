import { type RefObject } from 'react';
import type { ScrollBoxHandle } from '../ink/components/ScrollBox.js';
import type { RemoteSessionConfig } from '../remote/RemoteSessionManager.js';
import type { Message } from '../types/message.js';
type Props = {
    /** Gated on viewerOnly — non-viewer sessions have no remote history to page. */
    config: RemoteSessionConfig | undefined;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    scrollRef: RefObject<ScrollBoxHandle | null>;
    /** Called after prepend from the layout effect with message count + height
     *  delta. Lets useUnseenDivider shift dividerIndex + dividerYRef. */
    onPrepend?: (indexDelta: number, heightDelta: number) => void;
};
type Result = {
    /** Trigger for ScrollKeybindingHandler's onScroll composition. */
    maybeLoadOlder: (handle: ScrollBoxHandle) => void;
};
/**
 * Lazy-load `claude assistant` history on scroll-up.
 *
 * On mount: fetch newest page via anchor_to_latest, prepend to messages.
 * On scroll-up near top: fetch next-older page via before_id, prepend with
 * scroll anchoring (viewport stays put).
 *
 * No-op unless config.viewerOnly. REPL only calls this hook inside a
 * feature('KAIROS') gate, so build-time elimination is handled there.
 */
export declare function useAssistantHistory({ config, setMessages, scrollRef, onPrepend, }: Props): Result;
export {};
//# sourceMappingURL=useAssistantHistory.d.ts.map