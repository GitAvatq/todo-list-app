import { create } from "zustand"
interface todoInfo {
    id: number;
    text: string;
    done: boolean;
}
interface TodoMainFunc {
    todos: todoInfo[];
    addTodoText: (text: string) => void;
    locationStor: () => void
    removeTodoText: (id: number) => void;
    redactorText: (newText: string, id: number) => void;
    provActivZadTodo: (id: number) => void;
}
export const useCreatTodoList = create<TodoMainFunc>((set) => ({
    todos: [],
    addTodoText: (text: string) => set((state) => {
        const newTodos = [...state.todos, { id: Date.now(), text, done: false }];
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos }
    }),
    locationStor: () => {
        const stored = localStorage.getItem("todos");
        if (stored) {
            set({ todos: JSON.parse(stored) })
        }
    },
    removeTodoText: (id: number) => set((state) => {
        const newTodos = state.todos.filter((ind) => ind.id !== id);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos }
    }),
    redactorText: (newText: string, id: number) => set((state) => {
        const updatedTodos = state.todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        return { todos: updatedTodos };
    }),
    provActivZadTodo: (id: number) => set((state) => {
        const newDoun = state.todos.map((ind) =>
            ind.id === id ? { ...ind, done: !ind.done } : ind
        );
        localStorage.setItem("todos", JSON.stringify(newDoun))
        return { todos: newDoun };
    })

}));