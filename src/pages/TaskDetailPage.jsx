
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDetailPage({ tasks, updateTask, deleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((item) => item.id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "Medium",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]);

  if (!task) {
    return (
      <div className="board-container">
        <h2>Task not found</h2>
        <button onClick={() => navigate("/")}>Back to Board</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(id, formData);
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(id);
    navigate("/");
  };

  return (
    <div className="board-container">
      <h2>Edit Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="Task title"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Description"
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button type="submit">Save Changes</button>

        <button type="button" onClick={handleDelete}>
          Delete Task
        </button>

        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TaskDetailPage;
