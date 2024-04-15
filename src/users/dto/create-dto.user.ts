import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class UserDTO {
    @Expose()
    @IsNotEmpty()
    username: string;

    @Expose()
    @IsNotEmpty()
    password: string;
}