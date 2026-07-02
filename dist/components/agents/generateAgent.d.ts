import type { ModelName } from 'src/utils/model/model.js';
type GeneratedAgent = {
    identifier: string;
    whenToUse: string;
    systemPrompt: string;
};
export declare function generateAgent(userPrompt: string, model: ModelName, existingIdentifiers: string[], abortSignal: AbortSignal): Promise<GeneratedAgent>;
export {};
//# sourceMappingURL=generateAgent.d.ts.map