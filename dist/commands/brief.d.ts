import type { ToolUseContext } from '../Tool.js';
import type { LocalJSXCommandContext, LocalJSXCommandOnDone } from '../types/command.js';
declare const brief: {
    type: "local-jsx";
    name: string;
    description: string;
    isEnabled: () => any;
    immediate: true;
    load: () => Promise<{
        call(onDone: LocalJSXCommandOnDone, context: ToolUseContext & LocalJSXCommandContext): Promise<React.ReactNode>;
    }>;
};
export default brief;
//# sourceMappingURL=brief.d.ts.map