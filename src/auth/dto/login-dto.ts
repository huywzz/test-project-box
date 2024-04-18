import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class LoginDTO{
    @IsNotEmpty()
    @Expose()
    username: string
    
    @Expose()
    @IsNotEmpty()
    password: string
    
}