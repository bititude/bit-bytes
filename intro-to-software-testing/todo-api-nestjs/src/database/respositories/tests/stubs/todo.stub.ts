import { faker } from '@faker-js/faker';
import { TodoInsert, TodoSelect } from '../../../schemas/todo.schema';

const todo: TodoSelect = {
  id: faker.number.int({
    min: 1,
    max: 5000,
  }),
  title: faker.lorem.lines(1),
  completed: faker.datatype.boolean(),
};

export const todoStub = (): TodoInsert => {
  return todo;
};
