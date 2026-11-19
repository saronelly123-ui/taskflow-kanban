
import { Link } from "react-router-dom";

function ArchivePage({ tasks }) {
  const completedTasks = tasks.filter(
    (task) => task.status === "done"
  );

  return (
    <div className="board-container">
      <header className="navbar">
        <h1>TaskFlow</h1>
        <Link to="/">Back to Board</Link>
      </header>

      <h2 style={{ margin: "30px 0 20px" }}>
        Completed Tasks
      </h2>

      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        completedTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <Link to={`/task/${task.id}`} className="task-link">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </Link>
            <span className="priority low">Completed</span>
          </div>
        ))
      )}
    </div>
  );
}

export default ArchivePage;
