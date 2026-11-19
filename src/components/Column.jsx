
import TaskCard from "./TaskCard";

function Column({
  title,
  status,
  tasks,
  moveTask,
  deleteTask,
}) {
  const columnTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">
          {columnTasks.length}
        </span>
      </div>

      <div className="column-tasks">
        {columnTasks.length === 0 ? (
          <p className="empty-message">No tasks yet</p>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;
