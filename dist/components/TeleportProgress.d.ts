import type { Root } from '../ink.js';
import { type TeleportResult } from '../utils/teleport.js';
export declare function TeleportProgress(t0: any): any;
/**
 * Teleports to a remote session with progress UI rendered into the existing root.
 * Fetches the session, checks out the branch, and returns the result.
 */
export declare function teleportWithProgress(root: Root, sessionId: string): Promise<TeleportResult>;
//# sourceMappingURL=TeleportProgress.d.ts.map