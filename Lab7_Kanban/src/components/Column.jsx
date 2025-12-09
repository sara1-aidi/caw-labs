import TaskCard from "./TaskCard";

function Column({ title, status, tasks, moveTask, deleteTask, nextStatus, nextStatusText, color }) {
  const filteredTasks = tasks.filter(t => t.status === status);

  return (
    <div className="column" data-status={status}>
      <div className="column-header">
        <h2 style={{ color }}>{title}</h2>
        <span className="task-count" style={{ background: color }}>
          {filteredTasks.length} tasks
        </span>
      </div>

      <div className="tasks-container">
        {filteredTasks.length === 0 ? (
          <p className="empty-message">Drag tasks here or create new ones</p>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              moveTask={moveTask}
              deleteTask={deleteTask}
              nextStatus={nextStatus}
              nextStatusText={nextStatusText}
              color={color}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;