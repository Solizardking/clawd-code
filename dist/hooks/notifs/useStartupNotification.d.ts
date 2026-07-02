import { type Notification } from '../../context/notifications.js';
type Result = Notification | Notification[] | null;
/**
 * Fires notification(s) once on mount. Encapsulates the remote-mode gate and
 * once-per-session ref guard that was hand-rolled across 10+ notifs/ hooks.
 *
 * The compute fn runs exactly once on first effect. Return null to skip,
 * a Notification to fire one, or an array to fire several. Sync or async.
 * Rejections are routed to logError.
 */
export declare function useStartupNotification(compute: () => Result | Promise<Result>): void;
export {};
//# sourceMappingURL=useStartupNotification.d.ts.map