import { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id, !todo.done)}
          className="w-4 h-4 cursor-pointer"
        />
        <span className={todo.done ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 text-sm"
      >
        delete
      </button>
    </div>
  );
}