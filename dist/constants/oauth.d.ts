export declare function fileSuffixForOauthConfig(): string;
export declare const INFERENCE_SCOPE: "user:inference";
export declare const PROFILE_SCOPE: "user:profile";
export declare const OAUTH_BETA_HEADER: "oauth-2025-04-20";
type OauthConfig = {
    BASE_API_URL: string;
    AUTHORIZE_URL: string;
    TOKEN_URL: string;
    SUCCESS_URL: string;
    MANUAL_REDIRECT_URL: string;
    CLIENT_ID: string;
    OAUTH_FILE_SUFFIX: string;
};
export declare function getOauthConfig(): OauthConfig;
export {};
//# sourceMappingURL=oauth.d.ts.map