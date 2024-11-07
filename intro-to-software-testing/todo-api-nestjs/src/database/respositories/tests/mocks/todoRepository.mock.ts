import { RepoMock } from '../../../../../test/types/RepoMock';
import { TodoRepository } from '../../Todo.repository';
import { todoStub } from '../stubs/todo.stub';

export const todoRepositoryMock: RepoMock<TodoRepository> = {
  createTodo: jest.fn().mockResolvedValue([]),
  updateTodo: jest.fn().mockResolvedValue([]),
  deleteTodo: jest.fn().mockResolvedValue([]),
  getAllTodos: jest.fn().mockResolvedValue([todoStub()]),
};
