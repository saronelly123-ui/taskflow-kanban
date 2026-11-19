# TaskFlow – Kanban Task Management Board

TaskFlow is a simple and responsive Kanban task management application built with React. It helps users organize, manage, track, and update their daily tasks using a visual board.

## Features

- **Task Management:** Add, edit, delete, and manage tasks.
- **Kanban Board:** Organize tasks into three columns: To Do, In Progress, and Done.
- **Search:** Search tasks by title or description.
- **Priority Filter:** Filter tasks by High, Medium, and Low priority.
- **Task Details:** View and update individual task information.
- **Archive Page:** View completed tasks.
- **Local Storage:** Automatically save tasks so they remain available after refreshing the browser.
- **Loading State:** Display a simulated loading state.
- **Responsive Design:** Works on desktop, tablet, and mobile screens.
- **React Router:** Navigate between the board, task details, and archive pages.

## Technologies Used

- React
- JavaScript
- React Router DOM
- CSS
- Vite
- Browser Local Storage

## Project Structure

```text
taskflow-kanban/
├── public/
├── src/
│   ├── components/
│   │   ├── Column.jsx
│   │   ├── FilterBar.jsx
│   │   └── TaskCard.jsx
│   ├── data/
│   │   └── initialTasks.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useTaskFilter.js
│   ├── pages/
│   │   ├── ArchivePage.jsx
│   │   ├── BoardPage.jsx
│   │   └── TaskDetailPage.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/saronelly123-ui/taskflow-kanban.git
```

2. Open the project folder:

```bash
cd taskflow-kanban
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in your terminal.

## Available Commands

```bash
npm run dev
```
Starts the development server.

```bash
npm run build
```
Builds the application for production.

```bash
npm run preview
```
Previews the production build locally.

## Data Persistence

TaskFlow uses browser Local Storage to save task information. Tasks remain saved when the browser page is refreshed.

## Learning Objectives

This project demonstrates:

- React functional components
- Props and prop drilling
- React Hooks (`useState`, `useEffect`, and `useMemo`)
- Custom React Hooks
- React Router
- State management
- Local Storage
- Responsive web design

## Author

**Saro Nelly**

GitHub:https://github.com/saronelly123-ui/taskflow-kanban.git

## License

This project is created for educational purposes.