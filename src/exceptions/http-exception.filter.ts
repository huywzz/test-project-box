import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>()
        const status=exception.getStatus()
        
        response
            .status(status)
            .json({
                statusCode: status,
                timestemp: new Date().toISOString(),
                message: exception.message,
                stack:exception.stack,
                path:request.url
            })
    }
}