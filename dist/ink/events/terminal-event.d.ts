import { Event } from './event.js';
type EventPhase = 'none' | 'capturing' | 'at_target' | 'bubbling';
type TerminalEventInit = {
    bubbles?: boolean;
    cancelable?: boolean;
};
/**
 * Base class for all terminal events with DOM-style propagation.
 *
 * Extends Event so existing event types (ClickEvent, InputEvent,
 * TerminalFocusEvent) share a common ancestor and can migrate later.
 *
 * Mirrors the browser's Event API: target, currentTarget, eventPhase,
 * stopPropagation(), preventDefault(), timeStamp.
 */
export declare class TerminalEvent extends Event {
    readonly type: string;
    readonly timeStamp: number;
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    private _target;
    private _currentTarget;
    private _eventPhase;
    private _propagationStopped;
    private _defaultPrevented;
    constructor(type: string, init?: TerminalEventInit);
    get target(): EventTarget | null;
    get currentTarget(): EventTarget | null;
    get eventPhase(): EventPhase;
    get defaultPrevented(): boolean;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
    preventDefault(): void;
    /** @internal */
    _setTarget(target: EventTarget): void;
    /** @internal */
    _setCurrentTarget(target: EventTarget | null): void;
    /** @internal */
    _setEventPhase(phase: EventPhase): void;
    /** @internal */
    _isPropagationStopped(): boolean;
    /** @internal */
    _isImmediatePropagationStopped(): boolean;
    /**
     * Hook for subclasses to do per-node setup before each handler fires.
     * Default is a no-op.
     */
    _prepareForTarget(_target: EventTarget): void;
}
export type EventTarget = {
    parentNode: EventTarget | undefined;
    _eventHandlers?: Record<string, unknown>;
};
export {};
//# sourceMappingURL=terminal-event.d.ts.map