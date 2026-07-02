import { type SessionExternalMetadata } from '../utils/sessionState.js';
import type { AppState } from './AppStateStore.js';
export declare function externalMetadataToAppState(metadata: SessionExternalMetadata): (prev: AppState) => AppState;
export declare function onChangeAppState({ newState, oldState, }: {
    newState: AppState;
    oldState: AppState;
}): void;
//# sourceMappingURL=onChangeAppState.d.ts.map