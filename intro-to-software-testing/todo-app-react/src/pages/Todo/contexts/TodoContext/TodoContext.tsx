import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { Todo } from '../../../../types/Todo';
import {
  createTodo,
  getTodos,
  markTodoAsComplete,
  removeTodo,
} from '../../../../services/api/todo/todo';

type TodoError = {
  type: 'ADD' | 'LOAD' | 'DELETE' | 'UPDATE';
  error: string;
};

type TodoContextType = {
  todos: Todo[];
  isAdding: boolean;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  markAsCompleted: (id: string) => void;
  error: TodoError | null;
  isTodosLoading: boolean;
};

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<TodoError | null>(null);
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  const addTodo = useCallback(async (todo: Todo) => {
    try {
      setIsAdding(true);
      await createTodo(todo);
      setTodos(currentTodos => [todo, ...currentTodos]);
    } catch {
      setError({
        type: 'ADD',
        error: 'something went wrong creating the todo, please try again later',
      });
    } finally {
      setIsAdding(false);
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await removeTodo(id);
      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    } catch {
      setError({
        type: 'DELETE',
        error: "sorry, we can't perform this actions right now, please try again later",
      });
    }
  }, []);

  const markAsCompleted = useCallback(async (id: string) => {
    try {
      await markTodoAsComplete(id);
      setTodos(currentTodos =>
        currentTodos.map(todo => (todo.id === id ? { ...todo, completed: true } : todo))
      );
    } catch {
      setError({
        type: 'UPDATE',
        error: "sorry, we can't perform this actions right now, please try again later",
      });
    }
  }, []);

  const loadTodos = useCallback(async () => {
    try {
      setIsTodosLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch {
      setError({
        type: 'LOAD',
        error: "sorry, we can't fetch your todos right now, please try again later",
      });
    } finally {
      setIsTodosLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, markAsCompleted, deleteTodo, error, isAdding, isTodosLoading }}
    >
      {children}
    </TodoContext.Provider>
  );
};
