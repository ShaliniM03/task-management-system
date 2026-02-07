export type Status = "pending" | "in-progress" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: number;
  updatedAt?: number;
};
