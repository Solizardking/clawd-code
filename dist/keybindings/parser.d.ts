import type { Chord, KeybindingBlock, ParsedBinding, ParsedKeystroke } from './types.js';
/**
 * Parse a keystroke string like "ctrl+shift+k" into a ParsedKeystroke.
 * Supports various modifier aliases (ctrl/control, alt/opt/option/meta,
 * cmd/command/super/win).
 */
export declare function parseKeystroke(input: string): ParsedKeystroke;
/**
 * Parse a chord string like "ctrl+k ctrl+s" into an array of ParsedKeystrokes.
 */
export declare function parseChord(input: string): Chord;
/**
 * Convert a ParsedKeystroke to its canonical string representation for display.
 */
export declare function keystrokeToString(ks: ParsedKeystroke): string;
/**
 * Convert a Chord to its canonical string representation for display.
 */
export declare function chordToString(chord: Chord): string;
/**
 * Display platform type - a subset of Platform that we care about for display.
 * WSL and unknown are treated as linux for display purposes.
 */
type DisplayPlatform = 'macos' | 'windows' | 'linux' | 'wsl' | 'unknown';
/**
 * Convert a ParsedKeystroke to a platform-appropriate display string.
 * Uses "opt" for alt on macOS, "alt" elsewhere.
 */
export declare function keystrokeToDisplayString(ks: ParsedKeystroke, platform?: DisplayPlatform): string;
/**
 * Convert a Chord to a platform-appropriate display string.
 */
export declare function chordToDisplayString(chord: Chord, platform?: DisplayPlatform): string;
/**
 * Parse keybinding blocks (from JSON config) into a flat list of ParsedBindings.
 */
export declare function parseBindings(blocks: KeybindingBlock[]): ParsedBinding[];
export {};
//# sourceMappingURL=parser.d.ts.map