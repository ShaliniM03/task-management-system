import type { Status } from "../types";

export default function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`status-pill status-${status}`}>
      <span className="dot" />
      {statusLabel(status)}
    </span>
  );
}

export function statusLabel(s: Status) {
  switch (s) {
    case "pending":
      return "Pending";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
  }
}
