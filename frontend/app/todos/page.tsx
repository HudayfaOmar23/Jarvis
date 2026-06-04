"use client";
import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";
import { apiFetch } from "@/lib/api";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    apiFetch("/todos/").then(setTodos);
  }, []);

  async function addTodo() {
    if (!title.trim()) return;
    const newTodo = await apiFetch("/todos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTodos([newTodo, ...todos]);
    setTitle("");
  }

  async function toggleTodo(id: number, done: boolean) {
    const updated = await apiFetch(`/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done }),
    });
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTodo(id: number) {
    await apiFetch(`/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <main className="max-w-xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Jarvis</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a todo..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={addTodo}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Add
        </button>
      </div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
      {todos.length === 0 && (
        <p className="text-gray-400 text-sm text-center mt-8">No todos yet. Add one above.</p>
      )}
    </main>
  );
}