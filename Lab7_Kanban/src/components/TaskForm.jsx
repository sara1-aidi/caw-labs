import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    
    addTask(title, description);
    setTitle("");
    setDescription("");
    setIsExpanded(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
          onFocus={() => setIsExpanded(true)}
        />
      </div>
      
      {isExpanded && (
        <div className="form-group">
          <textarea
            placeholder="Add description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows="3"
          />
        </div>
      )}
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          <span>+</span> Add Task
        </button>
        
        {isExpanded && (
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setIsExpanded(false)}
          >
            Collapse
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;