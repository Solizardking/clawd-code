import type { RefObject } from 'react';
import React from 'react';
import type { NormalizedUserMessage, RenderableMessage } from '../types/message.js';
declare const NAVIGABLE_TYPES: readonly ["user", "assistant", "grouped_tool_use", "collapsed_read_search", "system", "attachment"];
export type NavigableType = (typeof NAVIGABLE_TYPES)[number];
export type NavigableOf<T extends NavigableType> = Extract<RenderableMessage, {
    type: T;
}>;
export type NavigableMessage = RenderableMessage;
export declare function isNavigableMessage(msg: NavigableMessage): boolean;
export declare function toolCallOf(msg: NavigableMessage): {
    name: string;
    input: Record<string, unknown>;
} | undefined;
export type MessageActionCaps = {
    copy: (text: string) => void;
    edit: (msg: NormalizedUserMessage) => Promise<void>;
};
export declare const MESSAGE_ACTIONS: readonly [{
    key: "enter";
    label: string | ((s: MessageActionsState) => string);
    types: readonly ("system" | "attachment" | "grouped_tool_use" | "collapsed_read_search")[];
    applies?: (s: MessageActionsState) => boolean;
    stays?: true;
    run: (m: NavigableOf<"system" | "attachment" | "grouped_tool_use" | "collapsed_read_search">, caps: MessageActionCaps) => void;
}, {
    key: "enter";
    label: string | ((s: MessageActionsState) => string);
    types: readonly "user"[];
    applies?: (s: MessageActionsState) => boolean;
    stays?: true;
    run: (m: import("../types/message.js").UserMessage, caps: MessageActionCaps) => void;
}, {
    key: "c";
    label: string | ((s: MessageActionsState) => string);
    types: readonly ("user" | "assistant" | "system" | "attachment" | "grouped_tool_use" | "collapsed_read_search")[];
    applies?: (s: MessageActionsState) => boolean;
    stays?: true;
    run: (m: NavigableOf<"user" | "assistant" | "system" | "attachment" | "grouped_tool_use" | "collapsed_read_search">, caps: MessageActionCaps) => void;
}, {
    key: "p";
    label: string | ((s: MessageActionsState) => string);
    types: readonly ("assistant" | "grouped_tool_use")[];
    applies?: (s: MessageActionsState) => boolean;
    stays?: true;
    run: (m: NavigableOf<"assistant" | "grouped_tool_use">, caps: MessageActionCaps) => void;
}];
export type MessageActionsState = {
    uuid: string;
    msgType: NavigableType;
    expanded: boolean;
    toolName?: string;
};
export type MessageActionsNav = {
    enterCursor: () => void;
    navigatePrev: () => void;
    navigateNext: () => void;
    navigatePrevUser: () => void;
    navigateNextUser: () => void;
    navigateTop: () => void;
    navigateBottom: () => void;
    getSelected: () => NavigableMessage | null;
};
export declare const MessageActionsSelectedContext: any;
export declare const InVirtualListContext: any;
export declare function useSelectedMessageBg(): "messageActionsBackground" | undefined;
export declare function useMessageActions(cursor: MessageActionsState | null, setCursor: React.Dispatch<React.SetStateAction<MessageActionsState | null>>, navRef: RefObject<MessageActionsNav | null>, caps: MessageActionCaps): {
    enter: () => void;
    handlers: Record<string, () => void>;
};
export declare function MessageActionsKeybindings(t0: any): null;
export declare function MessageActionsBar(t0: any): any;
export declare function stripSystemReminders(text: string): string;
export declare function copyTextOf(msg: NavigableMessage): string;
export {};
//# sourceMappingURL=messageActions.d.ts.map