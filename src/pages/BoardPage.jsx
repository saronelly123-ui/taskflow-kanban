
import { useState } from "react";
import { Link } from "react-router-dom";

import Column from "../components/Column";
import FilterBar from "../components/FilterBar";
import useTaskFilter from "../hooks/useTaskFilter";

function BoardPage({
  tasks,
  addTask,
  moveTask,
  deleteTask,
  isLoading,
}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");

  const filteredTasks = useTaskFilter(
    tasks,
    searchTerm,
    selectedPriority
  );

  // Calculate dashboard statistics
  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "inprogress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Add new task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "todo",
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading your tasks...</h2>
        <p>Please wait while we prepare your board.</p>
      </div>
    );
  }

  return (
    <div className="app-container">

      {/* NAVIGATION */}
      <header className="navbar">
        <h1>TaskFlow</h1>

        <nav>
          <Link to="/">Board</Link>
          <Link to="/archive">Archive</Link>
        </nav>
      </header>

      <main className="board-container">

        {/* BOARD HEADING */}
        <div className="board-heading">
          <div>
            <h2>My Task Board</h2>
            <p>Organize your work and track your progress.</p>
          </div>

          <button
            className="add-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "+ Add Task"}
          </button>
        </div>

        {/* DASHBOARD STATISTICS */}
        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon purple">📋</div>
            <div>
              <p>Total Tasks</p>
              <h2>{totalTasks}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">📝</div>
            <div>
              <p>To Do</p>
              <h2>{todoTasks}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⚡</div>
            <div>
              <p>In Progress</p>
              <h2>{inProgressTasks}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Completed</p>
              <h2>{completedTasks}</h2>
            </div>
          </div>

        </div>

        {/* TASK PROGRESS */}
        <div className="progress-section">

          <div className="progress-heading">
            <h3>Overall Progress</h3>
            <span>{progress}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p>
            {completedTasks} of {totalTasks} tasks completed
          </p>

        </div>

        {/* ADD TASK FORM */}
        {showForm && (
          <form className="task-form" onSubmit={handleSubmit}>

            <h3>Create New Task</h3>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <button type="submit">Save Task</button>

          </form>
        )}

        {/* SEARCH AND FILTER */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priority={selectedPriority}
          setPriority={setSelectedPriority}
        />

        {/* KANBAN COLUMNS */}
        <div className="kanban-board">

          <Column
            title="To Do"
            status="todo"
            tasks={filteredTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />

          <Column
            title="In Progress"
            status="inprogress"
            tasks={filteredTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />

          <Column
            title="Done"
            status="done"
            tasks={filteredTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />

        </div>

        {/* EMPTY SEARCH RESULTS */}
        {filteredTasks.length === 0 && (
          <div className="empty-message">
            <h3>No tasks found</h3>
            <p>Try another search term or priority filter.</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default BoardPage;
