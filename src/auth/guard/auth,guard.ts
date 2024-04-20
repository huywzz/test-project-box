import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";import { Request } from 'express';
import { jwtConstants } from "../constants";
import { NotFound } from "src/exceptions";
import { KeysService } from "src/keys/keys.service";
import { payload } from "../interface/payload.interface";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService:JwtService, private keyService:KeysService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
       
        const ctx = context.switchToHttp()
        const request = ctx.getRequest();
        const { accessToken, userIdFromHeader } = this.extractTokenFromHeader(request)
        const userIdTranForm = parseInt(userIdFromHeader)
        
        const {publicKey} =await this.keyService.getOneKey({
            where: {
                userId: userIdTranForm,
                isOldRF:false
        }})
        if (!accessToken) {
          throw new NotFound('token');
        }
        try {
            const payload:payload = await this.jwtService.verifyAsync(accessToken, {
              secret: publicKey,
            }) as payload
            if (payload.userId !== userIdTranForm) {
                throw new UnauthorizedException('kh co quyen')
            }
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
       return true
    }
    private extractTokenFromHeader(request: Request){
        console.log('request header::', request.headers);
        
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const header = {
          userIdFromHeader: request.headers['x-client-id'] as string 
            ? request.headers['x-client-id'] as string
            : undefined,
          accessToken: type === 'Bearer' ? token : undefined,
        };
        return header
        // const token:string=request.headers.athorization as string
        // return token?token:undefined 
    }
}