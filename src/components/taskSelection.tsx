import TaskCard from "./taskCard";
import type { Task } from "../types";

type Props = {
  title: string;
  count: number;
  defaultOpen?: boolean;
  tasks: Task[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskSection({
  title,
  count,
  tasks,
  onEdit,
  onDelete,
  defaultOpen = true,
}: Props) {
  return (
    <details className="task-section" open={defaultOpen}>
      <summary>
        <span>{title}</span>
        <span className="count">({count})</span>
      </summary>

      {tasks.length === 0 ? (
        <div className="empty-line">No items</div>
      ) : (
        <div className="task-grid">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </details>
  );
}
