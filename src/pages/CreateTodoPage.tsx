import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTodo } from "@/hooks/useTodo";
import { ROUTES } from "@/constants/routes";

export default function CreateTodoPage() {
    const [title, setTitle] = useState("");
    const { createTodo } = useTodo();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        createTodo(title.trim());
        navigate(ROUTES.TODOS);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-2xl mx-auto px-4 py-10">
                <h1 className="text-xl font-semibold mb-8">New Todo</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What needs to be done?"
                            autoFocus
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={!title.trim()}>
                            Save
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(ROUTES.TODOS)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}