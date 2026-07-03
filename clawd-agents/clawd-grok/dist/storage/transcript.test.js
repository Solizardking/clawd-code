import { describe, expect, it } from "vitest";
import { extractToolResultFromOutput } from "./tool-results";
describe("transcript media tool results", () => {
    it("preserves media metadata when stored tool output is normalized", () => {
        const mediaResult = {
            success: true,
            output: "Generated 1 image.\n- /tmp/example.png",
            media: [
                {
                    kind: "image",
                    path: "/tmp/example.png",
                    url: "https://example.com/generated.png",
                    sourcePath: "/tmp/source.png",
                    prompt: "Create a new hero image",
                    modelId: "grok-imagine-image",
                },
            ],
        };
        expect(extractToolResultFromOutput(mediaResult)).toEqual(mediaResult);
    });
});
//# sourceMappingURL=transcript.test.js.map