export declare function tryFormatJson(line: string): string;
export declare function tryJsonFormatContent(content: string): string;
export declare function linkifyUrlsInText(content: string): string;
export declare function OutputLine(t0: any): any;
/**
 * Underline ANSI codes in particular tend to leak out for some reason. I wasn't
 * able to figure out why, or why emitting a reset ANSI code wasn't enough to
 * prevent them from leaking. I also didn't want to strip all ANSI codes with
 * stripAnsi(), because we used to do that and people complained about losing
 * all formatting. So we just strip the underline ANSI codes specifically.
 */
export declare function stripUnderlineAnsi(content: string): string;
//# sourceMappingURL=OutputLine.d.ts.map