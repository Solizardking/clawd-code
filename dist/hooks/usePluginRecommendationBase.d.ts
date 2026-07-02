import type { useNotifications } from '../context/notifications.js';
import { getPluginById } from '../utils/plugins/marketplaceManager.js';
type AddNotification = ReturnType<typeof useNotifications>['addNotification'];
type PluginData = NonNullable<Awaited<ReturnType<typeof getPluginById>>>;
/**
 * Call tryResolve inside a useEffect; it applies standard gates (remote
 * mode, already-showing, in-flight) then runs resolve(). Non-null return
 * becomes the recommendation. Include tryResolve in effect deps — its
 * identity tracks recommendation, so clearing re-triggers resolution.
 */
export declare function usePluginRecommendationBase(): any;
/** Look up plugin, run install(), emit standard success/failure notification. */
export declare function installPluginAndNotify(pluginId: string, pluginName: string, keyPrefix: string, addNotification: AddNotification, install: (pluginData: PluginData) => Promise<void>): Promise<void>;
export {};
//# sourceMappingURL=usePluginRecommendationBase.d.ts.map