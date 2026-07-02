import { z } from 'zod/v4';
export declare const TodoItemSchema: () => any;
export type TodoItem = z.infer<ReturnType<typeof TodoItemSchema>>;
export declare const TodoListSchema: () => any;
export type TodoList = z.infer<ReturnType<typeof TodoListSchema>>;
//# sourceMappingURL=types.d.ts.map