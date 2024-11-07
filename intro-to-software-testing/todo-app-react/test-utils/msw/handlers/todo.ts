import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker';
import { GetTodosResponseDto } from '../../../src/services/api/todo/dto/response/GetTodosResponse.dto';
import { apiEndPoint } from '../../msw/baseUrls';

const todos: GetTodosResponseDto = faker.helpers.multiple(
  () => ({
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    completed: faker.datatype.boolean(),
  }),
  { count: 10 }
);

export const todoHandlers = [
  http.get(apiEndPoint('/todo'), () => HttpResponse.json(todos)),
  http.post(apiEndPoint('/todo'), () => HttpResponse.json({})),
  http.delete(apiEndPoint('/todo/:id'), () => HttpResponse.json({})),
  http.patch(apiEndPoint('/todo/markAsComplete/:id'), () => HttpResponse.json({})),
];
