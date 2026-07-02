/**
 * Download functionality for native installer
 *
 * Handles downloading Claude binaries from various sources:
 * - Artifactory NPM packages
 * - GCS bucket
 */
import type { ReleaseChannel } from '../config.js';
export declare const ARTIFACTORY_REGISTRY_URL = "https://artifactory.infra.ant.dev/artifactory/api/npm/npm-all/";
export declare function getLatestVersionFromArtifactory(tag?: string): Promise<string>;
export declare function getLatestVersionFromBinaryRepo(channel: ReleaseChannel | undefined, baseUrl: string, authConfig?: {
    auth: {
        username: string;
        password: string;
    };
}): Promise<string>;
export declare function getLatestVersion(channelOrVersion: string): Promise<string>;
export declare function downloadVersionFromArtifactory(version: string, stagingPath: string): Promise<void>;
declare const MAX_DOWNLOAD_RETRIES = 3;
declare class StallTimeoutError extends Error {
    constructor();
}
/**
 * Common logic for downloading and verifying a binary.
 * Includes stall detection (aborts if no bytes for 60s) and retry logic.
 */
declare function downloadAndVerifyBinary(binaryUrl: string, expectedChecksum: string, binaryPath: string, requestConfig?: Record<string, unknown>): Promise<void>;
export declare function downloadVersionFromBinaryRepo(version: string, stagingPath: string, baseUrl: string, authConfig?: {
    auth?: {
        username: string;
        password: string;
    };
    headers?: Record<string, string>;
}): Promise<void>;
export declare function downloadVersion(version: string, stagingPath: string): Promise<'npm' | 'binary'>;
export { StallTimeoutError, MAX_DOWNLOAD_RETRIES };
export declare const STALL_TIMEOUT_MS = 60000;
export declare const _downloadAndVerifyBinaryForTesting: typeof downloadAndVerifyBinary;
//# sourceMappingURL=download.d.ts.map