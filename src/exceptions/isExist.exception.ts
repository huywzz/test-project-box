import { HttpException, HttpStatus } from '@nestjs/common';

export class IsExist extends HttpException {
  constructor(target: string) {
    super(`Exist ${target}`, HttpStatus.NOT_FOUND, {
      cause: new Error(),
    });
  }
}
