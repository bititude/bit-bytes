import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../database/respositories/Todo.repository';
import { CreateTodoRequestDto } from './dto/request/CreateTodoRequest.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}
  async getTodos() {
    return await this.todoRepository.getAllTodos();
  }

  async createTodo(createTodoRequestDto: CreateTodoRequestDto) {
    return await this.todoRepository.createTodo(createTodoRequestDto.title);
  }

  async deleteTodo(id: number) {
    return await this.todoRepository.deleteTodo(id);
  }

  async markAsComplete(id: number) {
    return await this.todoRepository.updateTodo(id, { completed: true });
  }
}
