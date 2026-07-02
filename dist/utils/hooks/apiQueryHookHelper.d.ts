import type { QuerySource } from '../../constants/querySource.js';
import type { Message } from '../../types/message.js';
import type { REPLHookContext } from './postSamplingHooks.js';
export type ApiQueryHookContext = REPLHookContext & {
    queryMessageCount?: number;
};
export type ApiQueryHookConfig<TResult> = {
    name: QuerySource;
    shouldRun: (context: ApiQueryHookContext) => Promise<boolean>;
    buildMessages: (context: ApiQueryHookContext) => Message[];
    systemPrompt?: string;
    useTools?: boolean;
    parseResponse: (content: string, context: ApiQueryHookContext) => TResult;
    logResult: (result: ApiQueryResult<TResult>, context: ApiQueryHookContext) => void;
    getModel: (context: ApiQueryHookContext) => string;
};
export type ApiQueryResult<TResult> = {
    type: 'success';
    queryName: string;
    result: TResult;
    messageId: string;
    model: string;
    uuid: string;
} | {
    type: 'error';
    queryName: string;
    error: Error;
    uuid: string;
};
export declare function createApiQueryHook<TResult>(config: ApiQueryHookConfig<TResult>): (context: ApiQueryHookContext) => Promise<void>;
//# sourceMappingURL=apiQueryHookHelper.d.ts.map