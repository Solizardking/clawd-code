/**
 * Vim Mode State Machine Types
 *
 * This file defines the complete state machine for vim input handling.
 * The types ARE the documentation - reading them tells you how the system works.
 *
 * State Diagram:
 * ```
 *                              VimState
 *   ┌──────────────────────────────┬──────────────────────────────────────┐
 *   │  INSERT                      │  NORMAL                              │
 *   │  (tracks insertedText)       │  (CommandState machine)              │
 *   │                              │                                      │
 *   │                              │  idle ──┬─[d/c/y]──► operator        │
 *   │                              │         ├─[1-9]────► count           │
 *   │                              │         ├─[fFtT]───► find            │
 *   │                              │         ├─[g]──────► g               │
 *   │                              │         ├─[r]──────► replace         │
 *   │                              │         └─[><]─────► indent          │
 *   │                              │                                      │
 *   │                              │  operator ─┬─[motion]──► execute     │
 *   │                              │            ├─[0-9]────► operatorCount│
 *   │                              │            ├─[ia]─────► operatorTextObj
 *   │                              │            └─[fFtT]───► operatorFind │
 *   └──────────────────────────────┴──────────────────────────────────────┘
 * ```
 */
export type Operator = 'delete' | 'change' | 'yank';
export type FindType = 'f' | 'F' | 't' | 'T';
export type TextObjScope = 'inner' | 'around';
/**
 * Complete vim state. Mode determines what data is tracked.
 *
 * INSERT mode: Track text being typed (for dot-repeat)
 * NORMAL mode: Track command being parsed (state machine)
 */
export type VimState = {
    mode: 'INSERT';
    insertedText: string;
} | {
    mode: 'NORMAL';
    command: CommandState;
};
/**
 * Command state machine for NORMAL mode.
 *
 * Each state knows exactly what input it's waiting for.
 * TypeScript ensures exhaustive handling in switches.
 */
export type CommandState = {
    type: 'idle';
} | {
    type: 'count';
    digits: string;
} | {
    type: 'operator';
    op: Operator;
    count: number;
} | {
    type: 'operatorCount';
    op: Operator;
    count: number;
    digits: string;
} | {
    type: 'operatorFind';
    op: Operator;
    count: number;
    find: FindType;
} | {
    type: 'operatorTextObj';
    op: Operator;
    count: number;
    scope: TextObjScope;
} | {
    type: 'find';
    find: FindType;
    count: number;
} | {
    type: 'g';
    count: number;
} | {
    type: 'operatorG';
    op: Operator;
    count: number;
} | {
    type: 'replace';
    count: number;
} | {
    type: 'indent';
    dir: '>' | '<';
    count: number;
};
/**
 * Persistent state that survives across commands.
 * This is the "memory" of vim - what gets recalled for repeats and pastes.
 */
export type PersistentState = {
    lastChange: RecordedChange | null;
    lastFind: {
        type: FindType;
        char: string;
    } | null;
    register: string;
    registerIsLinewise: boolean;
};
/**
 * Recorded change for dot-repeat.
 * Captures everything needed to replay a command.
 */
export type RecordedChange = {
    type: 'insert';
    text: string;
} | {
    type: 'operator';
    op: Operator;
    motion: string;
    count: number;
} | {
    type: 'operatorTextObj';
    op: Operator;
    objType: string;
    scope: TextObjScope;
    count: number;
} | {
    type: 'operatorFind';
    op: Operator;
    find: FindType;
    char: string;
    count: number;
} | {
    type: 'replace';
    char: string;
    count: number;
} | {
    type: 'x';
    count: number;
} | {
    type: 'toggleCase';
    count: number;
} | {
    type: 'indent';
    dir: '>' | '<';
    count: number;
} | {
    type: 'openLine';
    direction: 'above' | 'below';
} | {
    type: 'join';
    count: number;
};
export declare const OPERATORS: {
    readonly d: "delete";
    readonly c: "change";
    readonly y: "yank";
};
export declare function isOperatorKey(key: string): key is keyof typeof OPERATORS;
export declare const SIMPLE_MOTIONS: Set<string>;
export declare const FIND_KEYS: Set<string>;
export declare const TEXT_OBJ_SCOPES: {
    readonly i: "inner";
    readonly a: "around";
};
export declare function isTextObjScopeKey(key: string): key is keyof typeof TEXT_OBJ_SCOPES;
export declare const TEXT_OBJ_TYPES: Set<string>;
export declare const MAX_VIM_COUNT = 10000;
export declare function createInitialVimState(): VimState;
export declare function createInitialPersistentState(): PersistentState;
//# sourceMappingURL=types.d.ts.map