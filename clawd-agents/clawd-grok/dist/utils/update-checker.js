import semverGt from "semver/functions/gt.js";
import semverValid from "semver/functions/valid.js";
import { fetchLatestReleaseVersion, runScriptManagedUpdate } from "./install-manager";
export async function checkForUpdate(currentVersion) {
    try {
        const latestVersion = await fetchLatestReleaseVersion();
        if (!latestVersion || !semverValid(latestVersion))
            return null;
        const normalizedCurrent = semverValid(currentVersion);
        if (!normalizedCurrent)
            return null;
        const hasUpdate = semverGt(latestVersion, normalizedCurrent);
        return { currentVersion: normalizedCurrent, latestVersion, hasUpdate };
    }
    catch {
        return null;
    }
}
export function runUpdate(currentVersion) {
    return runScriptManagedUpdate(currentVersion);
}
//# sourceMappingURL=update-checker.js.map