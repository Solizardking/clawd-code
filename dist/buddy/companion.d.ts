import { type Companion, type CompanionBones } from './types.js';
export type Roll = {
    bones: CompanionBones;
    inspirationSeed: number;
};
export declare function roll(userId: string): Roll;
export declare function rollWithSeed(seed: string): Roll;
export declare function companionUserId(): string;
export declare function getCompanion(): Companion | undefined;
//# sourceMappingURL=companion.d.ts.map