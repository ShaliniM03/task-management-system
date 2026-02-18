import AppBar from "./appBar";
import StatusSelect from "./statusSelect";
import { useId, useState } from "react";
import type { Status, Task } from "../types";

type Props = {
  task: Task;
  onCancel: () => void;
  onUpdate: (patch: {
    title: string;
    description: string;
    status: Status;
  }) => void;
};

export default function EditTaskScreen({ task, onCancel, onUpdate }: Props) {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description ?? "");
  const [status, setStatus] = useState<Status>(task.status);
  const titleId = useId();
  const descId = useId();

  const canSave =
    title.trim().length > 0 &&
    (title.trim() !== task.title ||
      desc.trim() !== (task.description ?? "") ||
      status !== task.status);

  return (
    <div className="screen">
      <AppBar title="Edit Task" showBack onBack={onCancel} />
      <div className="screen__body">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSave) return;
            onUpdate({ title: title.trim(), description: desc.trim(), status });
          }}
        >
          <div className="form__group">
            <label htmlFor={titleId}>Enter the title</label>
            <input
              id={titleId}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor={descId}>Enter the description</label>
            <textarea
              id={descId}
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label>Update Status</label>
            <StatusSelect value={status} onChange={setStatus} />
          </div>

          <div className="form__row">
            <button type="button" className="btn ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={!canSave}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
