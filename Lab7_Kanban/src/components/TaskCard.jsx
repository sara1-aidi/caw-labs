import { useState } from "react";

function TaskCard({ task, moveTask, deleteTask, nextStatus, nextStatusText, color }) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusDisplay = (status) => {
    const statusMap = {
      todo: { text: "To Do", emoji: "📝" },
      inProgress: { text: "In Progress", emoji: "⚡" },
      done: { text: "Done", emoji: "✅" }
    };
    return statusMap[status] || { text: status, emoji: "" };
  };

  const statusInfo = getStatusDisplay(task.status);

  return (
    <div 
      className="task-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderLeft: `4px solid ${color}`,
        animationDelay: `${Math.random() * 0.3}s`
      }}
    >
      <div className="task-header">
        <h4>{task.title}</h4>
        <span className="task-status">
          {statusInfo.emoji} {statusInfo.text}
        </span>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        <small className="task-id">ID: {task.id}</small>
        
        <div className="task-actions">
          <button 
            className="action-btn btn-move"
            onClick={() => moveTask(task.id, nextStatus)}
            title={`Move to ${nextStatus}`}
          >
            <span>→</span> {nextStatusText}
          </button>
          
          <button 
            className="action-btn btn-delete"
            onClick={() => deleteTask(task.id)}
            title="Delete task"
          >
            <span>✕</span> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;