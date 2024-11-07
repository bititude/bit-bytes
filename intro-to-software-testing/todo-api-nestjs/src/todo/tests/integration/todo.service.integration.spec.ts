import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../../../database/database.service';
import { faker } from '@faker-js/faker/.';
import { TodoRepository } from '../../../database/respositories/Todo.repository';
import { TodoService } from '../../todo.service';
import { todo, TodoSelect } from '../../../database/schemas/todo.schema';
import { TodoModule } from '../../todo.module';
import { DatabaseModule } from '../../../database/database.module';
import { eq } from 'drizzle-orm';

describe('TodoService (integration)', () => {
  let db: DatabaseService;
  let todoService: TodoService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodoModule, DatabaseModule],
      providers: [TodoRepository],
    }).compile();

    db = module.get<DatabaseService>(DatabaseService);
    todoService = module.get<TodoService>(TodoService);
  });

  beforeEach(async () => {
    await db.cleanTable('todo');
  });

  afterAll(async () => {
    await db.close();
  });

  describe('getTodos()', () => {
    it('should return all todos', async () => {
      // insert some todos to the db first
      const todos: TodoSelect[] = faker.helpers.multiple(
        () => ({
          id: faker.number.int({ min: 1, max: 5000 }),
          title: faker.lorem.lines(1),
          completed: faker.datatype.boolean(),
        }),
        { count: 5 },
      );
      for (const t of todos) {
        await db.getDbObject().insert(todo).values(t);
      }

      const res = await todoService.getTodos();

      expect(res).toEqual(expect.arrayContaining(todos));
    });
  });

  describe('createTodo()', () => {
    it('should create a todo', async () => {
      const myTodo: TodoSelect = {
        completed: false,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      await todoService.createTodo(myTodo);

      const allTodos = await db.getDbObject().select().from(todo);

      expect(allTodos).toEqual([
        {
          id: expect.any(Number),
          completed: false,
          title: myTodo.title,
        },
      ]);
    });
  });

  describe('deleteTodo()', () => {
    it('should delete a todo', async () => {
      const myTodo: TodoSelect = {
        completed: false,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      await db.getDbObject().insert(todo).values(myTodo);

      await todoService.deleteTodo(myTodo.id);

      const allTodos = await db.getDbObject().select().from(todo);

      expect(allTodos).not.toContainEqual(myTodo);
    });
  });

  describe('markAsComplete()', () => {
    it('should mark a todo as complete', async () => {
      const myTodo: TodoSelect = {
        completed: false,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      await db.getDbObject().insert(todo).values(myTodo);

      await todoService.markAsComplete(myTodo.id);

      const updatedTodo = await db
        .getDbObject()
        .select()
        .from(todo)
        .where(eq(todo.id, myTodo.id));

      expect(updatedTodo[0].completed).toBe(true);
    });
  });
});
