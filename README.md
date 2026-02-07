React + TypeScript To‑Do App
A simplified task management app built with React 18 + TypeScript using Vite.
It implements the UI and flows shown in the provided Figma screens:

List view with search and collapsible sections: In Progress, Pending, Completed (each with counts)
Add Task screen (blue app bar, Cancel/Add actions)
Edit Task screen (title, description, status dropdown with colored dots)
Floating “+” button (FAB)
LocalStorage persistence, status grouping, and subtle hover/entry animations


✨ Features

Add, edit, delete tasks
Update task status: Pending / In Progress / Completed
Search by title or description
Grouped sections with item counts and collapsible panels
Persists tasks to LocalStorage
Keyboard-accessible, responsive UI
Pixel‑polished FAB (safe-area aware for iOS)

🧱 Tech Stack

React 18, TypeScript
Vite (dev server & build)
Plain CSS with CSS variables (easy theming to Figma tokens)
No backend required

🗂 Project Structure
.
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ src
   ├─ App.tsx
   ├─ main.tsx
   ├─ styles.css
   ├─ types.ts
   ├─ hooks
   │  └─ useLocalStorage.ts
   └─ components
      ├─ appBar.tsx
      ├─ floatingActionButton.tsx
      ├─ searchBox.tsx
      ├─ statusPill.tsx
      ├─ statusSelect.tsx
      ├─ taskCard.tsx
      ├─ taskSection.tsx
      ├─ addTaskScreen.tsx
      └─ editTaskScreen.tsx



🚀 Getting Started
Prerequisites

Node.js 18+ and npm

Install & Run (Development)
Shellnpm installnpm run devShow more lines
Open the printed local URL (e.g., http://localhost:5173).
Build & Preview (Production)
Shellnpm run buildnpm run previewShow more lines

🧭 How to Use

Click the floating “+” button to add a task → enter title (required) and optional description → Add.
Click the edit icon on a card (or double‑click the card) to update the task. Change status via the dropdown → Update.
Delete a task using the trash icon on the card.
Use the search box to filter tasks by title or description.
Toggle each section header to collapse/expand and view the item count.


🧩 Data Model
TypeScripttype Status = 'pending' | 'in-progress' | 'completed';type Task = {  id: string;  title: string;  description?: string;  status: Status;  createdAt: number;  updatedAt?: number;};``Show more lines

Storage key: todo-app:v2
IDs: crypto.randomUUID()


✅ Requirements Mapping

Task List: TaskSection + TaskCard show title, description, status; grouped and collapsible with counts.
Add Task: AddTaskScreen with required title, optional description; Cancel/Add actions.
Mark as Completed / Update Status: EditTaskScreen with StatusSelect.
Edit Task: EditTaskScreen updates title, description, and status.
Delete Task: Trash icon on TaskCard.
State Management: Local component state in App.tsx; persistence via useLocalStorage.
Component Design: Reusable components (AppBar, SearchBox, TaskSection, TaskCard, StatusSelect, FloatingActionButton, AddTaskScreen, EditTaskScreen).
UI/Styling: CSS variables, responsive layout, accessible focus, subtle animations.
Good to Have: LocalStorage persistence, status filters (by sections), gentle animations.


🧠 Design Decisions

Vite + TypeScript for speed and type safety.
Local state keeps the app lightweight; no external state library necessary for this scope.
LocalStorage persistence avoids backend complexity while meeting “persist tasks”.
Component boundaries mirror user flows (Add/Edit/List).
Accessibility: :focus-visible, labeled inputs, ARIA on the custom status select.
Theming: CSS variables enable quick alignment to any design system.

♿ Accessibility Checklist

Keyboard focus ring on interactive elements
Inputs have labels; buttons have aria-label where needed
Custom status select exposes aria-haspopup / aria-expanded


📈 Potential Enhancements

Delete confirmation (toast/modal)
Exit animations on delete (Framer Motion or react-transition-group)
Drag-and-drop reordering
Unit tests (Vitest + Testing Library)
PWA support and CI (GitHub Actions)
ESLint + Prettier + Husky hooks

🧪 Manual Test Guide

Add, edit, delete tasks
Change status and verify section/group updates and counts
Search filters by title and description
Refresh — tasks persist
FAB is visible, correctly spaced from edges, and keyboard‑focusable
