import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('Kanban Board App', () => {
  test('renders all required columns', () => {
    render(<App />);
    
    expect(screen.getByText('📝 To Do')).toBeInTheDocument();
    expect(screen.getByText('⚡ In Progress')).toBeInTheDocument();
    expect(screen.getByText('✅ Done')).toBeInTheDocument();
  });

  test('displays task title and description', () => {
    render(<App />);
    
    expect(screen.getByText('Study React Hooks')).toBeInTheDocument();
    expect(screen.getByText('Learn useState, useEffect, and useContext')).toBeInTheDocument();
  });

  test('can add a new task', async () => {
    render(<App />);
    
    const titleInput = screen.getByPlaceholderText('Enter task title *');
    const addButton = screen.getByText('+ Add Task');
    
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });
  });

  test('shows task statistics', () => {
    render(<App />);
    
    expect(screen.getByText('Total Tasks:')).toBeInTheDocument();
    expect(screen.getByText('To Do:')).toBeInTheDocument();
    expect(screen.getByText('In Progress:')).toBeInTheDocument();
    expect(screen.getByText('Done:')).toBeInTheDocument();
  });

  test('task moves between columns', () => {
    render(<App />);
    
    const startProgressButtons = screen.getAllByText('Start Progress →');
    fireEvent.click(startProgressButtons[0]);
    
    const todoColumn = screen.getByText('📝 To Do').closest('.column');
    const task = screen.getByText('Study React Hooks');
    
    // Task should no longer be in To Do column
    expect(todoColumn).not.toContainElement(task);
  });
});