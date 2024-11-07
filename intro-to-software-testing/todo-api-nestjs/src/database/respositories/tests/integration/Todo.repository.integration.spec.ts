import { Test, TestingModule } from '@nestjs/testing';
import { TodoRepository } from '../../Todo.repository';
import { DatabaseModule } from '../../../database.module';
import { DatabaseService } from '../../../database.service';
import { todo, TodoSelect } from '../../../schemas/todo.schema';
import { faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';

describe('TodoRepository', () => {
  let todoRepository: TodoRepository;
  let db: DatabaseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TodoRepository],
    }).compile();

    db = module.get<DatabaseService>(DatabaseService);
    todoRepository = module.get<TodoRepository>(TodoRepository);
  });

  beforeEach(async () => {
    await db.cleanTable('todo');
  });

  afterAll(async () => {
    await db.close();
  });

  it('should be defined', () => {
    expect(todoRepository).toBeDefined();
  });

  describe('getAllTodos()', () => {
    it('should return all todos', async () => {
      // insert some todos
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
      const res = await todoRepository.getAllTodos();

      // assert
      expect(res).toEqual(expect.arrayContaining(todos));
    });
  });

  describe('deleteTodo()', () => {
    it('should delete a todo', async () => {
      const myTodo: TodoSelect = {
        completed: true,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      // insert
      await db.getDbObject().insert(todo).values(myTodo);

      // do the action
      await todoRepository.deleteTodo(myTodo.id);

      // assert
      const deletedTodo = await db
        .getDbObject()
        .select()
        .from(todo)
        .where(eq(todo.id, myTodo.id));

      expect(deletedTodo).toEqual([]);
    });
  });

  describe('updateTodo()', () => {
    it('should update a todo', async () => {
      const myTodo: TodoSelect = {
        completed: false,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      // insert
      await db.getDbObject().insert(todo).values(myTodo);

      // do the action
      await todoRepository.updateTodo(myTodo.id, { completed: true });

      const updatedTodo = await db
        .getDbObject()
        .select()
        .from(todo)
        .where(eq(todo.id, myTodo.id));

      expect(updatedTodo).toEqual([{ ...myTodo, completed: true }]);
    });
  });

  describe('createTodo()', () => {
    it('should create a todo', async () => {
      const myTodo: TodoSelect = {
        completed: false,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      await todoRepository.createTodo(myTodo.title);

      const allTodos = await db.getDbObject().select().from(todo);

      expect(allTodos[0].title).toEqual(myTodo.title);
    });
  });
});
