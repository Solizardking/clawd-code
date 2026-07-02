import { type UUID } from 'crypto';
export type ParsedSessionUrl = {
    sessionId: UUID;
    ingressUrl: string | null;
    isUrl: boolean;
    jsonlFile: string | null;
    isJsonlFile: boolean;
};
/**
 * Parses a session resume identifier which can be either:
 * - A URL containing session ID (e.g., https://api.example.com/v1/session_ingress/session/550e8400-e29b-41d4-a716-446655440000)
 * - A plain session ID (UUID)
 *
 * @param resumeIdentifier - The URL or session ID to parse
 * @returns Parsed session information or null if invalid
 */
export declare function parseSessionIdentifier(resumeIdentifier: string): ParsedSessionUrl | null;
//# sourceMappingURL=sessionUrl.d.ts.map