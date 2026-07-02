import type { TaskType } from '../../Task.js';
import type { Tool } from '../../Tool.js';
declare const inputSchema: () => any;
type InputSchema = ReturnType<typeof inputSchema>;
type TaskOutput = {
    task_id: string;
    task_type: TaskType;
    status: string;
    description: string;
    output: string;
    exitCode?: number | null;
    error?: string;
    prompt?: string;
    result?: string;
};
type TaskOutputToolOutput = {
    retrieval_status: 'success' | 'timeout' | 'not_ready';
    task: TaskOutput | null;
};
export type { TaskOutputProgress as Progress } from '../../types/tools.js';
export declare const TaskOutputTool: Tool<InputSchema, TaskOutputToolOutput>;
export default TaskOutputTool;
//# sourceMappingURL=TaskOutputTool.d.ts.map