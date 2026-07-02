/**
 * Clawd Code — IMAGE MODE
 * Generate images via Z.AI GLM-Image, DALL-E, or Gemini fallback.
 */
export declare class ImageMode {
    private config;
    constructor(config: any);
    run(args: string[]): Promise<void>;
    private parseArgs;
    private isZaiImageModel;
    private generateWithZai;
    private generateWithDalle;
    private generateWithGemini;
}
//# sourceMappingURL=image.d.ts.map