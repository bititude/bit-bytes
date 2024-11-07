import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext/TodoContext';

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
