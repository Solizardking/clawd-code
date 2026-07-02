import { isEnvTruthy } from 'src/utils/envUtils.js';
function getOauthConfigType() {
    if (isEnvTruthy(process.env.USE_LOCAL_OAUTH)) {
        return 'local';
    }
    if (isEnvTruthy(process.env.USE_STAGING_OAUTH)) {
        return 'staging';
    }
    return 'prod';
}
export function fileSuffixForOauthConfig() {
    switch (getOauthConfigType()) {
        case 'local':
            return '-local-oauth';
        case 'staging':
            return '-staging-oauth';
        case 'prod':
            return '';
    }
}
export const INFERENCE_SCOPE = 'user:inference';
export const PROFILE_SCOPE = 'user:profile';
export const OAUTH_BETA_HEADER = 'oauth-2025-04-20';
// Production OAuth configuration
const PROD_OAUTH_CONFIG = {
    BASE_API_URL: 'https://api.clawd.code',
    AUTHORIZE_URL: 'https://clawd.code/oauth/authorize',
    TOKEN_URL: 'https://clawd.code/v1/oauth/token',
    SUCCESS_URL: 'https://clawd.code/oauth/code/success',
    MANUAL_REDIRECT_URL: 'https://clawd.code/oauth/code/callback',
    CLIENT_ID: 'clawd-code-cli-prod',
    OAUTH_FILE_SUFFIX: '',
};
// Staging OAuth configuration
const STAGING_OAUTH_CONFIG = {
    BASE_API_URL: 'https://api-staging.clawd.code',
    AUTHORIZE_URL: 'https://staging.clawd.code/oauth/authorize',
    TOKEN_URL: 'https://staging.clawd.code/v1/oauth/token',
    SUCCESS_URL: 'https://staging.clawd.code/oauth/code/success',
    MANUAL_REDIRECT_URL: 'https://staging.clawd.code/oauth/code/callback',
    CLIENT_ID: 'clawd-code-cli-staging',
    OAUTH_FILE_SUFFIX: '-staging-oauth',
};
// Local dev configuration
function getLocalOauthConfig() {
    const api = process.env.LOCAL_OAUTH_API_BASE?.replace(/\/$/, '') ?? 'http://localhost:8000';
    const apps = process.env.LOCAL_OAUTH_APPS_BASE?.replace(/\/$/, '') ?? 'http://localhost:4000';
    return {
        BASE_API_URL: api,
        AUTHORIZE_URL: `${apps}/oauth/authorize`,
        TOKEN_URL: `${api}/v1/oauth/token`,
        SUCCESS_URL: `${apps}/oauth/code/success`,
        MANUAL_REDIRECT_URL: `${apps}/oauth/code/callback`,
        CLIENT_ID: 'clawd-code-cli-local',
        OAUTH_FILE_SUFFIX: '-local-oauth',
    };
}
// Default to prod config, override with test/staging if enabled
export function getOauthConfig() {
    switch (getOauthConfigType()) {
        case 'local':
            return getLocalOauthConfig();
        case 'staging':
            return STAGING_OAUTH_CONFIG;
        case 'prod':
        default:
            return PROD_OAUTH_CONFIG;
    }
}
//# sourceMappingURL=oauth.js.map