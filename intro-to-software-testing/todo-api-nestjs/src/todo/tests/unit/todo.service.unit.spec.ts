import { Test } from '@nestjs/testing';
import { TodoService } from '../../todo.service';
import { TodoRepository } from '../../../database/respositories/Todo.repository';
import { todoRepositoryMock } from '../../../database/respositories/tests/mocks/todoRepository.mock';
import { todoStub } from '../../../database/respositories/tests/stubs/todo.stub';
import { faker } from '@faker-js/faker/.';

describe('TodoService (unit)', () => {
  let todoService: TodoService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useValue: todoRepositoryMock,
        },
      ],
    }).compile();

    todoService = moduleRef.get<TodoService>(TodoService);
  });

  describe('getTodos()', () => {
    it('should call todoRepository.getAllTodos()', async () => {
      await todoService.getTodos();

      expect(todoRepositoryMock.getAllTodos).toHaveBeenCalled();
    });

    it('should return all todos', async () => {
      expect(await todoService.getTodos()).toEqual([todoStub()]);
    });
  });

  describe('createTodo()', () => {
    it('should call todoRepository.createTodo()', async () => {
      const title = faker.lorem.lines(1);

      await todoService.createTodo({ title });

      expect(todoRepositoryMock.createTodo).toHaveBeenCalledWith(title);
    });
  });

  describe('deleteTodo()', () => {
    it('should call todoRepository.deleteTodo()', async () => {
      const id = faker.number.int({
        min: 1,
        max: 5000,
      });

      await todoService.deleteTodo(id);

      expect(todoRepositoryMock.deleteTodo).toHaveBeenCalledWith(id);
    });
  });

  describe('markAsComplete()', () => {
    it('should call todoRepository.updateTodo()', async () => {
      const id = faker.number.int({
        min: 1,
        max: 5000,
      });

      await todoService.markAsComplete(id);

      expect(todoRepositoryMock.updateTodo).toHaveBeenCalledWith(id, {
        completed: true,
      });
    });
  });
});
