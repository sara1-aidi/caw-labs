import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  const mockAddTask = jest.fn();

  beforeEach(() => {
    mockAddTask.mockClear();
  });

  test('renders form with input and button', () => {
    render(<TaskForm addTask={mockAddTask} />);
    
    expect(screen.getByPlaceholderText('Enter task title *')).toBeInTheDocument();
    expect(screen.getByText('+ Add Task')).toBeInTheDocument();
  });

  test('calls addTask with correct data', () => {
    render(<TaskForm addTask={mockAddTask} />);
    
    const titleInput = screen.getByPlaceholderText('Enter task title *');
    const addButton = screen.getByText('+ Add Task');
    
    // Click to expand description field
    fireEvent.focus(titleInput);
    
    const descriptionInput = screen.getByPlaceholderText('Add description (optional)');
    
    fireEvent.change(titleInput, { target: { value: 'New Task Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Task Description' } });
    fireEvent.click(addButton);
    
    expect(mockAddTask).toHaveBeenCalledWith('New Task Title', 'Task Description');
  });

  test('does not call addTask with empty title', () => {
    render(<TaskForm addTask={mockAddTask} />);
    
    const addButton = screen.getByText('+ Add Task');
    fireEvent.click(addButton);
    
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  test('clears form after submission', () => {
    render(<TaskForm addTask={mockAddTask} />);
    
    const titleInput = screen.getByPlaceholderText('Enter task title *');
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    
    // Click to expand
    fireEvent.focus(titleInput);
    
    const addButton = screen.getByText('+ Add Task');
    fireEvent.click(addButton);
    
    expect(titleInput.value).toBe('');
  });
});