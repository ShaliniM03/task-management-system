import AppBar from "./appbar";
import { useId, useState } from "react";

type Props = {
  onCancel: () => void;
  onAdd: (title: string, description: string) => void;
};

export default function AddTaskScreen({ onCancel, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const titleId = useId();
  const descId = useId();

  const canAdd = title.trim().length > 0;

  return (
    <div className="screen">
      <AppBar title="Add Task" showBack onBack={onCancel} />
      <div className="screen__body">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canAdd) return;
            onAdd(title.trim(), desc.trim());
          }}
        >
          <div className="form__group">
            <label htmlFor={titleId}>Enter the title</label>
            <input
              id={titleId}
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form__group">
            <label htmlFor={descId}>Enter the description</label>
            <textarea
              id={descId}
              placeholder="Enter the description"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="form__row">
            <button type="button" className="btn ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={!canAdd}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
