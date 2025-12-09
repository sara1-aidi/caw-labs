import { render, screen } from '@testing-library/react';
import Column from './Column';

const mockTasks = [
  { id: 1, title: 'Task 1', description: 'Desc 1', status: 'todo' },
  { id: 2, title: 'Task 2', description: 'Desc 2', status: 'todo' },
  { id: 3, title: 'Task 3', description: 'Desc 3', status: 'inProgress' },
];

const mockMoveTask = jest.fn();
const mockDeleteTask = jest.fn();

describe('Column Component', () => {
  test('renders column with title and task count', () => {
    render(
      <Column
        title="Test Column"
        status="todo"
        tasks={mockTasks}
        moveTask={mockMoveTask}
        deleteTask={mockDeleteTask}
        nextStatus="inProgress"
        nextStatusText="Move Next"
      />
    );
    
    expect(screen.getByText('Test Column')).toBeInTheDocument();
    expect(screen.getByText('2 tasks')).toBeInTheDocument(); // Only 2 todo tasks
  });

  test('filters tasks by status', () => {
    render(
      <Column
        title="In Progress"
        status="inProgress"
        tasks={mockTasks}
        moveTask={mockMoveTask}
        deleteTask={mockDeleteTask}
        nextStatus="done"
        nextStatusText="Mark Done"
      />
    );
    
    // Should only show inProgress tasks
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  test('shows empty message when no tasks', () => {
    render(
      <Column
        title="Empty Column"
        status="done"
        tasks={mockTasks}
        moveTask={mockMoveTask}
        deleteTask={mockDeleteTask}
        nextStatus="todo"
        nextStatusText="Reopen"
      />
    );
    
    expect(screen.getByText('Drag tasks here or create new ones')).toBeInTheDocument();
  });
});