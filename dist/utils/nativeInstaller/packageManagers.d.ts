/**
 * Package manager detection for Claude CLI
 */
export type PackageManager = 'homebrew' | 'winget' | 'pacman' | 'deb' | 'rpm' | 'apk' | 'mise' | 'asdf' | 'unknown';
/**
 * Parses /etc/os-release to extract the distro ID and ID_LIKE fields.
 * ID_LIKE identifies the distro family (e.g. Ubuntu has ID_LIKE=debian),
 * letting us skip package manager execs on distros that can't have them.
 * Returns null if the file is unreadable (pre-systemd or non-standard systems);
 * callers fall through to the exec in that case as a conservative fallback.
 */
export declare const getOsRelease: any;
/**
 * Detects if the currently running Claude instance was installed via mise
 * (a polyglot tool version manager) by checking if the executable path
 * is within a mise installs directory.
 *
 * mise installs to: ~/.local/share/mise/installs/<tool>/<version>/
 */
export declare function detectMise(): boolean;
/**
 * Detects if the currently running Claude instance was installed via asdf
 * (another polyglot tool version manager) by checking if the executable path
 * is within an asdf installs directory.
 *
 * asdf installs to: ~/.asdf/installs/<tool>/<version>/
 */
export declare function detectAsdf(): boolean;
/**
 * Detects if the currently running Claude instance was installed via Homebrew
 * by checking if the executable path is within a Homebrew Caskroom directory.
 *
 * Note: We specifically check for Caskroom because npm can also be installed via
 * Homebrew, which would place npm global packages under the same Homebrew prefix
 * (e.g., /opt/homebrew/lib/node_modules). We need to distinguish between:
 * - Homebrew cask: /opt/homebrew/Caskroom/claude-code/...
 * - npm-global (via Homebrew's npm): /opt/homebrew/lib/node_modules/@anthropic-ai/...
 */
export declare function detectHomebrew(): boolean;
/**
 * Detects if the currently running Claude instance was installed via winget
 * by checking if the executable path is within a WinGet directory.
 *
 * Winget installs to:
 * - User: %LOCALAPPDATA%\Microsoft\WinGet\Packages
 * - System: C:\Program Files\WinGet\Packages
 * And creates links at: %LOCALAPPDATA%\Microsoft\WinGet\Links\
 */
export declare function detectWinget(): boolean;
/**
 * Detects if the currently running Claude instance was installed via pacman
 * by querying pacman's database for file ownership.
 *
 * We gate on the Arch distro family before invoking pacman. On other distros
 * like Ubuntu/Debian, 'pacman' in PATH may resolve to the pacman game
 * (/usr/games/pacman) rather than the Arch package manager.
 */
export declare const detectPacman: any;
/**
 * Detects if the currently running Claude instance was installed via a .deb package
 * by querying dpkg's database for file ownership.
 *
 * We use `dpkg -S <execPath>` to check if the executable is owned by a dpkg-managed package.
 */
export declare const detectDeb: any;
/**
 * Detects if the currently running Claude instance was installed via an RPM package
 * by querying the RPM database for file ownership.
 *
 * We use `rpm -qf <execPath>` to check if the executable is owned by an RPM package.
 */
export declare const detectRpm: any;
/**
 * Detects if the currently running Claude instance was installed via Alpine APK
 * by querying apk's database for file ownership.
 *
 * We use `apk info --who-owns <execPath>` to check if the executable is owned
 * by an apk-managed package.
 */
export declare const detectApk: any;
/**
 * Memoized function to detect which package manager installed Claude
 * Returns 'unknown' if no package manager is detected
 */
export declare const getPackageManager: any;
//# sourceMappingURL=packageManagers.d.ts.map