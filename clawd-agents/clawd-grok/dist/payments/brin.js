const BRIN_API_BASE = "https://api.brin.sh";
const DEFAULT_TIMEOUT_MS = 2_000;
/**
 * Scan a URL's domain via the brin API with expanded details.
 * Returns `null` when brin is unreachable or returns an unexpected response
 * so callers can gracefully degrade.
 */
export async function scanUrl(url, timeoutMs = DEFAULT_TIMEOUT_MS) {
    let hostname;
    try {
        hostname = new URL(url).hostname;
    }
    catch {
        return null;
    }
    try {
        const response = await fetch(`${BRIN_API_BASE}/domain/${hostname}?details=true`, {
            signal: AbortSignal.timeout(timeoutMs),
        });
        if (!response.ok)
            return null;
        const data = (await response.json());
        if (typeof data.score !== "number" || typeof data.verdict !== "string")
            return null;
        const result = {
            score: data.score,
            verdict: data.verdict,
            confidence: (typeof data.confidence === "string" ? data.confidence : "low"),
            url: typeof data.url === "string" ? data.url : `${BRIN_API_BASE}/domain/${hostname}`,
        };
        const subScores = data.sub_scores;
        if (subScores && typeof subScores === "object") {
            const ss = subScores;
            result.subScores = {
                identity: typeof ss.identity === "number" ? ss.identity : null,
                behavior: typeof ss.behavior === "number" ? ss.behavior : null,
                content: typeof ss.content === "number" ? ss.content : null,
                graph: typeof ss.graph === "number" ? ss.graph : null,
            };
        }
        const threats = data.threats;
        if (Array.isArray(threats) && threats.length > 0) {
            result.threats = threats
                .filter((t) => typeof t === "object" && t !== null && typeof t.type === "string")
                .map((t) => ({
                type: String(t.type),
                severity: typeof t.severity === "string" ? t.severity : "unknown",
                detail: typeof t.detail === "string" ? t.detail : "",
            }));
        }
        return result;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=brin.js.map