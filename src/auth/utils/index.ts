import { Request } from "express";

export function extractTokenFromHeader(request:any){
        console.log('request header::', request.headers);
        
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const header = {
          userIdFromHeader: request.headers['x-client-id'] as string 
            ? request.headers['x-client-id'] as string
            : undefined,
          refreshToken: type === 'Bearer' ? token : undefined,
        };
        return header
        // const token:string=request.headers.athorization as string
        // return token?token:undefined 
}