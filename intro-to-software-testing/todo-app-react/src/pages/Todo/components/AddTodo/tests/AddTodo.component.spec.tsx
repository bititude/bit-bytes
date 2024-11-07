import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodo from '../AddTodo';
import { server } from '../../../../../../test-utils/msw/node';
import { apiEndPoint } from '../../../../../../test-utils/msw/baseUrls';
import defaultHandlers from '../../../../../../test-utils/msw/handlers/defaultHandlers';
import { http } from 'msw';
import { TodoProviderWrapper } from '../../../contexts/TodoContext/TodoProviderWrapper';

// Behaviour driven test cases (BDD) - Given (precondition) -> When (action) -> Then (outcome), assert on the outcome

/**
 * Requirements:-
 * 1. when add todo button is clicked,
 * 1.1 textarea should be disabled and be enabled after adding todo
 * 1.2 add button should be disabled if textarea is empty
 * 1.3 add button should be disabled and enabled after adding
 * 1.4 a spinner should be shown and it should dissappear after adding
 * 1.5 an error message should be shown if add todo is failure
 */

// use component name or function name
describe('AddTodo.tsx', () => {
  // helper methods
  const typeTodo = () => {
    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, { target: { value: 'My new task' } });
  };

  // when
  describe('when add todo button is clicked', () => {
    // then
    it('textarea should be disabled and be enabled after adding todo', async () => {
      // render the component
      render(<AddTodo />, { wrapper: TodoProviderWrapper });

      // get reference to all the required elements in the ui
      //https://testing-library.com/docs/queries/about#priority
      // https://testing-library.com/docs/react-testing-library/cheatsheet/
      const textArea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /add/i });

      typeTodo();

      // pre assertion
      expect(textArea).not.toBeDisabled();

      // specify msw handler for loading state
      server.use(http.post(apiEndPoint('/todo'), defaultHandlers['LOADING']));

      // perform the action
      fireEvent.click(button);

      // After clicking, the textarea should be disabled while adding
      expect(textArea).toBeDisabled();

      await waitFor(() => {
        expect(textArea).not.toBeDisabled();
      });
    });

    it('button should be disabled and enabled after adding', async () => {
      render(<AddTodo />, { wrapper: TodoProviderWrapper });

      const addButton = screen.getByRole('button', { name: /add/i });

      expect(addButton).toBeDisabled();

      typeTodo();

      expect(addButton).not.toBeDisabled();

      server.use(http.post(apiEndPoint('/todo'), defaultHandlers['LOADING']));

      fireEvent.click(addButton);

      expect(addButton).toBeDisabled();

      await waitFor(() => {
        expect(addButton).toBeDisabled();
      });
    });

    it('a spinner should be shown and it should dissappear after adding', async () => {
      render(<AddTodo />, { wrapper: TodoProviderWrapper });

      const addButton = screen.getByRole('button', { name: /add/i });

      expect(screen.queryByTestId('spinner')).toBe(null);

      typeTodo();

      server.use(http.post(apiEndPoint('/todo'), defaultHandlers['LOADING']));

      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.queryByTestId('spinner')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
      });
    });

    it('add button should be disabled if textarea is empty', () => {
      render(<AddTodo />, { wrapper: TodoProviderWrapper });

      const addButton = screen.getByRole('button', { name: /add/i });

      expect(addButton).toBeDisabled();

      typeTodo();

      expect(addButton).toBeEnabled();
    });

    it('an error message should be shown if add todo is failure', async () => {
      render(<AddTodo />, { wrapper: TodoProviderWrapper });

      const addButton = screen.getByRole('button', { name: /add/i });

      typeTodo();

      server.use(http.post(apiEndPoint('/todo'), defaultHandlers['500']));

      fireEvent.click(addButton);

      await waitFor(() => {
        expect(
          screen.getByText('something went wrong creating the todo, please try again later')
        ).toBeInTheDocument();
      });
    });
  });

  describe('should match snapshots', () => {
    it("match's default snapshot", () => {
      const { asFragment } = render(<AddTodo />, { wrapper: TodoProviderWrapper });
      expect(asFragment()).toMatchSnapshot();
    });

    it("match's loading state snapshot", () => {
      const { asFragment } = render(<AddTodo />, { wrapper: TodoProviderWrapper });

      const addButton = screen.getByRole('button', { name: /add/i });

      typeTodo();

      server.use(http.post(apiEndPoint('/todo'), defaultHandlers['LOADING']));

      fireEvent.click(addButton);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
