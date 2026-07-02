import type { ConfigParseError } from '../utils/errors.js';
interface InvalidConfigHandlerProps {
    error: ConfigParseError;
}
export declare function showInvalidConfigDialog({ error }: InvalidConfigHandlerProps): Promise<void>;
export {};
//# sourceMappingURL=InvalidConfigDialog.d.ts.map