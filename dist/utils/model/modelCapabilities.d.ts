import { z } from 'zod/v4';
declare const ModelCapabilitySchema: () => any;
export type ModelCapability = z.infer<ReturnType<typeof ModelCapabilitySchema>>;
export declare function getModelCapability(model: string): ModelCapability | undefined;
export declare function refreshModelCapabilities(): Promise<void>;
export {};
//# sourceMappingURL=modelCapabilities.d.ts.map