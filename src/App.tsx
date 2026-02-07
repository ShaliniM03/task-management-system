import { useMemo, useState } from "react";
import "./styles.css";
import AppBar from "./components/appbar";
import SearchBox from "./components/searchBox";
import TaskSection from "./components/taskSelection";
import FloatingActionButton from "./components/floatingActionButton";
import type { Status, Task } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import AddTaskScreen from "./components/addTaskScreen";
import EditTaskScreen from "./components/editTaskScreen";

type View = { name: "list" } | { name: "add" } | { name: "edit"; id: string };

const STORAGE_KEY = "todo-app:v2";

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);
  const [view, setView] = useState<View>({ name: "list" });
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        (t.description ?? "").toLowerCase().includes(query),
    );
  }, [tasks, q]);

  const byStatus = useMemo(() => {
    const buckets: Record<Status, Task[]> = {
      pending: [],
      "in-progress": [],
      completed: [],
    };
    for (const t of filtered) buckets[t.status].push(t);
    return buckets;
  }, [filtered]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "pending",
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setView({ name: "list" });
  };

  const updateTask = (id: string, patch: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editingTask =
    view.name === "edit" ? tasks.find((t) => t.id === view.id) : undefined;

  if (view.name === "add") {
    return (
      <AddTaskScreen
        onCancel={() => setView({ name: "list" })}
        onAdd={addTask}
      />
    );
  }

  if (view.name === "edit" && editingTask) {
    return (
      <EditTaskScreen
        task={editingTask}
        onCancel={() => setView({ name: "list" })}
        onUpdate={(patch) => {
          updateTask(editingTask.id, patch);
          setView({ name: "list" });
        }}
      />
    );
  }

  // LIST SCREEN
  return (
    <div className="page">
      <AppBar title="TODO APP" />
      <div className="page__body">
        <SearchBox value={q} onChange={setQ} />

        <div className="sections">
          <TaskSection
            title="In Progress"
            count={byStatus["in-progress"].length}
            tasks={byStatus["in-progress"]}
            onEdit={(id) => setView({ name: "edit", id })}
            onDelete={deleteTask}
          />
          <TaskSection
            title="Pending"
            count={byStatus["pending"].length}
            tasks={byStatus["pending"]}
            onEdit={(id) => setView({ name: "edit", id })}
            onDelete={deleteTask}
          />
          <TaskSection
            title="Completed"
            count={byStatus["completed"].length}
            tasks={byStatus["completed"]}
            onEdit={(id) => setView({ name: "edit", id })}
            onDelete={deleteTask}
            defaultOpen={false}
          />
        </div>
      </div>

      <FloatingActionButton onClick={() => setView({ name: "add" })} />
    </div>
  );
}
