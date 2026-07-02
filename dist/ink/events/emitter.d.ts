import { EventEmitter as NodeEventEmitter } from 'events';
export declare class EventEmitter extends NodeEventEmitter {
    constructor();
    emit(type: string | symbol, ...args: unknown[]): boolean;
}
//# sourceMappingURL=emitter.d.ts.map