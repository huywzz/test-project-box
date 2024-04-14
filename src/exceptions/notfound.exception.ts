import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFound extends HttpException {
  constructor(target: string) {
    super(`not found ${target}`, HttpStatus.NOT_FOUND, {
      cause: new Error(),
    });
  }
}