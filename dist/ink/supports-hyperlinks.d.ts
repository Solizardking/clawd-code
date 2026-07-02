export declare const ADDITIONAL_HYPERLINK_TERMINALS: string[];
type EnvLike = Record<string, string | undefined>;
type SupportsHyperlinksOptions = {
    env?: EnvLike;
    stdoutSupported?: boolean;
};
/**
 * Returns whether stdout supports OSC 8 hyperlinks.
 * Extends the supports-hyperlinks library with additional terminal detection.
 * @param options Optional overrides for testing (env, stdoutSupported)
 */
export declare function supportsHyperlinks(options?: SupportsHyperlinksOptions): boolean;
export {};
//# sourceMappingURL=supports-hyperlinks.d.ts.map