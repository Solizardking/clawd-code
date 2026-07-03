import type { ToolResult } from "../types/index";
import type { XaiProvider } from "./client";
export declare const IMAGE_ASPECT_RATIOS: readonly ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "2:1", "1:2", "19.5:9", "9:19.5", "20:9", "9:20", "auto"];
export declare const VIDEO_ASPECT_RATIOS: readonly ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"];
export declare const IMAGE_RESOLUTIONS: readonly ["1k", "2k"];
export declare const VIDEO_RESOLUTIONS: readonly ["480p", "720p"];
export type ImageAspectRatio = (typeof IMAGE_ASPECT_RATIOS)[number];
export type VideoAspectRatio = (typeof VIDEO_ASPECT_RATIOS)[number];
export type ImageResolution = (typeof IMAGE_RESOLUTIONS)[number];
export type VideoResolution = (typeof VIDEO_RESOLUTIONS)[number];
export interface GenerateImageToolInput {
    prompt: string;
    source?: string;
    aspect_ratio?: ImageAspectRatio;
    resolution?: ImageResolution;
    n?: number;
    output_path?: string;
}
export interface GenerateVideoToolInput {
    prompt: string;
    source?: string;
    duration?: number;
    aspect_ratio?: VideoAspectRatio;
    resolution?: VideoResolution;
    output_path?: string;
    poll_interval_ms?: number;
    poll_timeout_ms?: number;
}
export declare function generateImageTool(provider: XaiProvider, input: GenerateImageToolInput, cwd: string, abortSignal?: AbortSignal): Promise<ToolResult>;
export declare function generateVideoTool(provider: XaiProvider, input: GenerateVideoToolInput, cwd: string, abortSignal?: AbortSignal): Promise<ToolResult>;
