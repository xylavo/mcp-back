import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  addTwoNumbers(body: { a: number; b: number }): number {
    return body.a + body.b;
  }
}
