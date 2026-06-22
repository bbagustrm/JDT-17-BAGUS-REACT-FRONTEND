import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useTodo } from "@/hooks/useTodo";
import { ROUTES } from "@/constants/routes";
import type { TodoTypes } from "@/types/todo.types.ts";
import { useAuth } from '@/context/AuthContext';
import { SignOutIcon, ArrowLeftIcon } from '@phosphor-icons/react';

export default function TodosPage() {
    const { todos, toggleTodo, deleteTodo } = useTodo();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const navigate = useNavigate();
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate(ROUTES.HOME)
    }

    const handleToggle = (todo: TodoTypes) => {
        toggleTodo(todo.id);
        toast(todo.completed ? "TodoTypes marked as active!" : "TodoTypes completed!");
    };

    const handleDeleteConfirm = () => {
        if (deleteId) {
            deleteTodo(deleteId);
            setDeleteId(null);
            toast("TodoTypes deleted.");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-2xl mx-auto px-4 py-10">
                {/* Back + Logout */}
                <div className="w-full flex items-center justify-between mb-8">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Kembali
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <SignOutIcon size={16} />
                        Logout
                    </Button>
                </div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-semibold">My Todos</h1>
                    <Button onClick={() => navigate(ROUTES.TODOS_CREATE)}>
                        + New Todo
                    </Button>
                </div>

                {todos.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">
                        No todos yet. Create one!
                    </p>
                ) : (
                    <div className="divide-y rounded-md border">
                        {todos.map((todo) => (
                            <div
                                key={todo.id}
                                className="flex items-center gap-3 px-4 py-3"
                            >
                                <Checkbox
                                    id={todo.id}
                                    checked={todo.completed}
                                    onCheckedChange={() => handleToggle(todo)}
                                />
                                <label
                                    htmlFor={todo.id}
                                    className={`flex-1 cursor-pointer ${
                                        todo.completed
                                            ? "line-through text-muted-foreground"
                                            : ""
                                    }`}
                                >
                                    {todo.title}
                                </label>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setDeleteId(todo.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Todo?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}