import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";import { Request } from 'express';
import { jwtConstants } from "../constants";
import { NotFound } from "src/exceptions";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService:JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest();
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new NotFound('token');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
              secret: jwtConstants.secret,
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
       return true
    }
    private extractTokenFromHeader(request: Request): string | undefined{
        console.log('request header::', request.headers);
        
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type ==='Bearer'?token:undefined
        // const token:string=request.headers.athorization as string
        // return token?token:undefined 
    }
}