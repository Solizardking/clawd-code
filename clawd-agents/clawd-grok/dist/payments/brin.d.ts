export interface BrinThreat {
    type: string;
    severity: string;
    detail: string;
}
export interface BrinSubScores {
    identity: number | null;
    behavior: number | null;
    content: number | null;
    graph: number | null;
}
export interface BrinScanResult {
    score: number;
    verdict: "safe" | "caution" | "suspicious" | "dangerous";
    confidence: "high" | "medium" | "low";
    url?: string;
    subScores?: BrinSubScores;
    threats?: BrinThreat[];
}
/**
 * Scan a URL's domain via the brin API with expanded details.
 * Returns `null` when brin is unreachable or returns an unexpected response
 * so callers can gracefully degrade.
 */
export declare function scanUrl(url: string, timeoutMs?: number): Promise<BrinScanResult | null>;
