import { getApiKey, getBaseURL, resolveTelegramAudioInputSettings } from "../../utils/settings";
import { GrokSttEngine } from "./grok-stt";
export function createTelegramAudioInputEngine(telegramSettings) {
    const resolved = resolveTelegramAudioInputSettings(telegramSettings);
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("Clawd STT requires an API key. Set AI_API_KEY or configure apiKey in ~/.clawd/user-settings.json.");
    }
    return new GrokSttEngine({
        apiKey,
        baseURL: getBaseURL(),
        language: resolved.language,
    });
}
//# sourceMappingURL=engine.js.map