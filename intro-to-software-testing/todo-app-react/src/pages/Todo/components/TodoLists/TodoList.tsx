import { useMemo } from 'react';
import { Todo } from '../../../../types/Todo';
import TodoItem from '../TodoItem/TodoItem';

interface ITodoLists {
  todos: Todo[];
  loading: boolean;
}

const TodoList: React.FC<ITodoLists> = ({ todos, loading }) => {
  const pendingTodos = useMemo(() => todos.filter(todo => !todo.completed), [todos]);

  const completedTodos = useMemo(() => todos.filter(todo => todo.completed), [todos]);

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <div data-testid='pending-todos' className='w-full'>
        <h1 className='font-bold text-gray-700 text-xl self-start my-4'>Pending</h1>
        {pendingTodos.length === 0 ? (
          <p>No Pending todos 🥳</p>
        ) : (
          pendingTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>

      <h1 className='font-bold text-gray-700 text-xl self-start my-4'>Completed</h1>

      <div data-testid='completed-todos'>
        {completedTodos.length === 0 ? (
          <p>No Completed todos</p>
        ) : (
          completedTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </>
  );
};

export default TodoList;
