import { type ImageDimensions } from './imageResizer.js';
export declare const PASTE_THRESHOLD = 800;
export type ImageWithDimensions = {
    base64: string;
    mediaType: string;
    dimensions?: ImageDimensions;
};
/**
 * Check if clipboard contains an image without retrieving it.
 */
export declare function hasImageInClipboard(): Promise<boolean>;
export declare function getImageFromClipboard(): Promise<ImageWithDimensions | null>;
export declare function getImagePathFromClipboard(): Promise<string | null>;
/**
 * Regex pattern to match supported image file extensions. Kept in sync with
 * MIME_BY_EXT in BriefTool/upload.ts — attachments.ts uses this to set isImage
 * on the wire, and remote viewers fetch /preview iff isImage is true. An ext
 * here but not in MIME_BY_EXT (e.g. bmp) uploads as octet-stream and has no
 * /preview variant → broken thumbnail.
 */
export declare const IMAGE_EXTENSION_REGEX: RegExp;
/**
 * Check if a given text represents an image file path
 * @param text Text to check
 * @returns Boolean indicating if text is an image path
 */
export declare function isImageFilePath(text: string): boolean;
/**
 * Clean and normalize a text string that might be an image file path
 * @param text Text to process
 * @returns Cleaned text with quotes removed, whitespace trimmed, and shell escapes removed, or null if not an image path
 */
export declare function asImageFilePath(text: string): string | null;
/**
 * Try to find and read an image file, falling back to clipboard search
 * @param text Pasted text that might be an image filename or path
 * @returns Object containing the image path and base64 data, or null if not found
 */
export declare function tryReadImageFromPath(text: string): Promise<(ImageWithDimensions & {
    path: string;
}) | null>;
//# sourceMappingURL=imagePaste.d.ts.map