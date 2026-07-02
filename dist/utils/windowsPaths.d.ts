/**
 * If Windows, set the SHELL environment variable to git-bash path.
 * This is used by BashTool and Shell.ts for user shell commands.
 * COMSPEC is left unchanged for system process execution.
 */
export declare function setShellIfWindows(): void;
/**
 * Find the path where `bash.exe` included with git-bash exists, exiting the process if not found.
 */
export declare const findGitBashPath: any;
/** Convert a Windows path to a POSIX path using pure JS. */
export declare const windowsPathToPosixPath: {
    (p: string): string;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => string | undefined;
        has: (key: string) => boolean;
    };
};
/** Convert a POSIX path to a Windows path using pure JS. */
export declare const posixPathToWindowsPath: {
    (p: string): string;
    cache: {
        clear: () => void;
        size: () => number;
        delete: (key: string) => boolean;
        get: (key: string) => string | undefined;
        has: (key: string) => boolean;
    };
};
//# sourceMappingURL=windowsPaths.d.ts.map