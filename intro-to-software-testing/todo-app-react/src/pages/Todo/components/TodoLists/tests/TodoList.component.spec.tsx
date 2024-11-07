/**
 * Requirements
 * 1. should show a loading indicator on loading
 * 2. a message should be shown for no pending todos
 * 3. a message should be shown for no completed todos
 */

import { describe, expect, it } from 'vitest';
import TodoList from '../TodoList';
import { TodoProviderWrapper } from '../../../contexts/TodoContext/TodoProviderWrapper';
import { render, screen } from '@testing-library/react';
import { Todo } from '../../../../../types/Todo';
import { faker } from '@faker-js/faker';

describe('TodoList.tsx', () => {
  it('should show a loading indicator on loading', () => {
    const todos: Todo[] = [
      { id: faker.string.uuid(), completed: true, title: faker.lorem.lines(1) },
    ];
    render(<TodoList todos={todos} loading={true} />, { wrapper: TodoProviderWrapper });

    const loadingIndicator = screen.getByText('Loading');

    expect(loadingIndicator).toBeInTheDocument();
  });

  it('a message should be shown for no pending todos', () => {
    const todos: Todo[] = [];

    render(<TodoList todos={todos} loading={false} />, { wrapper: TodoProviderWrapper });

    const noPendingTodos = screen.getByText('No Pending todos 🥳');

    expect(noPendingTodos).toBeInTheDocument();
  });

  it('a message should be shown for no completed todos', () => {
    const todos: Todo[] = [];

    render(<TodoList todos={todos} loading={false} />, { wrapper: TodoProviderWrapper });

    const noPendingTodos = screen.getByText('No Completed todos');

    expect(noPendingTodos).toBeInTheDocument();
  });

  describe('should match snapshot', () => {
    it('should match default snapshot', () => {
      const todos: Todo[] = [{ id: faker.string.uuid(), completed: true, title: 'wash car' }];
      const { asFragment } = render(<TodoList todos={todos} loading={false} />, {
        wrapper: TodoProviderWrapper,
      });

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match loading snapshot', () => {
      const todos: Todo[] = [{ id: faker.string.uuid(), completed: true, title: 'wash car' }];
      const { asFragment } = render(<TodoList todos={todos} loading={true} />, {
        wrapper: TodoProviderWrapper,
      });

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
