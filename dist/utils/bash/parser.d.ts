import { type TsNode } from './bashParser.js';
export type Node = TsNode;
export interface ParsedCommandData {
    rootNode: Node;
    envVars: string[];
    commandNode: Node | null;
    originalCommand: string;
}
/**
 * Awaits WASM init (Parser.init + Language.load). Must be called before
 * parseCommand/parseCommandRaw for the parser to be available. Idempotent.
 */
export declare function ensureInitialized(): Promise<void>;
export declare function parseCommand(command: string): Promise<ParsedCommandData | null>;
/**
 * SECURITY: Sentinel for "parser was loaded and attempted, but aborted"
 * (timeout / node budget / Rust panic). Distinct from `null` (module not
 * loaded). Adversarial input can trigger abort under MAX_COMMAND_LENGTH:
 * `(( a[0][0]... ))` with ~2800 subscripts hits PARSE_TIMEOUT_MICROS.
 * Callers MUST treat this as fail-closed (too-complex), NOT route to legacy.
 */
export declare const PARSE_ABORTED: unique symbol;
/**
 * Raw parse — skips findCommandNode/extractEnvVars which the security
 * walker in ast.ts doesn't use. Saves one tree walk per bash command.
 *
 * Returns:
 *   - Node: parse succeeded
 *   - null: module not loaded / feature off / empty / over-length
 *   - PARSE_ABORTED: module loaded but parse failed (timeout/panic)
 */
export declare function parseCommandRaw(command: string): Promise<Node | null | typeof PARSE_ABORTED>;
export declare function extractCommandArguments(commandNode: Node): string[];
//# sourceMappingURL=parser.d.ts.map