import axiosClient from '..';
import { AddTodoRequestDto } from './dto/request/AddTodoRequest.dto';
import { GetTodosResponseDto } from './dto/response/GetTodosResponse.dto';

export const getTodos = () => axiosClient.get<GetTodosResponseDto>('/todo').then(res => res.data);

export const createTodo = (data: AddTodoRequestDto) => axiosClient.post('/todo', data);

export const removeTodo = (id: string) => axiosClient.delete(`/todo/${id}`);

export const markTodoAsComplete = (id: string) => axiosClient.patch(`/todo/markAsComplete/${id}`);
