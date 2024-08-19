import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { extname } from "path";
import { map, Observable } from "rxjs";
import { allowType, fileSize } from "../constants";

@Injectable()
export class FileValidationInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const requets = context.switchToHttp().getRequest()
        const files: Express.Multer.File[] = requets.images
        console.log('::files inter::',files);
        
         if (!files || files.length === 0) {
           throw new BadRequestException('No files uploaded');
         }
        files.forEach((file) => {
            const ext = extname(file.originalname)
            if (!allowType.includes(ext)) {
                throw new BadRequestException(
                  'Wrong extension type:',
                  file.originalname,
                );
            }
            if (file.size > fileSize) {
                throw new BadRequestException(
                  'Image to large:',
                  file.originalname,
                );
            }
        })
        return next.handle().pipe(
            map(data => data),
        )
    }
    
}