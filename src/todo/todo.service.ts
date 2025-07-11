import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Todo } from './todo.entity';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async create(todoData: Partial<Todo>): Promise<Todo> {
    if(todoData.scheduledAt){
      todoData.scheduledAt = new Date(todoData.scheduledAt)
    }
    const todo = this.todoRepository.create(todoData);
    return this.todoRepository.save(todo);
  }

  async update(id: number, todoData: Partial<Todo>): Promise<Todo | null> { 
    let todo = await this.findOne(id);
    if(!todo){
      throw Error("no id");
    }
    todo.title = todoData.title ?? todo.title;
    todo.description = todoData.description ?? todo.description;
    todo.completed = todoData.completed ?? todo.completed;
    todo.scheduledAt = todoData.scheduledAt ?? todo.scheduledAt;
    todo.duration = todoData.duration ?? todo.duration;
    await this.todoRepository.save(todo);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async findScheduledEvents(date: Date): Promise<Todo[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.todoRepository.find({
      where: {
        scheduledAt: Between(startOfDay, endOfDay)
      },
      order: {
        scheduledAt: 'ASC'
      }
    });
  }
} 