import { useLocalStorage } from "./useLocalStorage";
import type { Todo } from "@/types/todo";

export function useTodo() {
    const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

    const createTodo = (title: string) => {
        const newTodo: Todo = {
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