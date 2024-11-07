import { boolean, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const todo = mysqlTable('todo', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 100 }),
  completed: boolean(),
});

export type TodoInsert = typeof todo.$inferInsert;
export type TodoSelect = typeof todo.$inferSelect;
