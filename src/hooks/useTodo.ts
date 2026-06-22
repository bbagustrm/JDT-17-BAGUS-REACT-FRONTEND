import { useLocalStorage } from "./useLocalStorage";
import type { TodoTypes } from "@/types/todo.types.ts";

export function useTodo() {
    const [todos, setTodos] = useLocalStorage<TodoTypes[]>("todos", []);

    const createTodo = (title: string) => {
        const newTodo: TodoTypes = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return { todos, createTodo, toggleTodo, deleteTodo };
}