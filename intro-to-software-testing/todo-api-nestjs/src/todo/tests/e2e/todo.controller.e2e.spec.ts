import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { todo, TodoSelect } from '../../../database/schemas/todo.schema';
import { faker } from '@faker-js/faker/.';
import TestAgent from 'supertest/lib/agent';
import { eq } from 'drizzle-orm';

describe('TodoController', () => {
  let httpServer;
  let db: DatabaseService;
  let app: INestApplication;
  let agent: TestAgent;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();

    db = module.get<DatabaseService>(DatabaseService);
    httpServer = app.getHttpServer();
    agent = request.agent(httpServer);
  });

  beforeEach(async () => {
    await db.cleanTable('todo');
  });

  afterAll(async () => {
    await db.close();
  });

  describe('GET /todo', () => {
    it('should return all todos', async () => {
      const todos: TodoSelect[] = faker.helpers.multiple(
        () => ({
          id: faker.number.int({ min: 1, max: 5000 }),
          title: faker.lorem.lines(1),
          completed: faker.datatype.boolean(),
        }),
        { count: 5 },
      );

      // insert todos first
      for (const t of todos) {
        await db.getDbObject().insert(todo).values(t);
      }

      const response = await agent.get('/todo');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.arrayContaining(todos));
    });
  });

  describe('POST /todo', () => {
    it('should create a todo', async () => {
      //
      const todoTitle = faker.lorem.lines(1);

      const response = await agent.post('/todo').send({ title: todoTitle });

      expect(response.status).toBe(201);

      const insertedTodo = await db.getDbObject().select().from(todo);

      expect(insertedTodo[0]).toBeDefined();
      expect(insertedTodo[0].title).toBe(todoTitle);
    });
  });

  describe('DELETE /todo/:id', () => {
    it('should delete a todo', async () => {
      const myTodo: TodoSelect = {
        completed: false,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      await db.getDbObject().insert(todo).values(myTodo);

      const response = await agent.delete(`/todo/${myTodo.id}`);

      expect(response.status).toBe(200);

      const allTodos = await db
        .getDbObject()
        .select()
        .from(todo)
        .where(eq(todo.id, myTodo.id));

      expect(allTodos.length).toBe(0);
    });
  });

  describe('UPDATE /markAsComplete/:id', () => {
    it('should mark a todo as complete', async () => {
      const myTodo: TodoSelect = {
        completed: false,
        id: faker.number.int({ min: 1, max: 5000 }),
        title: faker.lorem.lines(1),
      };

      await db.getDbObject().insert(todo).values(myTodo);

      const response = await agent.patch(`/todo/markAsComplete/${myTodo.id}`);

      expect(response.status).toBe(200);

      const updatedTodo = await db
        .getDbObject()
        .select()
        .from(todo)
        .where(eq(todo.id, myTodo.id));

      expect(updatedTodo[0].completed).toBe(true);
    });
  });
});
