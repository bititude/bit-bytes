import { useState } from 'react';
import AddTodo from './components/AddTodo/AddTodo';
import TodoLists from './components/TodoLists/TodoList';
import { useTodo } from './hooks/useTodo';

const Todo: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { todos, isTodosLoading, error } = useTodo();
  return (
    <div className='p-5 h-auto w-11/12 md:w-[450px]  shadow-md rounded-md m-auto border-2 border-gray-400 flex flex-col items-center justify-start mt-[100px] mb-20'>
      <div className='flex justify-between items-center mb-7 w-full'>
        <h1 className='font-bold text-gray-700 text-2xl'>Your todos</h1>
        <button
          data-testid='toggle-form-btn'
          className={`rounded-full ${
            isFormVisible ? 'bg-red-500' : 'bg-green-500'
          }  w-12 h-12 flex items-start justify-center hover:scale-105 shadow-md hover:shadow-lg`}
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <span className='text-4xl text-white font-bold '>
            {isFormVisible ? <>&#xd7;</> : <>&#43;</>}
          </span>
        </button>
      </div>
      {isFormVisible ? <AddTodo /> : null}
      {error ? <p>{error.error}</p> : <TodoLists todos={todos} loading={isTodosLoading} />}
    </div>
  );
};

export default Todo;
