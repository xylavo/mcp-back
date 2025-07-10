import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post("find-all")
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post("find-id")
  async findOne(@Body() todoData: {id: number}): Promise<Todo | null> {
    return this.todoService.findOne(todoData.id);
  }

  @Post("create")
  async create(@Body() todoData: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(todoData);
  }

  @Post('update')
  async update(
    @Body() todoData: Partial<Todo>,
  ): Promise<Todo | null> {
    return this.todoService.update(todoData.id!, todoData);
  }

  @Post("delete")
  async delete(@Body() todoData: {id: number}): Promise<void> {
    return this.todoService.delete(todoData.id);
  }

  @Post('schedule')
  async findScheduledEvents(@Body() date: {date: string}): Promise<Todo[]> {
    const targetDate = new Date(date.date);
    return this.todoService.findScheduledEvents(targetDate);
  }

  @Post("")
  getTools(): object {
    return [
      {
        api_url: "todos/find-all",
        description: "모든 todo 항목을 조회합니다",
        properties: {},
        required: [],
      },
      {
        api_url: "find-id",
        description: "ID로 특정 todo 항목을 조회합니다",
        properties: {
          id: {
            type: "number",
            description: "조회할 todo의 ID",
          },
        },
        required: ["id"],
      },
      {
        api_url: "todos/create",
        description: "새로운 todo 항목을 생성합니다",
        properties: {
          title: {
            type: "string",
            description: "todo 제목",
          },
          description: {
            type: "string",
            description: "todo 설명 (선택사항)",
          },
          scheduledAt: {
            type: "string",
            description: "스케줄 날짜 (ISO 문자열, 선택사항)",
          },
          duration: {
            type: "number",
            description: "예상 소요 시간 (분, 선택사항)",
          },
        },
        required: ["title"],
      },
      {
        api_url: "todos/update",
        description: "기존 todo 항목을 수정합니다",
        properties: {
          id: {
            type: "number",
            description: "수정할 todo의 ID",
          },
          title: {
            type: "string",
            description: "todo 제목 (선택사항)",
          },
          description: {
            type: "string",
            description: "todo 설명 (선택사항)",
          },
          completed: {
            type: "boolean",
            description: "완료 여부 (선택사항)",
          },
          scheduledAt: {
            type: "string",
            description: "스케줄 날짜 (ISO 문자열, 선택사항)",
          },
          duration: {
            type: "number",
            description: "예상 소요 시간 (분, 선택사항)",
          },
        },
        required: ["id"],
      },
      {
        api_url: "todos/delete",
        description: "todo 항목을 삭제합니다",
        properties: {
          id: {
            type: "number",
            description: "삭제할 todo의 ID",
          },
        },
        required: ["id"],
      },
      {
        api_url: "todos/schedule",
        description: "특정 날짜의 스케줄된 todo 항목들을 조회합니다",
        properties: {
          date: {
            type: "string",
            description: "조회할 날짜 (ISO 문자열)",
          },
        },
        required: ["date"],
      },
    ];
  }
} 