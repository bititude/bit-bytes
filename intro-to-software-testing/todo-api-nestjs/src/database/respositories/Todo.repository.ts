import { Inject } from '@nestjs/common';
import { DB } from '../database.constants';
import { Database } from '../database.service';
import { todo, TodoInsert } from '../schemas/todo.schema';
import { eq } from 'drizzle-orm';

export class TodoRepository {
  constructor(
    @Inject(DB)
    private readonly dbObject: Database,
  ) {}

  async getAllTodos() {
    return await this.dbObject.db.select().from(todo);
  }

  async deleteTodo(id: number) {
    return await this.dbObject.db.delete(todo).where(eq(todo.id, id));
  }

  async updateTodo(id: number, values: TodoInsert) {
    return await this.dbObject.db
      .update(todo)
      .set(values)
      .where(eq(todo.id, id));
  }
  async createTodo(title: string) {
    return await this.dbObject.db.insert(todo).values({ title });
  }
}
