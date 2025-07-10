import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  addTwoNumbers(body: { a: number; b: number }): number {
    return body.a + body.b;
  }

  getTools(): object {
    return [
      {
        api_url: "add",
        description: "두 숫자를 더합니다",
        properties: {
          a: {
            type: "number",
            description: "첫 번째 숫자",
          },
          b: {
            type: "number",
            description: "두 번째 숫자",
          },
        },
        required: ["a", "b"],
      },
      {
        api_url: "todos",
        description: "todo와 관련된 도구 항목을 조회합니다.",
        properties: {},
        required: [],
      }
    ];
  }
}
