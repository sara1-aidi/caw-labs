import { useState, useEffect } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import "./App.css";

// Initial tasks with descriptions
const initialTasks = [
  { 
    id: 1, 
    title: "Study React Hooks", 
    description: "Learn useState, useEffect, and useContext", 
    status: "todo" 
  },
  { 
    id: 2, 
    title: "Build Kanban Board", 
    description: "Complete Lab 7 assignment with all requirements", 
    status: "inProgress" 
  },
  { 
    id: 3, 
    title: "Write Unit Tests", 
    description: "Create Jest tests for all components", 
    status: "done" 
  },
  { 
    id: 4, 
    title: "Deploy to Netlify", 
    description: "Make the application live online", 
    status: "todo" 
  },
];

function App() {
  // Load tasks from localStorage or use initial
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description = "") => {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearAllTasks = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
    }
  };

  const resetToInitial = () => {
    setTasks(initialTasks);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📋 Kanban Board</h1>
        <p className="app-subtitle">Manage your tasks</p>
      </header>

      <main className="app-main">
        <div className="app-controls">
          <TaskForm addTask={addTask} />
          
          <div className="app-buttons">
            <button className="btn btn-reset" onClick={resetToInitial}>
              Reset Tasks
            </button>
            <button className="btn btn-clear" onClick={clearAllTasks}>
              Clear All
            </button>
          </div>
        </div>

        <div className="board">
          <Column
            title="📝 To Do"
            status="todo"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            nextStatus="inProgress"
            nextStatusText="Start Progress →"
            color="#4CAF50"
          />

          <Column
            title="⚡ In Progress"
            status="inProgress"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            nextStatus="done"
            nextStatusText="Mark Done →"
            color="#2196F3"
          />

          <Column
            title="✅ Done"
            status="done"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            nextStatus="todo"
            nextStatusText="Reopen Task ←"
            color="#9C27B0"
          />
        </div>

        <div className="app-stats">
          <div className="stat-item">
            <span className="stat-label">Total Tasks:</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">To Do:</span>
            <span className="stat-value todo-count">
              {tasks.filter(t => t.status === "todo").length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">In Progress:</span>
            <span className="stat-value inprogress-count">
              {tasks.filter(t => t.status === "inProgress").length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Done:</span>
            <span className="stat-value done-count">
              {tasks.filter(t => t.status === "done").length}
            </span>
          </div>
        </div>
      </main>

      
    </div>
  );
}

export default App;