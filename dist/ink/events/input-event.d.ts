import { type ParsedKey } from '../parse-keypress.js';
import { Event } from './event.js';
export type Key = {
    upArrow: boolean;
    downArrow: boolean;
    leftArrow: boolean;
    rightArrow: boolean;
    pageDown: boolean;
    pageUp: boolean;
    wheelUp: boolean;
    wheelDown: boolean;
    home: boolean;
    end: boolean;
    return: boolean;
    escape: boolean;
    ctrl: boolean;
    shift: boolean;
    fn: boolean;
    tab: boolean;
    backspace: boolean;
    delete: boolean;
    meta: boolean;
    super: boolean;
};
export declare class InputEvent extends Event {
    readonly keypress: ParsedKey;
    readonly key: Key;
    readonly input: string;
    constructor(keypress: ParsedKey);
}
//# sourceMappingURL=input-event.d.ts.map