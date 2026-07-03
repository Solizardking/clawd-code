import type { VerifyRetryStrategy } from "../types/index";
import type { VerifyProjectProfile } from "./recipes";
export declare function getVerifyRetryStrategies(profile: VerifyProjectProfile): VerifyRetryStrategy[];
export declare function buildRetryGuidance(profile: VerifyProjectProfile): string[];
