import type { ModelName } from './model.js';
import type { APIProvider } from './providers.js';
export type ModelConfig = Record<APIProvider, ModelName>;
export declare const CLAUDE_3_7_SONNET_CONFIG: {
    readonly firstParty: "claude-3-7-sonnet-20250219";
    readonly bedrock: "us.anthropic.claude-3-7-sonnet-20250219-v1:0";
    readonly vertex: "claude-3-7-sonnet@20250219";
    readonly foundry: "claude-3-7-sonnet";
};
export declare const CLAUDE_3_5_V2_SONNET_CONFIG: {
    readonly firstParty: "claude-3-5-sonnet-20241022";
    readonly bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0";
    readonly vertex: "claude-3-5-sonnet-v2@20241022";
    readonly foundry: "claude-3-5-sonnet";
};
export declare const CLAUDE_3_5_HAIKU_CONFIG: {
    readonly firstParty: "claude-3-5-haiku-20241022";
    readonly bedrock: "us.anthropic.claude-3-5-haiku-20241022-v1:0";
    readonly vertex: "claude-3-5-haiku@20241022";
    readonly foundry: "claude-3-5-haiku";
};
export declare const CLAUDE_HAIKU_4_5_CONFIG: {
    readonly firstParty: "claude-haiku-4-5-20251001";
    readonly bedrock: "us.anthropic.claude-haiku-4-5-20251001-v1:0";
    readonly vertex: "claude-haiku-4-5@20251001";
    readonly foundry: "claude-haiku-4-5";
};
export declare const CLAUDE_SONNET_4_CONFIG: {
    readonly firstParty: "claude-sonnet-4-20250514";
    readonly bedrock: "us.anthropic.claude-sonnet-4-20250514-v1:0";
    readonly vertex: "claude-sonnet-4@20250514";
    readonly foundry: "claude-sonnet-4";
};
export declare const CLAUDE_SONNET_4_5_CONFIG: {
    readonly firstParty: "claude-sonnet-4-5-20250929";
    readonly bedrock: "us.anthropic.claude-sonnet-4-5-20250929-v1:0";
    readonly vertex: "claude-sonnet-4-5@20250929";
    readonly foundry: "claude-sonnet-4-5";
};
export declare const CLAUDE_OPUS_4_CONFIG: {
    readonly firstParty: "claude-opus-4-20250514";
    readonly bedrock: "us.anthropic.claude-opus-4-20250514-v1:0";
    readonly vertex: "claude-opus-4@20250514";
    readonly foundry: "claude-opus-4";
};
export declare const CLAUDE_OPUS_4_1_CONFIG: {
    readonly firstParty: "claude-opus-4-1-20250805";
    readonly bedrock: "us.anthropic.claude-opus-4-1-20250805-v1:0";
    readonly vertex: "claude-opus-4-1@20250805";
    readonly foundry: "claude-opus-4-1";
};
export declare const CLAUDE_OPUS_4_5_CONFIG: {
    readonly firstParty: "claude-opus-4-5-20251101";
    readonly bedrock: "us.anthropic.claude-opus-4-5-20251101-v1:0";
    readonly vertex: "claude-opus-4-5@20251101";
    readonly foundry: "claude-opus-4-5";
};
export declare const CLAUDE_OPUS_4_6_CONFIG: {
    readonly firstParty: "claude-opus-4-6";
    readonly bedrock: "us.anthropic.claude-opus-4-6-v1";
    readonly vertex: "claude-opus-4-6";
    readonly foundry: "claude-opus-4-6";
};
export declare const CLAUDE_SONNET_4_6_CONFIG: {
    readonly firstParty: "claude-sonnet-4-6";
    readonly bedrock: "us.anthropic.claude-sonnet-4-6";
    readonly vertex: "claude-sonnet-4-6";
    readonly foundry: "claude-sonnet-4-6";
};
export declare const ALL_MODEL_CONFIGS: {
    readonly haiku35: {
        readonly firstParty: "claude-3-5-haiku-20241022";
        readonly bedrock: "us.anthropic.claude-3-5-haiku-20241022-v1:0";
        readonly vertex: "claude-3-5-haiku@20241022";
        readonly foundry: "claude-3-5-haiku";
    };
    readonly haiku45: {
        readonly firstParty: "claude-haiku-4-5-20251001";
        readonly bedrock: "us.anthropic.claude-haiku-4-5-20251001-v1:0";
        readonly vertex: "claude-haiku-4-5@20251001";
        readonly foundry: "claude-haiku-4-5";
    };
    readonly sonnet35: {
        readonly firstParty: "claude-3-5-sonnet-20241022";
        readonly bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0";
        readonly vertex: "claude-3-5-sonnet-v2@20241022";
        readonly foundry: "claude-3-5-sonnet";
    };
    readonly sonnet37: {
        readonly firstParty: "claude-3-7-sonnet-20250219";
        readonly bedrock: "us.anthropic.claude-3-7-sonnet-20250219-v1:0";
        readonly vertex: "claude-3-7-sonnet@20250219";
        readonly foundry: "claude-3-7-sonnet";
    };
    readonly sonnet40: {
        readonly firstParty: "claude-sonnet-4-20250514";
        readonly bedrock: "us.anthropic.claude-sonnet-4-20250514-v1:0";
        readonly vertex: "claude-sonnet-4@20250514";
        readonly foundry: "claude-sonnet-4";
    };
    readonly sonnet45: {
        readonly firstParty: "claude-sonnet-4-5-20250929";
        readonly bedrock: "us.anthropic.claude-sonnet-4-5-20250929-v1:0";
        readonly vertex: "claude-sonnet-4-5@20250929";
        readonly foundry: "claude-sonnet-4-5";
    };
    readonly sonnet46: {
        readonly firstParty: "claude-sonnet-4-6";
        readonly bedrock: "us.anthropic.claude-sonnet-4-6";
        readonly vertex: "claude-sonnet-4-6";
        readonly foundry: "claude-sonnet-4-6";
    };
    readonly opus40: {
        readonly firstParty: "claude-opus-4-20250514";
        readonly bedrock: "us.anthropic.claude-opus-4-20250514-v1:0";
        readonly vertex: "claude-opus-4@20250514";
        readonly foundry: "claude-opus-4";
    };
    readonly opus41: {
        readonly firstParty: "claude-opus-4-1-20250805";
        readonly bedrock: "us.anthropic.claude-opus-4-1-20250805-v1:0";
        readonly vertex: "claude-opus-4-1@20250805";
        readonly foundry: "claude-opus-4-1";
    };
    readonly opus45: {
        readonly firstParty: "claude-opus-4-5-20251101";
        readonly bedrock: "us.anthropic.claude-opus-4-5-20251101-v1:0";
        readonly vertex: "claude-opus-4-5@20251101";
        readonly foundry: "claude-opus-4-5";
    };
    readonly opus46: {
        readonly firstParty: "claude-opus-4-6";
        readonly bedrock: "us.anthropic.claude-opus-4-6-v1";
        readonly vertex: "claude-opus-4-6";
        readonly foundry: "claude-opus-4-6";
    };
};
export type ModelKey = keyof typeof ALL_MODEL_CONFIGS;
/** Union of all canonical first-party model IDs, e.g. 'claude-opus-4-6' | 'claude-sonnet-4-5-20250929' | … */
export type CanonicalModelId = (typeof ALL_MODEL_CONFIGS)[ModelKey]['firstParty'];
/** Runtime list of canonical model IDs — used by comprehensiveness tests. */
export declare const CANONICAL_MODEL_IDS: [CanonicalModelId, ...CanonicalModelId[]];
/** Map canonical ID → internal short key. Used to apply settings-based modelOverrides. */
export declare const CANONICAL_ID_TO_KEY: Record<CanonicalModelId, ModelKey>;
//# sourceMappingURL=configs.d.ts.map