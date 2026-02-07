import { useEffect, useRef, useState } from "react";
import type { Status } from "../types";
import { statusLabel } from "./statusPill";

type Props = {
  value: Status;
  onChange: (s: Status) => void;
};

const OPTIONS: Status[] = ["pending", "in-progress", "completed"];

export default function StatusSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="status-select" ref={ref}>
      <button
        type="button"
        className={`select-btn status-${value}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="dot" />
        {statusLabel(value)}
        <span className="chev">▾</span>
      </button>
      {open && (
        <ul className="select-menu" role="listbox">
          {OPTIONS.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className={`select-option ${opt === value ? "is-active" : ""}`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                role="option"
                aria-selected={opt === value}
              >
                <span className={`dot status-${opt}`} />
                {statusLabel(opt)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
