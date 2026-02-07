import type { Task } from "../types";
import StatusPill from "./statusPill";

type Props = {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <article className="task-card" tabIndex={0}>
      <div className="task-card__badge">
        <StatusPill status={task.status} />
      </div>

      <div className="task-card__content" onDoubleClick={() => onEdit(task.id)}>
        <h3 className="task-card__title">{task.title}</h3>
        {task.description && (
          <p className="task-card__desc">{task.description}</p>
        )}
      </div>

      <div className="task-card__actions">
        <button
          className="icon-btn ghost"
          title="Edit"
          aria-label="Edit"
          onClick={() => onEdit(task.id)}
        >
          ✏️
        </button>
        <button
          className="icon-btn danger ghost"
          title="Delete"
          aria-label="Delete"
          onClick={() => onDelete(task.id)}
        >
          🗑️
        </button>
      </div>
    </article>
  );
}
