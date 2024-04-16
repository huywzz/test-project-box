import { HttpStatus } from "@nestjs/common";
import { Response } from 'express';

export class SuccessResponse {
   message: string
   statusCode: any
   metadata: any
   option: object = {}
  constructor(
    message: string,
    statusCode: any,
    metadata: any,
    option: object = {},
  ) {
    this.message = message;
    this.statusCode = statusCode
    this.metadata = metadata;
    this.option = option;
  }
  send() {
    // const res
    // res.status(this.statusCode).json(this)
  }
}

export class CREATED extends SuccessResponse {
  constructor(
    message: string,
    statusCode: any= HttpStatus.CREATED,
    metadata: any,
    option: object = {},
  ) {
    super(message, statusCode=statusCode , metadata=metadata, option);
  }
 
}