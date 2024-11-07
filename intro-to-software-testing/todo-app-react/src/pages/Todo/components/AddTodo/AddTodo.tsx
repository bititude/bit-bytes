import { useState } from 'react';
import Spinner from '../../../../components/Spinner/Spinner';
import { useTodo } from '../../hooks/useTodo';

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const { isAdding, addTodo, error } = useTodo();

  return (
    <div data-testid='add-todo-form'>
      <textarea
        disabled={isAdding}
        onChange={e => setTitle(e.target.value)}
        value={title}
        className='w-full border-2 border-gray-400 rounded-md p-3 font-bold mb-4 shadow-md'
      ></textarea>
      <div className='flex items-start w-full justify-between'>
        <button
          onClick={() => addTodo({ title, completed: false, id: Date.now().toString() })}
          disabled={isAdding || !title}
          className='bg-green-500 h-[50px] font-bold text-white rounded-md shadow-md hover:scale-105 mb-4 text-base disabled:cursor-not-allowed w-[100px] flex items-center justify-center hover:shadow-lg disabled:bg-gray-400'
        >
          <span className='text-lg'>ADD</span>
          {isAdding ? (
            <span data-testid='spinner' className='text-4xl ml-3'>
              <Spinner />
            </span>
          ) : (
            <span className='text-4xl ml-3 pb-2'>&#43;</span>
          )}
        </button>
      </div>
      {error && error.type == 'ADD' ? <p className='text-red-600'>{error.error}</p> : null}
    </div>
  );
};

export default AddTodo;
