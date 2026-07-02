/**
 * Vim State Transition Table
 *
 * This is the scannable source of truth for state transitions.
 * To understand what happens in any state, look up that state's transition function.
 */
import { type OperatorContext } from './operators.js';
import { type CommandState } from './types.js';
/**
 * Context passed to transition functions.
 */
export type TransitionContext = OperatorContext & {
    onUndo?: () => void;
    onDotRepeat?: () => void;
};
/**
 * Result of a transition.
 */
export type TransitionResult = {
    next?: CommandState;
    execute?: () => void;
};
/**
 * Main transition function. Dispatches based on current state type.
 */
export declare function transition(state: CommandState, input: string, ctx: TransitionContext): TransitionResult;
//# sourceMappingURL=transitions.d.ts.map