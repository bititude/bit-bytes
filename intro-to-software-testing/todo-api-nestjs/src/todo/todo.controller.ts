import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoRequestDto } from './dto/request/CreateTodoRequest.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  async getTodos() {
    return this.todoService.getTodos();
  }

  @Post('/')
  async createTodo(@Body() createTodoRequestDto: CreateTodoRequestDto) {
    return this.todoService.createTodo(createTodoRequestDto);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Patch('/markAsComplete/:id')
  async markAsCompleted(@Param('id') id: number) {
    return this.todoService.markAsComplete(id);
  }
}
