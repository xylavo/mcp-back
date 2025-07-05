import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("add")
  addTwoNumbers(@Body() body: { a: number; b: number }): {result: number} {
    return {result: this.appService.addTwoNumbers(body)};
  }
  @Post("")
  getTools(): {result: object} {
    return {result: this.appService.getTools()};
  }
}
