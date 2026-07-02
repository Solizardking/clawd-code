/**
 * Vim Operator Functions
 *
 * Pure functions for executing vim operators (delete, change, yank, etc.)
 */
import { Cursor } from '../utils/Cursor.js';
import type { FindType, Operator, RecordedChange, TextObjScope } from './types.js';
/**
 * Context for operator execution.
 */
export type OperatorContext = {
    cursor: Cursor;
    text: string;
    setText: (text: string) => void;
    setOffset: (offset: number) => void;
    enterInsert: (offset: number) => void;
    getRegister: () => string;
    setRegister: (content: string, linewise: boolean) => void;
    getLastFind: () => {
        type: FindType;
        char: string;
    } | null;
    setLastFind: (type: FindType, char: string) => void;
    recordChange: (change: RecordedChange) => void;
};
/**
 * Execute an operator with a simple motion.
 */
export declare function executeOperatorMotion(op: Operator, motion: string, count: number, ctx: OperatorContext): void;
/**
 * Execute an operator with a find motion.
 */
export declare function executeOperatorFind(op: Operator, findType: FindType, char: string, count: number, ctx: OperatorContext): void;
/**
 * Execute an operator with a text object.
 */
export declare function executeOperatorTextObj(op: Operator, scope: TextObjScope, objType: string, count: number, ctx: OperatorContext): void;
/**
 * Execute a line operation (dd, cc, yy).
 */
export declare function executeLineOp(op: Operator, count: number, ctx: OperatorContext): void;
/**
 * Execute delete character (x command).
 */
export declare function executeX(count: number, ctx: OperatorContext): void;
/**
 * Execute replace character (r command).
 */
export declare function executeReplace(char: string, count: number, ctx: OperatorContext): void;
/**
 * Execute toggle case (~ command).
 */
export declare function executeToggleCase(count: number, ctx: OperatorContext): void;
/**
 * Execute join lines (J command).
 */
export declare function executeJoin(count: number, ctx: OperatorContext): void;
/**
 * Execute paste (p/P command).
 */
export declare function executePaste(after: boolean, count: number, ctx: OperatorContext): void;
/**
 * Execute indent (>> command).
 */
export declare function executeIndent(dir: '>' | '<', count: number, ctx: OperatorContext): void;
/**
 * Execute open line (o/O command).
 */
export declare function executeOpenLine(direction: 'above' | 'below', ctx: OperatorContext): void;
export declare function executeOperatorG(op: Operator, count: number, ctx: OperatorContext): void;
export declare function executeOperatorGg(op: Operator, count: number, ctx: OperatorContext): void;
//# sourceMappingURL=operators.d.ts.map