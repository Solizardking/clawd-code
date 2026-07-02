export declare const OSC8_START = "\u001B]8;;";
export declare const OSC8_END = "\u0007";
type HyperlinkOptions = {
    supportsHyperlinks?: boolean;
};
/**
 * Create a clickable hyperlink using OSC 8 escape sequences.
 * Falls back to plain text if the terminal doesn't support hyperlinks.
 *
 * @param url - The URL to link to
 * @param content - Optional content to display as the link text (only when hyperlinks are supported).
 *                  If provided and hyperlinks are supported, this text is shown as a clickable link.
 *                  If hyperlinks are not supported, content is ignored and only the URL is shown.
 * @param options - Optional overrides for testing (supportsHyperlinks)
 */
export declare function createHyperlink(url: string, content?: string, options?: HyperlinkOptions): string;
export {};
//# sourceMappingURL=hyperlink.d.ts.map