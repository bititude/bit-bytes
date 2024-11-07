/**
 * Requirements
 * 1. pending todos should contain a mark as completed button and delete button
 * 2. completed todos should be striked
 * 3. completed todos should only contain a delete button
 */

import { describe, expect, it } from 'vitest';
import TodoItem from '../TodoItem';
import { TodoProviderWrapper } from '../../../contexts/TodoContext/TodoProviderWrapper';
import { Todo } from '../../../../../types/Todo';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

describe('TodoItem.tsx', () => {
  it('pending todos should contain a mark as completed button and delete button', () => {
    const pendingTodo: Todo = {
      id: faker.string.uuid(),
      completed: false,
      title: faker.lorem.lines(1),
    };

    render(<TodoItem todo={pendingTodo} />, { wrapper: TodoProviderWrapper });

    const markAsCompletedButton = screen.getByTestId('todo-markascomplete-btn');

    const deleteTodoButton = screen.getByTestId('todo-delete-btn');

    expect(markAsCompletedButton).toBeInTheDocument();

    expect(deleteTodoButton).toBeInTheDocument();
  });

  it('completed todos should be striked', () => {
    const completedTodo: Todo = {
      id: faker.string.uuid(),
      completed: true,
      title: faker.lorem.lines(1),
    };

    render(<TodoItem todo={completedTodo} />, { wrapper: TodoProviderWrapper });

    const strikedTodo = screen.getByTestId('striked-todo');

    expect(strikedTodo).toBeInTheDocument();
  });

  it('completed todos should only contain a delete button', () => {
    const completedTodo: Todo = {
      id: faker.string.uuid(),
      completed: true,
      title: faker.lorem.lines(1),
    };

    render(<TodoItem todo={completedTodo} />, { wrapper: TodoProviderWrapper });

    const markAsCompletedButton = screen.queryByTestId('todo-markascomplete-btn');

    const deleteTodoButton = screen.getByTestId('todo-delete-btn');

    expect(markAsCompletedButton).toBe(null);

    expect(deleteTodoButton).toBeInTheDocument();
  });

  describe('should match snapshot', () => {
    it('should match pending todo snapshot', () => {
      const pendingTodo: Todo = {
        id: faker.string.uuid(),
        completed: false,
        title: 'brush teeth',
      };

      const { asFragment } = render(<TodoItem todo={pendingTodo} />, {
        wrapper: TodoProviderWrapper,
      });

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match completed todo snapshot', () => {
      const completedTodo: Todo = {
        id: faker.string.uuid(),
        completed: true,
        title: 'buy milk',
      };

      const { asFragment } = render(<TodoItem todo={completedTodo} />, {
        wrapper: TodoProviderWrapper,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
